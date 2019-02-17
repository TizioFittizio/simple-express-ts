import { Request, Response } from 'express';

export interface SimpleExpressRoute {
    httpMethod: 'get' | 'post' | 'put' | 'delete';
    endpoint: string;
    action: (req: Request, res: Response) => void;
}

export class SimpleExpressRoutes {

    private static _instance: SimpleExpressRoutes;

    private _routes: SimpleExpressRoute[];

    private constructor(){
        this._routes = [];
    }

    public static get instance(){
        if (!this._instance) this._instance = new SimpleExpressRoutes();
        return this._instance;
    }

    public addRoute(route: SimpleExpressRoute){
        this._routes.push(route);
    }

    public get routes(){
        return this._routes;
    }

}