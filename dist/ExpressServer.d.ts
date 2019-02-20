import express = require('express');
import { ExpressController } from './ExpressController';
export declare class ExpressServer {
    static Builder: {
        new (port: number): {
            build(): ExpressServer;
            setMiddlewares(...middlewares: express.RequestHandler[]): any;
            setControllers(...controllers: (new () => ExpressController)[]): any;
        };
    };
    private static builderPort;
    private static builderControllers;
    private static builderMiddlewares;
    private middlewares;
    private _app;
    private port;
    private server;
    private constructor();
    start(onStart?: () => void): Promise<void>;
    stop(onStop?: () => void): Promise<void>;
    readonly app: express.Express;
    private loadMiddlewares;
    private loadRoutes;
}
