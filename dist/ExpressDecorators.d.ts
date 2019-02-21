import { ExpressMiddleware } from './ExpressData';
export declare function Get(route: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Post(route: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Put(route: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Delete(route: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Middleware(...middlewares: ExpressMiddleware[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
