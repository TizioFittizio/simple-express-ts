import { ExpressServer } from '../lib/ExpressServer';

let started = false;
let server: ExpressServer;

beforeAll(async () => {
    server = new ExpressServer(2000);
    await server.start(() => (started = true));
});

afterAll(async () => {
    await server.stop();
});

it('should execute callback correctly', () => {
    expect(started).toBeTruthy();
});

it('should listen on correct port', async () => {
    const find = require('find-process');
    const list = await find('port', 2000);
    expect(list[0].name).toBe('node.exe');
});
