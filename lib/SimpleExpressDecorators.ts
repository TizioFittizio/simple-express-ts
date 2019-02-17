import { SimpleExpressRoutes } from './SimpleExpressRoutes';

class SimpleExpressDecoratorHttpMethodFactory {

    public static create(httpMethod: 'get' | 'post' | 'put' | 'delete', route: string){
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const controllerRoute = target.constructor().controllerRoute;
            SimpleExpressRoutes.instance.addRoute({
                httpMethod,
                endpoint: `${controllerRoute}${route}`,
                action: descriptor.value
            });
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