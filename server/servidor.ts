import * as http from 'http';
import Api from './api/api';

const configuracao = require('./config/ambiente/configuracao')();

const servidor = http
    .createServer(Api)
    .listen(configuracao.portaServidor)
    .on('listening', () => console.log(`Server rodando na porta ${configuracao.portaServidor}`))
    .on('error', (erro: NodeJS.ErrnoException) => console.error(`Ocorreu um erro ${erro}`));
