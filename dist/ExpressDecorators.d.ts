import { Request, Response, NextFunction } from 'express';
/**
 * Decorator for express controller
 * @param baseUrl Route of the controller (e.g. `/controller`)
 */
export declare const ExpressController: (baseUrl: string) => (constructor: Function) => void;
/**
 * Decorator for express middlewares, these will be executed before every route of the controller
 * @param middlewares Middlewares to use
 */
export declare const ExpressControllerMiddleware: (...middlewares: ((req: Request, res: Response, next: NextFunction) => void)[]) => (constructor: Function) => void;
/**
 * Decorator for express GET route
 * @param url Route URL
 */
export declare const Get: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator for express POST route
 * @param url Route URL
 */
export declare const Post: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator for express PUT route
 * @param url Route URL
 */
export declare const Put: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator for express DELETE route
 * @param url Route URL
 */
export declare const Delete: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator for express PATCH route
 * @param url Route URL
 */
export declare const Patch: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator for express OPTIONS route
 * @param url Route URL
 */
export declare const Options: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Decorator for express middlewares
 * @param middlewares Middlewares to use
 */
export declare const Middleware: (...middlewares: ((req: Request, res: Response, next: NextFunction) => void)[]) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;