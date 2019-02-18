import { ExpressController } from '../lib/ExpressController';
import { Middleware } from '../lib/ExpressDecorators';
import { ExpressServer } from '../lib/ExpressServer';
import { Request, Response } from 'express';

class TestController extends ExpressController {

    public controllerRoute: string = '/test';

    @Middleware((req, res, next) => {
        next();
    })
    private async route(req: Request, res: Response){
        res.sendStatus(418);
    }

}

it('should throw starting server', async () => {
    expect(() => new ExpressServer.Builder(4000).setControllers(TestController).build()).toThrow();
});