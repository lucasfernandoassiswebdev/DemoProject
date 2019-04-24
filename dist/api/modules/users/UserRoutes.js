"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./UserController");
class UserRoutes {
    initRoutes(app, auth) {
        app.route('/users/create').all(auth.authenticate()).post(UserController_1.default.create);
        app.route('/users/save').all(auth.authenticate()).put(UserController_1.default.save);
        app.route('/users').all(auth.authenticate()).get(UserController_1.default.findAll);
        app.route('/users/:id').all(auth.authenticate()).delete(UserController_1.default.delete);
        app.route('/users/:id').all(auth.authenticate()).get(UserController_1.default.findById);
    }
}
exports.default = new UserRoutes();
