import { ExpressServer } from '../lib';
import { Controller } from './controller';

const server = new ExpressServer.Builder(3000)
    .setControllers(Controller)
    .build();
server.start();