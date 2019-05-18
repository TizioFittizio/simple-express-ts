"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressController = function (baseUrl) {
    return function (constructor) {
        constructor.prototype.baseUrl = baseUrl;
        for (var _i = 0, _a = constructor.prototype.routes; _i < _a.length; _i++) {
            var route = _a[_i];
            route.method = constructor.prototype[route.propertyKey];
        }
    };
};
exports.Get = function (url) { return httpMethodDecoratorFactory('get')(url); };
exports.Post = function (url) { return httpMethodDecoratorFactory('post')(url); };
exports.Put = function (url) { return httpMethodDecoratorFactory('put')(url); };
exports.Delete = function (url) { return httpMethodDecoratorFactory('delete')(url); };
exports.Patch = function (url) { return httpMethodDecoratorFactory('patch')(url); };
exports.Options = function (url) { return httpMethodDecoratorFactory('options')(url); };
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
