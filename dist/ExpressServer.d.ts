/// <reference types="node" />
import * as express from 'express';
import * as https from 'https';
/** Interface for ExpressServer constructor values */
export interface ExpressServerValues {
    /** Controllers to mount, controlles must be classes using the ExpressController decorator  */
    controllers: any[];
    /** Express middlewares to mount, these will be loaded before controllers */
    middlewares?: any[];
    /** Port to listen with http
     *
     *  If you are using https too you may want to use `httpPort` which produce the same effect but is clearer
     */
    port?: number;
    /** Port to listen with http, if `port` is specified this will be ignored */
    httpPort?: number;
    /** Port to listen with https */
    httpsPort?: number;
    /** Custom callback for when express starts to listen with http */
    onHttpServerStarted?: () => void;
    /** Custom callback for when express starts to listen with https */
    onHttpsServerStarted?: () => void;
    /** Https options */
    httpsOptions?: https.ServerOptions;
}
/** Express Server wrapper, to create using `ExpressServerValues` interface */
export declare class ExpressServer {
    private values;
    private _app;
    private httpServer;
    private httpsServer;
    constructor(values: ExpressServerValues);
    /**
     * Start listening with http and/or https
     */
    start(): Promise<void>;
    /**
     * Stop listening with http and/or https
     * @param onStop Custom callback on server stopped
     */
    stop(onStop?: () => void): Promise<void>;
    /**
     * Return the express app
     */
    get app(): express.Express;
    private startHttpsServer;
    private startHttpServer;
    private loadMiddlewares;
    private loadControllers;
    private loadController;
    private ensureValidValues;
}
