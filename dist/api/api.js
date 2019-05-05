"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const bases_1 = require("bases");
const database_1 = require("../config/database");
const RotasConfig_1 = require("./m\u00F3dulos/rotas/RotasConfig");
const UsuarioServico_1 = require("./m\u00F3dulos/usuarios/UsuarioServico");
const mongoose = require("mongoose");
class Api {
    constructor() {
        this.configuracao = require('../config/ambiente/configuracao')();
        this.app = express();
        this.middleware();
    }
    middleware() {
        database_1.Connection.then((conexao) => {
            let userService = new UsuarioServico_1.default(conexao);
            mongoose.connect(this.configuracao.stringConexaoMongo, { useNewUrlParser: true }).then(() => {
                this.app.use(morgan('dev'));
                this.app.use(bodyParser.urlencoded({ extended: true }));
                this.app.use(bodyParser.json());
                this.app.use(bases_1.Manipuladores.manipuladorErroApi);
                this.app.use(bases_1.Autenticacao.configurar(userService, this.configuracao.chave).iniciar());
                RotasConfig_1.default.iniciarRotas(this.app, bases_1.Autenticacao.configurar(userService, this.configuracao.chave), conexao);
                console.log('-> Conexão com o banco de dados efetuada com sucesso!');
            }).catch((erro) => {
                console.log(`-> Falha ao tentar conectar no banco de dados(Mongo) ${erro}`);
            });
        }).catch((erro) => {
            console.log(`-> Falha ao tentar conectar no banco de dados(Postgres) ${erro}`);
        });
    }
}
exports.default = new Api().app;
