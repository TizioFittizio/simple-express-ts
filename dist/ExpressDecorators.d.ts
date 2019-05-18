import { Request, Response, NextFunction } from 'express';
export declare const ExpressController: (baseUrl: string) => (constructor: Function) => void;
export declare const Get: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const Post: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const Put: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const Delete: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const Patch: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const Options: (url: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const Middleware: (...middlewares: ((req: Request, res: Response, next: NextFunction) => void)[]) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
