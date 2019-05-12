import * as express from 'express';

export interface ExpressServerOptions {
    port: number;
    controllers: any[];
    middlewares?: any[];
}

export class ExpressServer {

    private options: ExpressServerOptions;

    private _app: express.Express;
    private server: any;

    public constructor(options: ExpressServerOptions){
        this.options = options;
        this._app = express();
        this.loadMiddlewares();
        this.loadControllers();
    }

    public async start(onStart?: () => void): Promise<void>{
        const { port } = this.options;
        return new Promise(resolve => {
            this.server = this._app.listen(port, () => {
                if (onStart) onStart();
                else console.log(`Server started on port ${port}`);
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
        // TODO
    }

    private loadControllers(){
        for (const controller of this.options.controllers) this.loadController(controller);
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