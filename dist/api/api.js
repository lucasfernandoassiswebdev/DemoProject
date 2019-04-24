"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
//import Routes from './routes/routes';
const handlers_1 = require("../api/modules/responses/handlers");
const database_1 = require("../config/database");
const mongoose = require("mongoose");
class Api {
    constructor() {
        this.config = require('../config/env/config')();
        this.express = express();
        this.middleware();
    }
    middleware() {
        database_1.Connection.then(() => {
            mongoose.connect(this.config.connectionString, { useNewUrlParser: true }).then(() => {
                this.express.use(morgan('dev'));
                this.express.use(bodyParser.urlencoded({ extended: true }));
                this.express.use(bodyParser.json());
                this.express.use(handlers_1.default.errorHandlerApi);
                //this.express.use(Auth.config().initialize());
                //this.router(this.express, Auth.config());
                console.log('-> Conexão com o banco de dados efetuada com sucesso!');
            }).catch((error) => {
                console.log(`-> Falha ao tentar conectar no banco de dados(Mongo) ${error}`);
            });
        }).catch((error) => {
            console.log(this.config);
            console.log(`-> Falha ao tentar conectar no banco de dados(Postgres) ${error}`);
        });
    }
}
exports.default = new Api().express;
