import * as express from 'express';
export interface ExpressServerOptions {
    port: number;
    controllers: any[];
    middlewares?: any[];
}
export declare class ExpressServer {
    private options;
    private _app;
    private server;
    constructor(options: ExpressServerOptions);
    start(onStart?: () => void): Promise<void>;
    stop(onStop?: () => void): Promise<void>;
    readonly app: express.Express;
    private loadMiddlewares;
    private loadControllers;
    private loadController;
}
