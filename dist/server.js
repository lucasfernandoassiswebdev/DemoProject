"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const api_1 = require("./api/api");
const config = require('./config/env/config');
const server = http
    .createServer(api_1.default)
    .listen(config.serverPort)
    .on('listening', () => console.log(`Server rodando na porta ${config.serverPort}`))
    .on('error', (error) => console.log(`Ocorreu um erro ${error}`));
