"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./UserController");
class UserRoutes {
    initRoutes(app, auth, connection) {
        let userController = new UserController_1.default(connection);
        app.route('/users/create').all(auth.authenticate()).post(userController.create);
        app.route('/users/save').all(auth.authenticate()).put(userController.save);
        app.route('/users/:pagina/:limite').all(auth.authenticate()).get(userController.findAll);
        app.route('/users/:id').all(auth.authenticate()).delete(userController.delete);
        app.route('/users/:id').all(auth.authenticate()).get(userController.findById);
    }
}
exports.default = new UserRoutes();
