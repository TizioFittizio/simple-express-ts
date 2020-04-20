import { Request, Response, NextFunction } from 'express';

/**
 * Decorator for express controller
 * @param baseUrl Route of the controller (e.g. `/controller`)
 */
export const ExpressController = (baseUrl: string) => {
    return (constructor: Function) => {
        constructor.prototype.baseUrl = baseUrl;
        for (const route of constructor.prototype.routes){
            route.method = constructor.prototype[route.propertyKey];
        }
    };
};

/**
 * Decorator for express middlewares, these will be executed before every route of the controller
 * @param middlewares Middlewares to use
 */
export const ExpressControllerMiddleware = (...middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>) => {
    return (constructor: Function) => {
        constructor.prototype.controllerMiddlewares = middlewares;
    }
}

/**
 * Decorator for express GET route
 * @param url Route URL
 */
export const Get = (url: string) => httpMethodDecoratorFactory('get')(url);

/**
 * Decorator for express POST route
 * @param url Route URL
 */
export const Post = (url: string) => httpMethodDecoratorFactory('post')(url);

/**
 * Decorator for express PUT route
 * @param url Route URL
 */
export const Put = (url: string) => httpMethodDecoratorFactory('put')(url);

/**
 * Decorator for express DELETE route
 * @param url Route URL
 */
export const Delete = (url: string) => httpMethodDecoratorFactory('delete')(url);

/**
 * Decorator for express PATCH route
 * @param url Route URL
 */
export const Patch = (url: string) => httpMethodDecoratorFactory('patch')(url);

/**
 * Decorator for express OPTIONS route
 * @param url Route URL
 */
export const Options = (url: string) => httpMethodDecoratorFactory('options')(url);

/**
 * Decorator for express middlewares
 * @param middlewares Middlewares to use
 */
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