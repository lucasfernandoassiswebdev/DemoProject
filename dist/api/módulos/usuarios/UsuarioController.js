"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bases_1 = require("bases");
const UsuarioServico_1 = require("./UsuarioServico");
class UsuarioController extends bases_1.Controller {
    constructor(connection) {
        super(new UsuarioServico_1.default(connection));
    }
}
exports.default = UsuarioController;
