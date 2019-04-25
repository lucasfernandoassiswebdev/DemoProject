"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../api/models/User");
const config = require('../config/env/config')();
exports.Connection = typeorm_1.createConnection({
    name: "default-connection",
    type: config.dialect,
    host: config.host,
    port: config.pgPort,
    username: config.username,
    password: config.password,
    database: config.db,
    entities: [
        User_1.User
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
