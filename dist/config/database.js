"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../api/models/User");
const config = require('../config/env/config');
exports.Connection = typeorm_1.createConnection({
    name: 'default',
    type: config.dialect,
    database: config.db,
    entities: [User_1.User],
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
