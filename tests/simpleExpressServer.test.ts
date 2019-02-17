import { SimpleExpressServer } from '../lib/SimpleExpressServer';
import { SimpleExpressController } from '../lib/SimpleExpressController';
import { Request, Response } from 'express';
import * as request from 'supertest';
import { Get, Post, Put, Delete } from '../lib/SimpleExpressDecorators';
import bodyParser = require('body-parser');

// tslint:disable:max-classes-per-file

describe('When started', () => {

    let started = false;
    let server: SimpleExpressServer;

    beforeAll(async () => {
        server = new SimpleExpressServer(1337);
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

    }

    let server: SimpleExpressServer;

    beforeAll(async () => {
        server = new SimpleExpressServer(1337, bodyParser.urlencoded({ extended: true }), bodyParser.json());
        await server.start();
    });

    afterAll(async () => {
        await server.stop(() => { /* */ });
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

});