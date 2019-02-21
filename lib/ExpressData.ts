import { Request, Response, NextFunction } from 'express';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export type ExpressAction = (req: Request, res: Response) => void;
export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export interface ExpressRouteIdentifier {
    controller: string;
    method: string;
}

export interface ExpressRoute {
    httpMethod: HttpMethod;
    endpoint: string;
    action: ExpressAction;
}

export class ExpressData {

    private static _instance: ExpressData;

    private _routes: Array<{
        routeIdentifier: ExpressRouteIdentifier,
        route?: ExpressRoute,
        middlewares?: ExpressMiddleware[]
    }>;

    private constructor(){
        this._routes = [];
    }

    public static get instance(){
        if (!this._instance) this._instance = new ExpressData();
        return this._instance;
    }

    public addRoute(routeIdentifier: ExpressRouteIdentifier, route: ExpressRoute){
        const routeInData = this.getRouteByIdentifier(routeIdentifier);
        if (routeInData) routeInData.route = route;
        else {
            this._routes.push({
                routeIdentifier,
                route
            });
        }
    }

    public addMiddleware(routeIdentifier: ExpressRouteIdentifier, middleware: ExpressMiddleware){
        const routeInData = this.getRouteByIdentifier(routeIdentifier);
        if (routeInData){
            if (!routeInData.middlewares) routeInData.middlewares = [];
            routeInData.middlewares.unshift(middleware);
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

    public clearRoutes(){
        this._routes = [];
    }

    private getRouteByIdentifier({ controller, method }: ExpressRouteIdentifier){
        return this._routes.find(x =>
            x.routeIdentifier.controller === controller &&
            x.routeIdentifier.method === method) || null;
    }

}