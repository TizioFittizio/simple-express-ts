import { SimpleExpressData, HttpMethod, ExpressMiddleware } from './SimpleExpressData';

class SimpleExpressDecoratorHttpMethodFactory {

    public static create(httpMethod: HttpMethod, routeEndpoint: string){
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const controllerRoute = target.constructor().controllerRoute;
            const routeIdentifier = {
                controller: controllerRoute,
                method: propertyKey
            };
            const route = {
                httpMethod,
                endpoint: `${controllerRoute}${routeEndpoint}`,
                action: descriptor.value
            };
            SimpleExpressData.instance.addRoute(routeIdentifier, route);
        };
    }

}

export function Get(route: string){
    return SimpleExpressDecoratorHttpMethodFactory.create('get', route);
}

export function Post(route: string){
    return SimpleExpressDecoratorHttpMethodFactory.create('post', route);
}

export function Put(route: string){
    return SimpleExpressDecoratorHttpMethodFactory.create('put', route);
}

export function Delete(route: string){
    return SimpleExpressDecoratorHttpMethodFactory.create('delete', route);
}

export function Middleware(middleware: ExpressMiddleware){
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const controllerRoute = target.constructor().controllerRoute;
        const routeIdentifier = {
            controller: controllerRoute,
            method: propertyKey
        };
        SimpleExpressData.instance.addMiddleware(routeIdentifier, middleware);
    };
}