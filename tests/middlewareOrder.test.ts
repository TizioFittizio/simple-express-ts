import { ExpressData } from './../lib/ExpressData';
import { ExpressController, Middleware, ExpressServer, Get } from '../lib';
import { Request, Response, NextFunction } from 'express';
import bodyParser = require('body-parser');
import * as request from 'supertest';

let server: ExpressServer;
let arrayValue: number[];

class TestController extends ExpressController {

    public controllerRoute: string = '/test';

    @Middleware((req, res, next) => {
        arrayValue.push(1);
        next();
    })
    @Middleware((req, res, next) => {
        arrayValue.push(2);
        next();
    })
    @Middleware((req, res, next) => {
        arrayValue.push(3);
        next();
    })
    @Get('')
    private async route(req: Request, res: Response){
        res.sendStatus(200);
    }

}

beforeAll(async () => {
    server = new ExpressServer.Builder(5000)
        .setControllers(TestController)
        .setMiddlewares(
            bodyParser.urlencoded({ extended: true }), 
            bodyParser.json())
        .build();
    arrayValue = [];
    await server.start();
});

afterAll(async () => {
    await server.stop(() => { /* */ });
    ExpressData.instance.clearRoutes();
});

it('should call middlewares in the correct order', done => {
    request(server.app)
        .get('/test')
        .expect(res => {
            expect(arrayValue).toEqual([1, 2, 3]);
        })
        .expect(200)
        .end(done);
})