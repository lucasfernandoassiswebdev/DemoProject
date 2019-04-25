"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../modules/auth/auth");
const UserRoutes_1 = require("../modules/users/UserRoutes");
class Routes {
    initRoutes(app, auth, connection) {
        app.route('/token').post(auth_1.default.auth);
        UserRoutes_1.default.initRoutes(app, auth, connection);
    }
}
exports.default = new Routes();
