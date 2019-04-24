import { createConnection } from 'typeorm';
import { User } from '../api/models/User';

const config = require('../config/env/config');

export const Connection = createConnection({
    name: 'default',    
    type: config.dialect,
    database: config.db,
    entities: [User],
    host: config.host,
    logging: false,
    password: config.password,
    port: config.pgPort,    
    synchronize: false,
    username: config.username,
    migrations: ["migration/*.js"],
    cli: {
        "migrationsDir": "migration"
    }
});
