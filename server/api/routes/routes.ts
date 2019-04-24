import { Application } from 'express';
import TokenRoutes from '../modules/auth/auth';
//import UserRoutes from '../modules/users/UserRoutes';

class Routes {

    initRoutes(app: Application, auth: any): void {

        app.route('/token').post(TokenRoutes.auth);

        //UserRoutes.initRoutes(app, auth);        
    }
}

export default new Routes();
