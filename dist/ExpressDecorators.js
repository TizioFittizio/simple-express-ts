"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressData_1 = require("./ExpressData");
var ExpressDecoratorHttpMethodFactory = /** @class */ (function () {
    function ExpressDecoratorHttpMethodFactory() {
    }
    ExpressDecoratorHttpMethodFactory.create = function (httpMethod, routeEndpoint) {
        return function (target, propertyKey, descriptor) {
            var controllerRoute = target.constructor().controllerRoute;
            var routeIdentifier = {
                controller: controllerRoute,
                method: propertyKey
            };
            var route = {
                httpMethod: httpMethod,
                endpoint: "" + controllerRoute + routeEndpoint,
                action: descriptor.value
            };
            ExpressData_1.ExpressData.instance.addRoute(routeIdentifier, route);
        };
    };
    return ExpressDecoratorHttpMethodFactory;
}());
function Get(route) {
    return ExpressDecoratorHttpMethodFactory.create('get', route);
}
exports.Get = Get;
function Post(route) {
    return ExpressDecoratorHttpMethodFactory.create('post', route);
}
exports.Post = Post;
function Put(route) {
    return ExpressDecoratorHttpMethodFactory.create('put', route);
}
exports.Put = Put;
function Delete(route) {
    return ExpressDecoratorHttpMethodFactory.create('delete', route);
}
exports.Delete = Delete;
function Middleware(middleware) {
    return function (target, propertyKey, descriptor) {
        var controllerRoute = target.constructor().controllerRoute;
        var routeIdentifier = {
            controller: controllerRoute,
            method: propertyKey
        };
        ExpressData_1.ExpressData.instance.addMiddleware(routeIdentifier, middleware);
    };
}
exports.Middleware = Middleware;