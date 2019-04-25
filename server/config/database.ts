import { createConnection } from 'typeorm';
import { User } from '../api/models/User';

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
        User
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
