import express = require('express');
import { RequestHandler } from 'express';
import { ExpressData } from './ExpressData';
import { ExpressController } from './ExpressController';

// tslint:disable:max-classes-per-file

export class ExpressServer {

    // :/

    public static Builder = class {

        constructor(port: number){
            ExpressServer.builderPort = port;
            ExpressServer.builderControllers = [];
            ExpressServer.builderMiddlewares = [];
        }

        public build(){
            return new ExpressServer(ExpressServer.builderPort, ...ExpressServer.builderMiddlewares);
        }

        public setMiddlewares(...middlewares: RequestHandler[]){
            ExpressServer.builderMiddlewares = middlewares;
            return this;
        }

        public setControllers(...controllers: Array<new () => ExpressController>){
            ExpressServer.builderControllers = controllers;
            return this;
        }

    };

    private static builderPort: number;
    private static builderControllers: Array<new () => ExpressController>;
    private static builderMiddlewares: RequestHandler[];

    private middlewares: RequestHandler[];

    private _app: express.Express;
    private port: number;
    private server: any;

    private constructor(port: number, ...middlewares: RequestHandler[]){
        this.port = port;
        this.middlewares = middlewares;
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
        for (const { route, middlewares } of ExpressData.instance.routes){
            if (!route) throw new Error('Declared a method in a controller with middleware but without http method');
            const { httpMethod, endpoint, action } = route;
            this._app[httpMethod](endpoint, ...middlewares || [], action).bind(this);
        }
    }

}