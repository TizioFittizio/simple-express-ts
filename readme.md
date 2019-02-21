# simple-express-ts

Status | Branch
--- | ---
Master | [![CircleCI](https://circleci.com/gh/TizioFittizio/simple-express-ts/tree/master.svg?style=svg)](https://circleci.com/gh/TizioFittizio/simple-express-ts/tree/master)
Dev | [![CircleCI](https://circleci.com/gh/TizioFittizio/simple-express-ts/tree/dev.svg?style=svg)](https://circleci.com/gh/TizioFittizio/simple-express-ts/tree/dev)

`simple-express-ts` is a wrapper for express with typescript decorators, and that's all, no additional dependencies.

I wrote this to avoid using huge frameworks that allow to do the same while having 6397 features that sometimes I don't need at all.

## Install

`simple-express-ts` wraps express and its types, so you only need to install this to have
*   Express
*   Express types
*   Express typescript decorators

Install with npm
```
npm install simple-express-ts
```
or with yarn
```
yarn add simple-express-ts
```

## Usage

Controller class:
```ts
import { ExpressController, Get } from 'simple-express-ts';
import { Request, Response } from 'express';

export class Controller extends ExpressController {

    public controllerRoute: string = '/controller';

    @Get('/test')
    private async testRoute(req: Request, res: Response){
        res.sendStatus(200);
    }

}
```
Index file:
```ts
import { ExpressServer } from 'simple-express-ts';
import { Controller } from './controller';

const server = new ExpressServer.Builder(3000)
    .setControllers(Controller)
    .build();
server.start();
```
Running your compiled index at this point, you should be able to obtain an OK response on http://localhost:3000/controller/test

## Using middlewares on server
You can specify middlewares while building express server
```ts
import { ExpressServer } from 'simple-express-ts';
import { Controller } from './controller';
import bodyParser = require('body-parser');

const server = new ExpressServer.Builder(3000)
    .setControllers(Controller)
    .setMiddlewares(
        bodyParser.json(),
        bodyParser.urlencoded({extended: true})
    )
    .build();
server.start();
```

## Using middlewares on routes
```ts
import { ExpressController, Get, Middleware } from 'simple-express-ts';
import { Request, Response, NextFunction } from 'express';

export class Controller extends ExpressController {

    public controllerRoute: string = '/controller';

    @Middleware((req: Request, res: Response, next: NextFunction) => {
        req.params.value = 10;
        next();
    })
    @Get('/testMiddleware')
    private async testMiddleware(req: Request, res: Response){
        const { value } = req.params;
        res.send({ value }); // 10
    }
```
Note that with more than one middleware, at the moment these will be executed in order from bottom to top