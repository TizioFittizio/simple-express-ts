import { SimpleExpressServer } from '../lib/SimpleExpressServer';
import { SimpleExpressController, Get } from '../lib/SimpleExpressController';
import { Request, Response } from 'express';
import * as request from 'supertest';

// tslint:disable:max-classes-per-file

describe('When started', () => {

    class TestServer extends SimpleExpressServer {
        protected middlewares = [];
        protected controllers = [];
    }

    let started = false;
    let server: TestServer;

    beforeAll(async () => {
        server = new TestServer(1337);
        await server.start(() => started = true);
    });

    afterAll(async () => {
        await server.stop();
    });

    it('should execute callback correctly', () => {
        expect(started).toBeTruthy();
    });

    it('should listen on correct port', async () => {
        const find = require('find-process');
        const list = await find('port', 1337);
        expect(list[0].name).toBe('node.exe');
    });

});

describe('With a controller', () => {

    class TestController extends SimpleExpressController {

        public controllerRoute: string = '/test';

        @Get('/test')
        private async getTest(req: Request, res: Response){
            res.send([]);
        }
    }

    class TestServer extends SimpleExpressServer {
        protected middlewares = [];
        protected controllers = [TestController];
    }

    let server: TestServer;

    beforeAll(async () => {
        server = new TestServer(1337);
        await server.start();
    });

    afterAll(async () => {
        await server.stop();
    });

    it('should call get route correctly', done => {
        request(server.app)
            .get('/test/test')
            .expect(res => {
                expect(res.body).toBeTruthy();
            })
            .expect(200)
            .end(done);
    });

});