"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressData = /** @class */ (function () {
    function ExpressData() {
        this._routes = [];
    }
    Object.defineProperty(ExpressData, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new ExpressData();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ExpressData.prototype.addRoute = function (routeIdentifier, route) {
        var routeInData = this.getRouteByIdentifier(routeIdentifier);
        if (routeInData)
            routeInData.route = route;
        else {
            this._routes.push({
                routeIdentifier: routeIdentifier,
                route: route
            });
        }
    };
    ExpressData.prototype.addMiddleware = function (routeIdentifier, middleware) {
        var routeInData = this.getRouteByIdentifier(routeIdentifier);
        if (routeInData) {
            if (!routeInData.middlewares)
                routeInData.middlewares = [];
            routeInData.middlewares.push(middleware);
        }
        else {
            this._routes.push({
                routeIdentifier: routeIdentifier,
                middlewares: [middleware]
            });
        }
    };
    Object.defineProperty(ExpressData.prototype, "routes", {
        get: function () {
            return this._routes;
        },
        enumerable: true,
        configurable: true
    });
    ExpressData.prototype.clearRoutes = function () {
        this._routes = [];
    };
    ExpressData.prototype.getRouteByIdentifier = function (_a) {
        var controller = _a.controller, method = _a.method;
        return this._routes.find(function (x) {
            return x.routeIdentifier.controller === controller &&
                x.routeIdentifier.method === method;
        }) || null;
    };
    return ExpressData;
}());
exports.ExpressData = ExpressData;
