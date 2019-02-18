import { ExpressServer } from '../lib/ExpressServer';

let started = false;
let server: ExpressServer;

beforeAll(async () => {
    server = new ExpressServer.Builder(2000).build();
    await server.start(() => (started = true));
});

afterAll(async () => {
    await server.stop();
});

it('should execute callback correctly', () => {
    expect(started).toBeTruthy();
});