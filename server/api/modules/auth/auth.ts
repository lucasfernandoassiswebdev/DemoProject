import { Request, Response } from 'express';
import * as _ from 'lodash';
import UserService from '../users/UserService';
import Handlers from '../responses/handlers';

class TokenRoutes {
    async auth (req: Request, res: Response){
        const credentials = {
            email: req.body.email,
            password: req.body.password
        };

        if (credentials.email) {
            await UserService.findByEmail(credentials.email)
                .then(_.partial(Handlers.authSuccess, res, credentials))
                .catch(_.partial(Handlers.authFail, req, res));
        }
    };
}

export default new TokenRoutes();