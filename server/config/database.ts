import { createConnection } from 'typeorm';
import Entidades from '../api/modelos/Entidades';

const configuracao = require('../config/ambiente/configuracao')();

export const Connection = createConnection({
    name: configuracao.nomeConexao,
    type: configuracao.dialeto,
    host: configuracao.host,
    port: configuracao.portaPostgres,
    username: configuracao.usuario,
    password: configuracao.senha,
    database: configuracao.bd,
    synchronize: configuracao.sincronizar,
    entities: Entidades,    
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