import { ExpressController, Get, Post, Middleware } from 'simple-express-ts';
import { Request, Response, NextFunction } from 'express';

export class Controller extends ExpressController {

    public controllerRoute: string = '/controller';

    @Get('/test')
    private async testRoute(req: Request, res: Response){
        res.sendStatus(200);
    }

    @Post('/bodyParserTest')
    private async testBodyParser(req: Request, res: Response){
        const id = req.body.id;
        res.send({id})
    }

    @Middleware((req: Request, res: Response, next: NextFunction) => {
        req.params.value = 5;
        console.log(5);
        next();
    })
    @Middleware((req: Request, res: Response, next: NextFunction) => {
        req.params.value = 10;
        console.log(10);
        next();
    })
    @Get('/testMiddleware')
    private async testMiddleware(req: Request, res: Response){
        const { value } = req.params;
        res.send({ value });
    }

}