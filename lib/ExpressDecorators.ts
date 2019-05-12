
export const ExpressController = (baseUrl: string) => {
    return (constructor: Function) => {
        constructor.prototype.baseUrl = baseUrl;
        for (const route of constructor.prototype.routes){
            route.method = constructor.prototype[route.propertyKey];
        }
    };
};

export const Get = (url: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (!target.routes) target.routes = [];
        target.routes.push({
            propertyKey,
            url,
            httpMethod: 'get',
        });
    };
};

export const Middleware = (middleware: () => void) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (!target.routesMiddlewares) target.routesMiddlewares = [];
        target.routesMiddlewares.push({
            propertyKey,
            middleware
        });
    };
};