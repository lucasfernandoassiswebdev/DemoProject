"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../modules/auth/auth");
const UserRoutes_1 = require("../modules/users/UserRoutes");
class Routes {
    initRoutes(app, auth, connection) {
        app.route('/token').post(new auth_1.TokenRoutes(connection).auth);
        UserRoutes_1.default.initRoutes(app, auth, connection);
    }
}
exports.default = new Routes();
