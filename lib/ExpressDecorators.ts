import { Request, Response, NextFunction } from 'express';

export const ExpressController = (baseUrl: string) => {
    return (constructor: Function) => {
        constructor.prototype.baseUrl = baseUrl;
        for (const route of constructor.prototype.routes){
            route.method = constructor.prototype[route.propertyKey];
        }
    };
};

export const Get = (url: string) => httpMethodDecoratorFactory('get')(url);
export const Post = (url: string) => httpMethodDecoratorFactory('post')(url);
export const Put = (url: string) => httpMethodDecoratorFactory('put')(url);
export const Delete = (url: string) => httpMethodDecoratorFactory('delete')(url);
export const Patch = (url: string) => httpMethodDecoratorFactory('patch')(url);
export const Options = (url: string) => httpMethodDecoratorFactory('options')(url);

export const Middleware = (...middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (!target.routesMiddlewares) target.routesMiddlewares = [];
        for (const middleware of middlewares){
            target.routesMiddlewares.push({
                propertyKey,
                middleware
            });
        }
    };
};

const httpMethodDecoratorFactory = (httpMethod: string) => (url: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (!target.routes) target.routes = [];
        target.routes.push({
            propertyKey,
            url,
            httpMethod
        });
    };
};