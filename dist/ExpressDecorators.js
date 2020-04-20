"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Decorator for express controller
 * @param baseUrl Route of the controller (e.g. `/controller`)
 */
exports.ExpressController = function (baseUrl) {
    return function (constructor) {
        constructor.prototype.baseUrl = baseUrl;
        for (var _i = 0, _a = constructor.prototype.routes; _i < _a.length; _i++) {
            var route = _a[_i];
            route.method = constructor.prototype[route.propertyKey];
        }
    };
};
/**
 * Decorator for express middlewares, these will be executed before every route of the controller
 * @param middlewares Middlewares to use
 */
exports.ExpressControllerMiddleware = function () {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (constructor) {
        constructor.prototype.controllerMiddlewares = middlewares;
    };
};
/**
 * Decorator for express GET route
 * @param url Route URL
 */
exports.Get = function (url) { return httpMethodDecoratorFactory('get')(url); };
/**
 * Decorator for express POST route
 * @param url Route URL
 */
exports.Post = function (url) { return httpMethodDecoratorFactory('post')(url); };
/**
 * Decorator for express PUT route
 * @param url Route URL
 */
exports.Put = function (url) { return httpMethodDecoratorFactory('put')(url); };
/**
 * Decorator for express DELETE route
 * @param url Route URL
 */
exports.Delete = function (url) { return httpMethodDecoratorFactory('delete')(url); };
/**
 * Decorator for express PATCH route
 * @param url Route URL
 */
exports.Patch = function (url) { return httpMethodDecoratorFactory('patch')(url); };
/**
 * Decorator for express OPTIONS route
 * @param url Route URL
 */
exports.Options = function (url) { return httpMethodDecoratorFactory('options')(url); };
/**
 * Decorator for express middlewares
 * @param middlewares Middlewares to use
 */
exports.Middleware = function () {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        if (!target.routesMiddlewares)
            target.routesMiddlewares = [];
        for (var _i = 0, middlewares_1 = middlewares; _i < middlewares_1.length; _i++) {
            var middleware = middlewares_1[_i];
            target.routesMiddlewares.push({
                propertyKey: propertyKey,
                middleware: middleware
            });
        }
    };
};
var httpMethodDecoratorFactory = function (httpMethod) { return function (url) {
    return function (target, propertyKey, descriptor) {
        if (!target.routes)
            target.routes = [];
        target.routes.push({
            propertyKey: propertyKey,
            url: url,
            httpMethod: httpMethod
        });
    };
}; };
