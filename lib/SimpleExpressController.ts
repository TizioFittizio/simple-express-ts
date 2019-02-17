import { SimpleExpressRoutes } from './SimpleExpressRoutes';

export function Get(route: string){
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const controllerRoute = target.constructor().controllerRoute;
        SimpleExpressRoutes.instance.addRoute({
            httpMethod: 'get',
            endpoint: `${controllerRoute}${route}`,
            action: descriptor.value
        });
    };
}

export abstract class SimpleExpressController {

    public abstract controllerRoute: string;

}