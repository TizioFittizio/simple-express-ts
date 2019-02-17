import express = require('express');
import { SimpleExpressRoutes } from './SimpleExpressRoutes';

/**
 * This is an abstract class for writing your express server class implementation
 */
export abstract class SimpleExpressServer {

    protected abstract middlewares: Array<(app: express.Express) => void>;

    private _app: express.Express;
    private port: number;
    private server: any;

    constructor(port: number){
        this.port = port;
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
        // TODO
    }

    private loadRoutes(){
        for (const { httpMethod, endpoint, action } of SimpleExpressRoutes.instance.routes){
            const middlewares: any[] = [];
            this._app[httpMethod](endpoint, ...middlewares, action);
        }
    }

}