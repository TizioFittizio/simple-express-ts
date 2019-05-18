import { ExpressServer } from 'simple-express-ts';
import { Controller } from './controller';
import bodyParser = require('body-parser');

const server = new ExpressServer({
    port: 3000,
    controllers: [Controller],
    middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })]
});
server.start();