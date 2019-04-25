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
const bases_1 = require("bases");
const UserService_1 = require("./UserService");
const handlers_1 = require("../responses/handlers");
const bcrypt = require("bcrypt");
const _ = require("lodash");
class UserController extends bases_1.BaseController {
    constructor(connection) {
        super(new UserService_1.default(connection));
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.dtCriacao)
                req.body.dtCriacao = new Date();
            this.hashPassword(req.body);
            yield this.userService.save(req.body)
                .then(_.partial(handlers_1.default.onSuccess, res))
                .catch(_.partial(handlers_1.default.onError, res, "Erro ao salvar dados"));
        });
        this.hashPassword = (user) => {
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
        };
        this.userService = new UserService_1.default(connection);
    }
}
exports.default = UserController;
