import { Request, Response, NextFunction } from 'express';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export type ExpressAction = (req: Request, res: Response) => void;
export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export interface SimpleExpressRouteIdentifier {
    controller: string;
    method: string;
}

export interface SimpleExpressRoute {
    httpMethod: HttpMethod;
    endpoint: string;
    action: ExpressAction;
}

export class SimpleExpressData {

    private static _instance: SimpleExpressData;

    private _routes: Array<{
        routeIdentifier: SimpleExpressRouteIdentifier,
        route?: SimpleExpressRoute,
        middlewares?: ExpressMiddleware[]
    }>;

    private constructor(){
        this._routes = [];
    }

    public static get instance(){
        if (!this._instance) this._instance = new SimpleExpressData();
        return this._instance;
    }

    public addRoute(routeIdentifier: SimpleExpressRouteIdentifier, route: SimpleExpressRoute){
        const routeInData = this.getRouteByIdentifier(routeIdentifier);
        if (routeInData) routeInData.route = route;
        else {
            this._routes.push({
                routeIdentifier,
                route
            });
        }
    }

    public addMiddleware(routeIdentifier: SimpleExpressRouteIdentifier, middleware: ExpressMiddleware){
        const routeInData = this.getRouteByIdentifier(routeIdentifier);
        if (routeInData){
            if (!routeInData.middlewares) routeInData.middlewares = [];
            routeInData.middlewares.push(middleware);
        }
        else {
            this._routes.push({
                routeIdentifier,
                middlewares: [middleware]
            });
        }
    }

    public get routes(){
        return this._routes;
    }

    private getRouteByIdentifier({ controller, method }: SimpleExpressRouteIdentifier){
        return this._routes.find(x =>
            x.routeIdentifier.controller === controller &&
            x.routeIdentifier.method === method) || null;
    }

}