"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var https = require("https");
/** Express Server wrapper, to create using `ExpressServerValues` interface */
var ExpressServer = /** @class */ (function () {
    function ExpressServer(values) {
        this.values = values;
        this.ensureValidValues();
        this._app = express();
        this.loadMiddlewares();
        this.loadControllers();
    }
    /**
     * Start listening with http and/or https
     */
    ExpressServer.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, port, httpPort, httpsPort;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.values, port = _a.port, httpPort = _a.httpPort, httpsPort = _a.httpsPort;
                        if (!httpsPort) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.startHttpsServer()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(port || httpPort)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.startHttpServer()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Stop listening with http and/or https
     * @param onStop Custom callback on server stopped
     */
    ExpressServer.prototype.stop = function (onStop) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this.httpServer && !this.httpsServer) {
                                        console.warn('Attempting to stop unstarted server');
                                    }
                                    if (!this.httpServer) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.httpServer.close()];
                                case 1:
                                    _a.sent();
                                    this.httpServer = null;
                                    _a.label = 2;
                                case 2:
                                    if (!this.httpsServer) return [3 /*break*/, 4];
                                    return [4 /*yield*/, this.httpsServer.close()];
                                case 3:
                                    _a.sent();
                                    this.httpsServer = null;
                                    _a.label = 4;
                                case 4:
                                    if (onStop)
                                        onStop();
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Object.defineProperty(ExpressServer.prototype, "app", {
        /**
         * Return the express app
         */
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    ExpressServer.prototype.startHttpsServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, httpsPort, httpsOptions, onHttpsServerStarted;
            var _this = this;
            return __generator(this, function (_b) {
                _a = this.values, httpsPort = _a.httpsPort, httpsOptions = _a.httpsOptions, onHttpsServerStarted = _a.onHttpsServerStarted;
                this.httpsServer = https.createServer(httpsOptions, this._app);
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.httpsServer.listen(httpsPort, function () {
                            if (onHttpsServerStarted)
                                onHttpsServerStarted();
                            else
                                console.log("Https Server started on port " + httpsPort);
                            resolve();
                        });
                    })];
            });
        });
    };
    ExpressServer.prototype.startHttpServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, port, httpPort, onHttpServerStarted;
            var _this = this;
            return __generator(this, function (_b) {
                _a = this.values, port = _a.port, httpPort = _a.httpPort, onHttpServerStarted = _a.onHttpServerStarted;
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.httpServer = _this._app.listen(port || httpPort, function () {
                            if (onHttpServerStarted)
                                onHttpServerStarted();
                            else
                                console.log("Http Server started on port " + httpPort);
                            resolve();
                        });
                    })];
            });
        });
    };
    ExpressServer.prototype.loadMiddlewares = function () {
        var _this = this;
        (this.values.middlewares || []).forEach(function (middleware) { return _this._app.use(middleware); });
    };
    ExpressServer.prototype.loadControllers = function () {
        var _this = this;
        this.values.controllers.forEach(function (controller) { return _this.loadController(controller); });
    };
    ExpressServer.prototype.loadController = function (controller) {
        var instance = new controller();
        var baseUrl = instance.baseUrl, routes = instance.routes, routesMiddlewares = instance.routesMiddlewares, controllerMiddlewares = instance.controllerMiddlewares;
        var _loop_1 = function (route) {
            var propertyKey = route.propertyKey, url = route.url, httpMethod = route.httpMethod, method = route.method;
            var routeMiddlewares = (routesMiddlewares || [])
                .filter(function (x) { return x.propertyKey === propertyKey; })
                .map(function (x) { return x.middleware; });
            var middlewares = __spreadArrays((controllerMiddlewares || []), routeMiddlewares);
            this_1._app[httpMethod]("" + baseUrl + url, middlewares, method.bind(instance));
        };
        var this_1 = this;
        for (var _i = 0, _a = routes || []; _i < _a.length; _i++) {
            var route = _a[_i];
            _loop_1(route);
        }
    };
    ExpressServer.prototype.ensureValidValues = function () {
        var _a = this.values, port = _a.port, httpPort = _a.httpPort, httpsPort = _a.httpsPort;
        if (!port && !httpPort && !httpsPort) {
            throw new Error('An http or https port must be specified');
        }
    };
    return ExpressServer;
}());
exports.ExpressServer = ExpressServer;
