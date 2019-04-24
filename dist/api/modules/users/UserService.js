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
const UserRepository_1 = require("./UserRepository");
class UserService extends bases_1.BaseService {
    constructor() {
        super(UserRepository_1.default);
        this.getByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.findByEmail({ email: email });
        });
    }
}
exports.default = new UserService();
