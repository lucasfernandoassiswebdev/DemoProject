import { createConnection } from 'typeorm';

const config = require('../config/env/config')();

export const Connection = createConnection({
    name: "default-connection",
    type: config.dialect,
    host: config.host,
    port: config.pgPort,
    username: config.username,
    password: config.password,
    database: config.db,
    entities: [
        "../../api/models/*.ts"
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
