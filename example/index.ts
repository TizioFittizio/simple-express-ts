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