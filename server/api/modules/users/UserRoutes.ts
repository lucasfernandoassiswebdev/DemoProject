import { Application } from 'express';
import UserController from './UserController';

class UserRoutes {
    
    initRoutes(app: Application, auth: any, connection: any): void {
        let userController: UserController = new UserController(connection);
        
        app.route('/users/create').all(auth.authenticate()).post(userController.create);
        app.route('/users/save').all(auth.authenticate()).put(userController.save);
        app.route('/users/:pagina/:limite').all(auth.authenticate()).get(userController.findAll);
        app.route('/users/:id').all(auth.authenticate()).delete(userController.delete);
        app.route('/users/:id').all(auth.authenticate()).get(userController.findById);
    }
}

export default new UserRoutes();