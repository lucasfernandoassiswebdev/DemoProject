"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const UserService_1 = require("../users/UserService");
const handlers_1 = require("../responses/handlers");
class TokenRoutes {
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = {
                email: req.body.email,
                password: req.body.password
            };
            if (credentials.email) {
                yield UserService_1.default.findByEmail(credentials.email)
                    .then(_.partial(handlers_1.default.authSuccess, res, credentials))
                    .catch(_.partial(handlers_1.default.authFail, req, res));
            }
        });
    }
    ;
}
exports.default = new TokenRoutes();
