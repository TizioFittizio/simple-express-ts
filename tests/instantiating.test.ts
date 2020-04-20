import { ExpressServer } from '../lib';

it('should throw when not specifying httpPort nor httpsPort', () => {
    expect(() => new ExpressServer({
        controllers: []
    })).toThrow();
});

it('should be able to start http and https server', async () => {
    let httpServerStarted = false;
    let httpsServerStarted = false;
    const server = new ExpressServer({
        controllers: [],
        httpPort: 6111,
        httpsPort: 6222,
        onHttpServerStarted: () => httpServerStarted = true,
        onHttpsServerStarted: () => httpsServerStarted = true
    });
    await server.start();
    expect(httpServerStarted).toBeTruthy();
    expect(httpsServerStarted).toBeTruthy();
    await server.stop();
});

it('should not throw when stopping unstarted server', async () => {
    let serverStopped = false;
    const server = new ExpressServer({
        controllers: [],
        port: 6262
    });
    await server.stop(() => serverStopped = true);
    expect(serverStopped).toBeTruthy();
});