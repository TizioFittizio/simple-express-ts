import * as express from 'express';
import * as https from 'https';

/** Interface for ExpressServer constructor values */
export interface ExpressServerValues {
    /** Controllers to mount, controlles must be classes using the ExpressController decorator  */
    controllers: any[];
    /** Express middlewares to mount, these will be loaded before controllers */
    middlewares?: any[];
    /** Port to listen with http, if you are using https too you may want to use `httpPort` which produce the same effect but is clearer */
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
export class ExpressServer {

    private values: ExpressServerValues;

    private _app: express.Express;
    private httpServer: any;
    private httpsServer: any;

    public constructor(values: ExpressServerValues){
        this.values = values;
        this.ensureValidValues();
        this._app = express();
        this.loadMiddlewares();
        this.loadControllers();
    }

    /**
     * Start listening with http and/or https
     */
    public async start(): Promise<void> {
        const { port, httpPort, httpsPort } = this.values;
        if (httpsPort) await this.startHttpsServer();
        if (port || httpPort) await this.startHttpServer();
    }

    /**
     * Stop listening with http and/or https
     * @param onStop Custom callback on server stopped
     */
    public async stop(onStop?: () => void): Promise<void>{
        return new Promise(async (resolve) => {
            if (!this.httpServer && !this.httpsServer){
                console.warn('Attempting to stop unstarted server');
            }
            if (this.httpServer){
                await this.httpServer.close();
                this.httpServer = null;
            }
            if (this.httpsServer){
                await this.httpsServer.close();
                this.httpsServer = null;
            }
            if (onStop) onStop();
            resolve();
        });
    }

    /**
     * Return the express app
     */
    public get app(){
        return this._app;
    }

    private async startHttpsServer(){
        const { httpsPort, httpsOptions, onHttpsServerStarted } = this.values;
        this.httpsServer = https.createServer(httpsOptions!, this._app);
        return new Promise(resolve => {
            this.httpsServer.listen(httpsPort, () => {
                if (onHttpsServerStarted) onHttpsServerStarted();
                else console.log(`Https Server started on port ${httpsPort}`);
                resolve();
            });
        });
    }

    private async startHttpServer(){
        const { port, httpPort, onHttpServerStarted } = this.values;
        return new Promise(resolve => {
            this.httpServer = this._app.listen(port || httpPort, () => {
                if (onHttpServerStarted) onHttpServerStarted();
                else console.log(`Http Server started on port ${httpPort}`);
                resolve();
            });
        });
    }

    private loadMiddlewares(){
        (this.values.middlewares || []).forEach(middleware => this._app.use(middleware));
    }

    private loadControllers(){
        this.values.controllers.forEach(controller => this.loadController(controller));
    }

    private loadController(controller: any){
        const instance = new controller();
        const { baseUrl } = instance;
        for (const route of instance.routes || []){
            const { propertyKey, url, httpMethod, method } = route;
            const middlewares = (instance.routesMiddlewares || [])
                .filter((x: any) => x.propertyKey === propertyKey)
                .map((x: any) => x.middleware);
            (this._app as any)[httpMethod](`${baseUrl}${url}`, middlewares, method.bind(instance));
        }
    }

    private ensureValidValues(){
        const { port, httpPort, httpsPort } = this.values;
        if (!port && !httpPort && !httpsPort){
            throw new Error('An http or https port must be specified');
        }
    }

}