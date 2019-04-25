import { Request, Response } from 'express';
import * as _ from 'lodash';
import UserService from '../users/UserService';
import Handlers from '../responses/handlers';

export class TokenRoutes {

    constructor(private connection: any) { }

    auth = async (req: Request, res: Response) => {
        const credentials = {
            email: req.body.email,
            password: req.body.password
        };

        if (credentials.email) {
            await new UserService(this.connection).findByEmail(credentials.email)
                .then(_.partial(Handlers.authSuccess, res, credentials))
                .catch(_.partial(Handlers.authFail, req, res));
        }
    };
}
