import { ExpressController, Get, Middleware } from '../lib/ExpressDecorators';
import { ExpressServer } from '../lib/ExpressServer';
import { Request, Response } from 'express';
import * as request from 'supertest';

@ExpressController('/test')
class TestController {

    @Get('/test1')
    private async get(req: Request, res: Response){
        res.sendStatus(204);
    }

}

let server: ExpressServer;

beforeAll(async () => {
    try {
        server = new ExpressServer({
            port: 7777,
            controllers: [TestController]
        });
        await server.start();
    }
    catch (e){
        console.error(e);
    }
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