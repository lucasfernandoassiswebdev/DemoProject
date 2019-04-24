import { Application } from 'express';
import UserController from './UserController';

class UserRoutes {

    initRoutes(app: Application, auth: any): void {
        app.route('/users/create').all(auth.authenticate()).post(UserController.create);
        app.route('/users/save').all(auth.authenticate()).put(UserController.save);
        app.route('/users').all(auth.authenticate()).get(UserController.findAll);
        app.route('/users/:id').all(auth.authenticate()).delete(UserController.delete);
        app.route('/users/:id').all(auth.authenticate()).get(UserController.findById);
    }
}

export default new UserRoutes();