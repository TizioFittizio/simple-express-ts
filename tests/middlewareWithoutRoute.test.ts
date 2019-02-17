import { SimpleExpressController } from '../lib/SimpleExpressController';
import { Middleware } from '../lib/SimpleExpressDecorators';
import { SimpleExpressServer } from '../lib/SimpleExpressServer';
import { Request, Response } from 'express';

class TestController extends SimpleExpressController {

    public controllerRoute: string = '/test';

    @Middleware((req, res, next) => {
        next();
    })
    private async route(req: Request, res: Response){
        res.sendStatus(418);
    }

}

it('should throw starting server', async () => {
    expect(() => new SimpleExpressServer(4000)).toThrow();
});