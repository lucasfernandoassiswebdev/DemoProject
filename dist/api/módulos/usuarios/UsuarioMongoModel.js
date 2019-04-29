"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
exports.UsuarioSchema = new mongoose_1.Schema({
    dtCriacao: Date,
    nome: String,
    funcao: String,
    email: String,
    senha: String
});
exports.UserModel = mongoose_1.model("Usuario", exports.UsuarioSchema);
