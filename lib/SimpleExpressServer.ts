import express = require('express');
import { RequestHandler } from 'express';
import { SimpleExpressRoutes } from './SimpleExpressRoutes';

// TODO creare un server builder che prende controller e middleware
export class SimpleExpressServer {

    private middlewares: RequestHandler[];

    private _app: express.Express;
    private port: number;
    private server: any;

    constructor(port: number, middlewares?: RequestHandler | RequestHandler[]){
        this.port = port;
        this.middlewares = middlewares ? Array.isArray(middlewares) ? middlewares : [middlewares] : [];
        this._app = express();
        this.loadMiddlewares();
        this.loadRoutes();
    }

    public async start(onStart?: () => void): Promise<void>{
        return new Promise(resolve => {
            this.server = this._app.listen(this.port, () => {
                if (onStart) onStart();
                else console.log(`Server started on port ${this.port}`);
                resolve();
            });
        });
    }

    public async stop(onStop?: () => void): Promise<void>{
        return new Promise(async (resolve) => {
            if (!this.server) console.warn('Server was not started');
            else await this.server.close();
            if (onStop) onStop();
            resolve();
        });
    }

    public get app(){
        return this._app;
    }

    private loadMiddlewares(){
        for (const middleware of this.middlewares){
            this._app.use(middleware);
        }
    }

    private loadRoutes(){
        for (const { httpMethod, endpoint, action } of SimpleExpressRoutes.instance.routes){
            const middlewares: any[] = [];
            this._app[httpMethod](endpoint, ...middlewares, action).bind(this);
        }
    }

}