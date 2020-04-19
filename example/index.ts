import { ExpressServer, ExpressServerValues } from '../lib';
import { Controller } from './controller';
import bodyParser = require('body-parser');
import { SSLCertificateManager } from '../helpers/SSLCertificateManager';

const USE_HTTPS = true;

const expressServerValues: ExpressServerValues = {
    httpPort: 3000,
    controllers: [Controller],
    middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })]
}

if (USE_HTTPS){
    const sslCertificateManager = new SSLCertificateManager();
    sslCertificateManager.generate();
    expressServerValues.httpsOptions = {
        cert: sslCertificateManager.readCertificate(),
        key: sslCertificateManager.readKey()
    }
    expressServerValues.httpsPort = 3001;
}

const server = new ExpressServer(expressServerValues);
server.start();