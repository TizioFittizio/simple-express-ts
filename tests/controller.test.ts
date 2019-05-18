import { ExpressController, Get, Middleware, Post, Put, Delete } from '../lib/ExpressDecorators';
import { ExpressServer } from '../lib/ExpressServer';
import { Request, Response, NextFunction } from 'express';
import * as request from 'supertest';
import bodyParser = require('body-parser');

const createMiddleware = (callback: (req: Request, res: Response) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        callback(req, res);
        next();
    };
};

@ExpressController('/test')
class TestController {

    private value: string;

    constructor(){
        this.value = '7';
    }

    @Get('/test1')
    private async testGet(req: Request, res: Response){
        res.sendStatus(204);
    }

    @Get('/test2')
    private async testValue(req: Request, res: Response){
        res.send(this.value);
    }

    @Get('/test3')
    private async testHelperMethod(req: Request, res: Response){
        res.send(this.helperMethod('!'));
    }

    @Post('/testpost')
    private async testPost(req: Request, res: Response){
        res.status(201).send(req.body);
    }

    @Put('/testput/:id')
    private async testPut(req: Request, res: Response){
        res.send(req.params.id);
    }

    @Delete('/testdelete/:id')
    private async testDelete(req: Request, res: Response){
        const header = req.headers['x-custom'];
        res.status(200).send(header);
    }

    @Get('/testmiddleware')
    @Middleware((req: Request, res: Response, next: NextFunction) => {
        (req as any).value = '1';
        next();
    })
    private async testMiddleware(req: Request, res: Response){
        res.send((req as any).value);
    }

    @Get('/testmiddleware2')
    @Middleware((req: Request, res: Response, next: NextFunction) => {
        res.sendStatus(419);
    })
    private async testMiddleware2(req: Request, res: Response){
        res.sendStatus(200);
    }

    @Middleware(
        createMiddleware((req: any, res: any) => req.value1 = 7),
        createMiddleware((req: any, res: any) => req.value2 = 4),
        createMiddleware((req: any, res: any) => req.value3 = 6),
        createMiddleware((req: any, res: any) => req.value = req.value1 + req.value2 + req.value3)
    )
    @Get('/testmiddleware3')
    private async testMiddleware3(req: Request, res: Response){
        const { value } = req as any;
        res.send(value + '');
    }

    private helperMethod(value: string){
        return value;
    }

}

let server: ExpressServer;

beforeAll(async () => {
    server = new ExpressServer({
        port: 7777,
        controllers: [TestController],
        middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })]
    });
    await server.start();
});

afterAll(async () => {
    await server.stop();
});

it('should be able to perform basic get', done => {
    request(server.app)
        .get('/test/test1')
        .expect(204)
        .end(done);
});

it('should be able to obtain controller variables', done => {
    request(server.app)
        .get('/test/test2')
        .expect(res => {
            expect(res.text).toBe('7');
        })
        .expect(200)
        .end(done);
});

it('should be able to use controller methods', done => {
    request(server.app)
        .get('/test/test3')
        .expect(res => {
            expect(res.text).toBe('!');
        })
        .expect(200)
        .end(done);
});

it('should be able to perform basic post', done => {
    request(server.app)
        .post('/test/testpost')
        .send({ a: 1 })
        .expect(res => {
            expect(res.body).toEqual({ a: 1 });
        })
        .expect(201)
        .end(done);
});

it('should be able to perform basic put', done => {
    request(server.app)
        .put('/test/testput/1')
        .expect(res => {
            expect(res.text).toBe('1');
        })
        .expect(200)
        .end(done);
});

it('should be able to perform basic delete', done => {
    request(server.app)
        .delete('/test/testdelete/1')
        .set('x-custom', 'aaa')
        .expect(res => {
            expect(res.text).toBe('aaa');
        })
        .expect(200)
        .end(done);
});

it('should execute middleware correctly', done => {
    request(server.app)
        .get('/test/testmiddleware')
        .expect(res => {
            expect(res.text).toBe('1');
        })
        .expect(200)
        .end(done);
});

it('should execute middleware correctly (2)', done => {
    request(server.app)
        .get('/test/testmiddleware2')
        .expect(419)
        .end(done);
});

it('should execute multiple middlewares correctly', done => {
    request(server.app)
        .get('/test/testmiddleware3')
        .expect(res => {
            expect(res.text).toBe('17');
        })
        .expect(200)
        .end(done);
});