import { Request, Response, NextFunction } from 'express';
export declare type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export declare type ExpressAction = (req: Request, res: Response) => void;
export declare type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void;
export interface ExpressRouteIdentifier {
    controller: string;
    method: string;
}
export interface ExpressRoute {
    httpMethod: HttpMethod;
    endpoint: string;
    action: ExpressAction;
}
export declare class ExpressData {
    private static _instance;
    private _routes;
    private constructor();
    static readonly instance: ExpressData;
    addRoute(routeIdentifier: ExpressRouteIdentifier, route: ExpressRoute): void;
    addMiddleware(routeIdentifier: ExpressRouteIdentifier, middleware: ExpressMiddleware): void;
    readonly routes: {
        routeIdentifier: ExpressRouteIdentifier;
        route?: ExpressRoute | undefined;
        middlewares?: ExpressMiddleware[] | undefined;
    }[];
    clearRoutes(): void;
    private getRouteByIdentifier;
}
