import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { Manipuladores, Autenticacao } from 'bases';
import { Connection } from '../config/database';
import RotasConfig from './módulos/rotas/RotasConfig';
import UserService from './módulos/usuarios/UsuarioServico';
import * as mongoose from 'mongoose'

class Api {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
    }

    private configuracao = require('../config/ambiente/configuracao')();

    middleware(): void {
        Connection.then((conexao: any) => {
            let userService: UserService = new UserService(conexao);

            mongoose.connect(this.configuracao.stringConexaoMongo, { useNewUrlParser: true }).then(() => {
                this.app.use(morgan('dev'));
                this.app.use(bodyParser.urlencoded({ extended: true }));
                this.app.use(bodyParser.json());
                this.app.use(Manipuladores.manipuladorErroApi);
                this.app.use(Autenticacao.configurar(userService, this.configuracao.chave).iniciar());
                RotasConfig.iniciarRotas(this.app, Autenticacao.configurar(userService, this.configuracao.chave), conexao);            
                console.log('-> Conexão com o banco de dados efetuada com sucesso!');
            }).catch((erro) => {
                console.log(`-> Falha ao tentar conectar no banco de dados(Mongo) ${erro}`);
            });
        }).catch((erro) => {
            console.log(`-> Falha ao tentar conectar no banco de dados(Postgres) ${erro}`);
        });
    }
}

export default new Api().app;
