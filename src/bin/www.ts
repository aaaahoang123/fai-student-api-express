import {App} from "../app";
import * as http from "http";

const debug = require('debug')('template-nodets:server');

class ServerHandler {
    port: any;
    server: http.Server;

    constructor() {
        this.normalizePort(process.env.PORT || '3000')
            .init()
            .onError()
            .onListening();
    }

    private init(): ServerHandler {
        this.server = http.createServer(new App().getApp());
        this.server.listen(this.port);
        return this;
    }

    private normalizePort(val: string): ServerHandler {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            this.port = val;
            return this;
        }

        if (port >= 0) {
            this.port = port;
            return this;
        }

        this.port = false;
        return this;
    }

    private onError(): ServerHandler {
        this.server.on("error", (error: any) => {
            if (error.syscall !== 'listen') {
                throw error;
            }

            let bind = typeof this.port === 'string'
                ? 'Pipe ' + this.port
                : 'Port ' + this.port;

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
        return this;
    }

    private onListening(): ServerHandler {
        this.server.on("listening", () => {
            let address = this.server.address();
            let bind = typeof address === 'string'
                ? 'pipe ' + address
                : 'port ' + address.port;
            debug('Listening on ' + bind);
        });
        return this;
    }
}

new ServerHandler();