"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Usuario_1 = require("../api/modelos/Usuario");
const configuracao = require('../config/ambiente/configuracao')();
exports.Connection = typeorm_1.createConnection({
    name: 'default-connection',
    type: configuracao.dialeto,
    host: configuracao.host,
    port: configuracao.portaPostgres,
    username: configuracao.usuario,
    password: configuracao.senha,
    database: configuracao.bd,
    entities: [
        Usuario_1.Usuario
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
