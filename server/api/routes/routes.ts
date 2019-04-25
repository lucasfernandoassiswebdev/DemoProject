import { Application } from 'express';
import { TokenRoutes } from '../modules/auth/auth';
import UserRoutes from '../modules/users/UserRoutes';

class Routes {

    initRoutes(app: Application, auth: any, connection: any): void {
        app.route('/token').post(new TokenRoutes(connection).auth);

        UserRoutes.initRoutes(app, auth, connection);
    }
}

export default new Routes();