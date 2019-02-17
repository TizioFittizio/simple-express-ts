import { SimpleExpressController } from '../lib/SimpleExpressController';
import { Request, Response } from 'express';
import { Get, Post, Put, Delete, Middleware } from '../lib/SimpleExpressDecorators';
import { SimpleExpressServer } from '../lib/SimpleExpressServer';
import { SimpleExpressData } from '../lib/SimpleExpressData';
import * as request from 'supertest';
import bodyParser = require('body-parser');

class TestController extends SimpleExpressController {

    public controllerRoute: string = '/test';

    @Get('/testget')
    private async getTest(req: Request, res: Response){
        res.send([]);
    }

    @Post('/testpost')
    private async postTest(req: Request, res: Response){
        res.status(201).send(req.body);
    }

    @Put('/testput/:id')
    private async putTest(req: Request, res: Response){
        res.send(req.params.id);
    }

    @Delete('/testdelete')
    private async deleteTest(req: Request, res: Response){
        res.send(req.query.id);
    }

    @Get('/testmiddleware')
    @Middleware((req, res, next) => {
        (req as any).value = '1';
        next();
    })
    private async middlewareTest(req: Request, res: Response){
        res.send((req as any).value);
    }

    @Middleware((req, res, next) => {
        res.sendStatus(401);
    })
    @Get('/testmiddleware2')
    private async middlewareTest2(req: Request, res: Response){
        res.sendStatus(200);
    }

}

let server: SimpleExpressServer;

beforeAll(async () => {
    server = new SimpleExpressServer(3000, bodyParser.urlencoded({ extended: true }), bodyParser.json());
    await server.start();
});

afterAll(async () => {
    await server.stop(() => { /* */ });
    SimpleExpressData.instance.clearRoutes();
});

it('should call get route correctly', done => {
    request(server.app)
        .get('/test/testget')
        .expect(res => {
            expect(res.body).toBeTruthy();
        })
        .expect(200)
        .end(done);
});

it('should call post route correctly and obtain a body', done => {
    request(server.app)
        .post('/test/testpost')
        .send({ a: 1 })
        .expect(res => {
            expect(res.body.a).toBe(1);
        })
        .expect(201)
        .end(done);
});

it('should call put route correctly and obtain a param', done => {
    request(server.app)
        .put('/test/testput/1')
        .expect(res => {
            expect(res.text).toBe('1');
        })
        .expect(200)
        .end(done);
});

it('should call delete route correctly and obtain a query param', done => {
    request(server.app)
        .delete('/test/testdelete?id=1')
        .expect(res => {
            expect(res.text).toBe('1');
        })
        .expect(200)
        .end(done);
});

it('should get a value from middleware', done => {
    request(server.app)
        .get('/test/testmiddleware')
        .expect(res => {
            expect(res.text).toBe('1');
        })
        .end(done);
});

it('should be able to obtain a response from middleware', done => {
    request(server.app)
        .get('/test/testmiddleware2')
        .expect(401)
        .end(done);
});