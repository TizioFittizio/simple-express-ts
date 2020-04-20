import { ExpressController, Get, ExpressServer } from '../lib';
import { Request, Response, NextFunction } from 'express';
import * as request from 'supertest';
import { SSLCertificateManager } from '../helpers/SSLCertificateManager';

@ExpressController('/test')
class TestController {

    @Get('/test1')
    private async testGet(req: Request, res: Response){
        res.sendStatus(200);
    }

}

let httpsServer: ExpressServer;
const sslCertificateManager = new SSLCertificateManager();

beforeAll(async (done) => {
    sslCertificateManager.generate();
    httpsServer = new ExpressServer({
        httpsPort: 27777,
        controllers: [TestController],
        httpsOptions: {
            key: sslCertificateManager.readKey(),
            cert: sslCertificateManager.readCertificate()
        }
    });
    await httpsServer.start();
    done();
});

afterAll(async (done) => {
    await httpsServer.stop();
    sslCertificateManager.delete();
    done();
});

it('should be able to perform basic get', done => {
    request(httpsServer.app)
        .get('/test/test1')
        .expect(200)
        .end(done);
});