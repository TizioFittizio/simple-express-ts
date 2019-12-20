import { execSync } from 'child_process';
import * as fs from 'fs';

export class SSLCertificateManager {

    public generate(){
        const command = `openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -subj /CN=localhost -keyout server.key -out server.crt`;
        execSync(command);
    }

    public readCertificate(){
        return fs.readFileSync('./server.crt', 'utf8');
    }

    public readKey(){
        return fs.readFileSync('./server.key', 'utf8');
    }

    public delete(){
        fs.unlinkSync('./server.crt');
        fs.unlinkSync('./server.key');
    }

}