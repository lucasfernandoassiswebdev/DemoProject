import { BaseController } from 'bases';
import { User } from '../../models/User';
import UserService from './UserService';
import { Request, Response } from 'express';
import Handlers from '../responses/handlers';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

class UserController extends BaseController<User> {

    constructor() {
        super(UserService);
    }

    public create = async (req: Request, res: Response) => {
        if (!req.body.dtCriacao)
            req.body.dtCriacao = new Date();

        this.hashPassword(req.body);

        await UserService.save(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, "Erro ao salvar dados"));
    }

    private hashPassword = (user) => {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
    }
}

export default new UserController();