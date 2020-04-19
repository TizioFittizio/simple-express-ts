import * as express from 'express';
import * as https from 'https';

export interface ExpressServerValues {
    controllers: any[];
    middlewares?: any[];
    httpPort?: number;
    httpsPort?: number;
    httpsOptions?: https.ServerOptions;
}

export class ExpressServer {

    private values: ExpressServerValues;

    private _app: express.Express;
    private server: any;

    public constructor(values: ExpressServerValues){
        this.values = values;
        this._app = express();
        this.loadMiddlewares();
        this.loadControllers();
    }

    public async start(onStart?: () => void): Promise<void>{
        if (this.values.httpsOptions) await this.startHttpsServer(onStart);
        else await this.startHttpServer(onStart);
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

    private async startHttpsServer(onStart?: () => void){
        const { httpsOptions, httpsPort } = this.values;
        this.server = https.createServer(httpsOptions!, this._app);
        return new Promise(resolve => {
            this.server.listen(httpsPort, () => {
                if (onStart) onStart();
                else console.log(`Https Server started on port ${httpsPort}`);
                resolve();
            });
        });
    }

    private async startHttpServer(onStart?: () => void){
        const { httpPort } = this.values;
        return new Promise(resolve => {
            this.server = this._app.listen(httpPort, () => {
                if (onStart) onStart();
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

}