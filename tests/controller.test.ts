import { ExpressController, Get, Middleware } from '../lib/ExpressDecorators';
import { ExpressServer } from '../lib/ExpressServer';
import { Request, Response } from 'express';
import * as request from 'supertest';

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

    private helperMethod(value: string){
        return value;
    }

}

let server: ExpressServer;

beforeAll(async () => {
    server = new ExpressServer({
        port: 7777,
        controllers: [TestController]
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
        .end(done);
});

it('should be able to use controller methods', done => {
    request(server.app)
        .get('/test/test3')
        .expect(res => {
            expect(res.text).toBe('!');
        })
        .end(done);
});