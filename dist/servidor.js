"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const api_1 = require("./api/api");
const configuracao = require('./config/ambiente/configuracao')();
const servidor = http
    .createServer(api_1.default)
    .listen(configuracao.portaServidor)
    .on('listening', () => console.log(`Server rodando na porta ${configuracao.portaServidor}`))
    .on('error', (erro) => console.error(`Ocorreu um erro ${erro}`));
