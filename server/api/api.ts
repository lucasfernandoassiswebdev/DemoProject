import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { Manipuladores, Autenticacao } from 'bases';
import { Connection } from '../config/database';
import RotasConfig from './módulos/rotas/RotasConfig';
import UsuarioServico from './módulos/usuarios/UsuarioServico';
import * as mongoose from 'mongoose';
import * as passport from 'passport';

class Api {

    public app: express.Application;    

    constructor() {
        this.app = express();
        this.iniciaApi();
    }

    private configuracao = require('../config/ambiente/configuracao')();

    private iniciaApi() {

        Connection.then((conexao: any) => {            
            console.error('-> Conexão com o banco de dados efetuada com sucesso! (Postgres)');
        }).catch((erro: any) => {
            console.error(`-> Falha ao tentar conectar no banco de dados(Postgres) ${erro}`);
        }).then(mongoose.connect(this.configuracao.stringConexaoMongo, { useNewUrlParser: true }).then(() => {            
            console.error('-> Conexão com o banco de dados efetuada com sucesso! (Mongo)');
        }).catch((erro: any) => {
            console.error(`-> Falha ao tentar conectar no banco de dados(Mongo) ${erro}`);
        })).then(() => {
            this.app.use(morgan('dev'));
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(bodyParser.json());
            this.app.use(Manipuladores.manipuladorErroApi);
        }).catch((erro: any) => {
            console.error(`-> Falha ao iniciar a definir middlewares ${erro}`);
        }).then(() => {            
            Autenticacao.configurar(passport, UsuarioServico, this.configuracao.chave);            
        }).catch((erro: any) => {
            console.error(`Erro ao configurar estratégia de autenticação da API ${erro}`);
        }).then(() => {            
            RotasConfig.iniciarRotas(this.app, Autenticacao.configurar(passport, UsuarioServico, this.configuracao.chave));
        }).catch((erro: any) => {
            console.error(`Erro ao iniciar rotas da API ${erro}`);
        });
    }
}

export default new Api().app;
