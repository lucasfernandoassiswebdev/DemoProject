import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
//import Routes from './routes/routes';
import Handlers from '../api/modules/responses/handlers';
import { Connection } from '../config/database';
import Auth from './auth';
import * as mongoose from 'mongoose'

class Api {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    private config = require('../config/env/config')();

    middleware(): void {
        Connection.then(() => {
            mongoose.connect(this.config.connectionString, { useNewUrlParser: true }).then(() => {
                this.express.use(morgan('dev'));
                this.express.use(bodyParser.urlencoded({ extended: true }));
                this.express.use(bodyParser.json());
                this.express.use(Handlers.errorHandlerApi);
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

    //private router(app: express.Application, auth: any): void {
        //Routes.initRoutes(app, auth);
    //}
}

export default new Api().express;
