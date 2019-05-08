import { createConnection } from 'typeorm';
import { Usuario } from '../api/modelos/Usuario';

const configuracao = require('../config/ambiente/configuracao')();

export const Connection = createConnection({
    name: configuracao.nomeConexao,
    type: configuracao.dialeto,
    host: configuracao.host,
    port: configuracao.portaPostgres,
    username: configuracao.usuario,
    password: configuracao.senha,
    database: configuracao.bd,
    entities: [
        Usuario
    ],
    subscribers: [
        ""
    ],
    migrations: [
        "../../api/migrations/*.ts"
    ],
    cli: {
        "entitiesDir": "src/entities",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
});