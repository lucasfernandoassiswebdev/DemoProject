"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../modules/auth/auth");
//import UserRoutes from '../modules/users/UserRoutes';
class Routes {
    initRoutes(app, auth) {
        app.route('/token').post(auth_1.default.auth);
        //UserRoutes.initRoutes(app, auth);        
    }
}
exports.default = new Routes();
