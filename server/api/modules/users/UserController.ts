import { Controller, Manipuladores, Criptografia } from 'bases';
import { User } from '../../models/User';
import UserService from './UserService';
import { Request, Response, Application } from 'express';
import * as _ from 'lodash';

export default class UserController extends Controller<User> {

    private userService: UserService;

    constructor(public app: Application, connection: any) {
        super();
        this.userService = new UserService(connection);
    }

    // this.app.route(`/$${rotaBase}/buscar`).all(auth.authenticate()).post((req: Request, res: Response) => {
    //     if (!req.body.dtCriacao)
    //         req.body.dtCriacao = new Date();

    //     req.body.senha = Criptografia.criptografar(req.body.senha);

    //     await this.userService.salvar(req.body)
    //         .then(_.partial(Manipuladores.sucesso, res))
    //         .catch(_.partial(Manipuladores.erro, res, "Erro ao salvar dados"));
    // });
}
