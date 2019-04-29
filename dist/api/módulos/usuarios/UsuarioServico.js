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
const UsuarioRepositorio_1 = require("./UsuarioRepositorio");
class UsuarioServico extends bases_1.Servico {
    /**
     * Construtor de UsuarioServico
     * @param conexao <any> Conexão com o banco
     */
    constructor(conexao) {
        super(new UsuarioRepositorio_1.default(conexao));
        this.conexao = conexao;
        /**
         * Retorna o usuário correspondente ao e-mail passado como parâmetro
         * @param email <string>
         * @returns Promise<Usuario>
         */
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return yield new UsuarioRepositorio_1.default(this.conexao).buscarPorEmail(email);
        });
    }
}
exports.default = UsuarioServico;
