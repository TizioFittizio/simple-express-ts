import { ExpressController, Get, Post, Middleware } from '../lib';
import { Request, Response, NextFunction } from 'express';

@ExpressController('/controller')
export class Controller {

    private value: string;

    constructor(){
        this.value = 'Value from controller';
    }

    @Get('/test')
    private async testRoute(req: Request, res: Response){
        res.send(this.value);
    }

    @Post('/bodyParserTest')
    private async testBodyParser(req: Request, res: Response){
        const id = req.body.id;
        res.send({ id });
    }

    @Middleware(
        (req: Request, res: Response, next: NextFunction) => {
            req.params.value = '5';
            next();
        },
        (req: Request, res: Response, next: NextFunction) => {
            req.params.value += 10;
            next();
        },
    )
    @Get('/middlewareTest')
    private async testMiddleware(req: Request, res: Response){
        const { value } = req.params;
        res.send({ value });
    }

    @Middleware(
        (req: Request, res: Response, next: NextFunction) => {
            req.params.value = '5';
            next();
        }
    )
    @Get('/middlewareTest2')
    private async testMiddleware2(req: Request, res: Response){
        const { value } = req.params;
        res.send({ value });
    }

}