import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { Manipuladores, Autenticacao } from 'bases';
import { Connection } from '../config/database';
import RotasConfig from './módulos/rotas/RotasConfig';
import UsuarioServico from './módulos/usuarios/UsuarioServico';
import * as mongoose from 'mongoose'

class Api {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
    }

    private configuracao = require('../config/ambiente/configuracao')();

    private middleware() {

        Connection.then(conexao => {            
            console.log('-> Conexão com o banco de dados efetuada com sucesso! (Postgres)');
            
            this.app.use(Autenticacao.configurar(UsuarioServico, this.configuracao.chave).iniciar());
            RotasConfig.iniciarRotas(this.app, Autenticacao.configurar(UsuarioServico, this.configuracao.chave));
        }).catch((erro) => {
            console.log(`-> Falha ao tentar conectar no banco de dados(Postgres) ${erro}`);
        }).then(mongoose.connect(this.configuracao.stringConexaoMongo, { useNewUrlParser: true }).then(() => {
            console.log('-> Conexão com o banco de dados efetuada com sucesso! (Mongo)');
        }).catch((erro: any) => {
            console.log(`-> Falha ao tentar conectar no banco de dados(Mongo) ${erro}`);
        })).then(() => {            
            this.app.use(morgan('dev'));
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(bodyParser.json());
            this.app.use(Manipuladores.manipuladorErroApi);
        }).catch((erro: any) => {
            console.log(`-> Falha ao iniciar a definir middlewares ${erro}`);
        });        
    }
}

export default new Api().app;
