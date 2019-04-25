"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
const handlers_1 = require("../api/modules/responses/handlers");
const database_1 = require("../config/database");
const auth_1 = require("./auth");
const mongoose = require("mongoose");
class Api {
    constructor() {
        this.config = require('../config/env/config')();
        this.express = express();
        this.middleware();
    }
    middleware() {
        database_1.Connection.then((connection) => {
            mongoose.connect(this.config.mongoConnectionString, { useNewUrlParser: true }).then(() => {
                this.express.use(morgan('dev'));
                this.express.use(bodyParser.urlencoded({ extended: true }));
                this.express.use(bodyParser.json());
                this.express.use(handlers_1.default.errorHandlerApi);
                this.express.use(auth_1.default.config(connection).initialize());
                this.router(this.express, auth_1.default.config(connection), connection);
                console.log('-> Conexão com o banco de dados efetuada com sucesso!');
            }).catch((error) => {
                console.log(`-> Falha ao tentar conectar no banco de dados(Mongo) ${error}`);
            });
        }).catch((error) => {
            console.log(`-> Falha ao tentar conectar no banco de dados(Postgres) ${error}`);
        });
    }
    router(app, auth, connection) {
        routes_1.default.initRoutes(app, auth, connection);
    }
}
exports.default = new Api().express;
