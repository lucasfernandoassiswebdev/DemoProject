import { BaseController } from 'bases';
import { User } from '../../models/User';
import UserService from './UserService';
import { Request, Response } from 'express';
import Handlers from '../responses/handlers';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

export default class UserController extends BaseController<User> {

    private userService: UserService;

    constructor(connection: any) {
        super(new UserService(connection));
        this.userService = new UserService(connection);
    }

    public create = async (req: Request, res: Response) => {
        if (!req.body.dtCriacao)
            req.body.dtCriacao = new Date();

        this.hashPassword(req.body);

        await this.userService.save(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, "Erro ao salvar dados"));
    }

    private hashPassword = (user) => {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
    }
}
