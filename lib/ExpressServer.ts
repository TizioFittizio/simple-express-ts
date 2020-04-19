import * as express from 'express';
import * as https from 'https';

export interface ExpressServerValues {
    controllers: any[];
    middlewares?: any[];
    port?: number;
    httpPort?: number;
    httpsPort?: number;
    onHttpServerStarted?: () => void;
    onHttpsServerStarted?: () => void;
    httpsOptions?: https.ServerOptions;
}

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

    public async start(): Promise<void> {
        const { port, httpPort, httpsPort } = this.values;
        if (httpsPort) await this.startHttpsServer();
        if (port || httpPort) await this.startHttpServer();
    }

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