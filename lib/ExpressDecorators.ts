import { ExpressData, HttpMethod, ExpressMiddleware } from './ExpressData';

class ExpressDecoratorHttpMethodFactory {

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
            ExpressData.instance.addRoute(routeIdentifier, route);
        };
    }

}

export function Get(route: string){
    return ExpressDecoratorHttpMethodFactory.create('get', route);
}

export function Post(route: string){
    return ExpressDecoratorHttpMethodFactory.create('post', route);
}

export function Put(route: string){
    return ExpressDecoratorHttpMethodFactory.create('put', route);
}

export function Delete(route: string){
    return ExpressDecoratorHttpMethodFactory.create('delete', route);
}

export function Middleware(middleware: ExpressMiddleware){
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const controllerRoute = target.constructor().controllerRoute;
        const routeIdentifier = {
            controller: controllerRoute,
            method: propertyKey
        };
        ExpressData.instance.addMiddleware(routeIdentifier, middleware);
    };
}