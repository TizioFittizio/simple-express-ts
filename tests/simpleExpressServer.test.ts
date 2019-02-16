import { SimpleExpressServer } from '../lib/SimpleExpressServer';

class Server extends SimpleExpressServer {

    protected middlewares = [];
    protected controllers = [];

}

describe('When started', () => {

    let started = false;
    let server: Server;

    beforeAll(async () => {
        server = new Server(1337);
        await server.start(() => started = true);
    });

    afterAll(async () => {
        await server.stop();
    });

    it('should execute callback correctly', () => {
        expect(started).toBeTruthy();
    });

    it('should listen on correct port', async () => {
        const find = require('find-process');
        const list = await find('port', 1337);
        expect(list[0].name).toBe('node.exe');
    });

});