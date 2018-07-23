import {App} from "../app";
import {Server} from "http";

const debug = require('debug')('template-nodejs:server');
const http = require('http');

class ServerHandler {
    port: any;
    server: Server;

    constructor() {
        this.normalizePort(process.env.PORT || '3000');
        this.server = http.createServer(App.getApp());
        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);
    }

     private normalizePort(val: string) {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            this.port = val;
            return;
        }

        if (port >= 0) {
            this.port = port;
            return;
        }

        this.port = false;
    }

    onError(error: any) {
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
    }

     onListening() {
        let address = this.server.address();
        let bind = typeof address === 'string'
            ? 'pipe ' + address
            : 'port ' + address.port;
        debug('Listening on ' + bind);
    }
}

new ServerHandler();