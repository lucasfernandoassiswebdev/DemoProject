import * as http from 'http';
import Api from './api/api';

const config = require('./config/env/config');

const server = http
    .createServer(Api)
    .listen(config.serverPort)
    .on('listening', () => console.log(`Server rodando na porta ${config.serverPort}`))
    .on('error', (error: NodeJS.ErrnoException) => console.log(`Ocorreu um erro ${error}`));
