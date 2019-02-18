import { Get, Middleware, ExpressController } from '../lib';
import { Request, Response, NextFunction } from 'express';

export class Controller extends ExpressController {

    public controllerRoute: string = '/controller';

    @Get('')
    @Middleware((req: Request, res: Response, next: NextFunction) => {
        req.params.value = 5;
        next();
    })
    private async route(req: Request, res: Response){
        const { value } = req.params;
        res.send({ value }); // 5
    }

}