"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioController_1 = require("./UsuarioController");
class UsuarioRotas {
    constructor() {
        /**
         * Inicia as rotas de usuário
         * @param app <Application> (express)
         * @param aut <any> Método que irá autenticar as rotas
         * @param conexao <any> Conexão com o banco
         * @returns void
         */
        this.exporRotas = (app, aut, conexao) => {
            let usuarioController = new UsuarioController_1.default(conexao);
            app.route('/usuarios/salvar').post(usuarioController.salvar);
            app.route('/usuarios/:pagina/:limite').get(usuarioController.buscarTodos);
            app.route('/usuarios/:id').all(aut.autenticar()).get(usuarioController.buscarPorId);
            app.route('/usuarios/remover/:id').delete(usuarioController.remover);
        };
    }
}
exports.default = new UsuarioRotas();
