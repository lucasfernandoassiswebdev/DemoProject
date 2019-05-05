import { Application } from 'express';
import UsuarioController from './UsuarioController';
import { RotasInterface } from 'bases';

class UsuarioRotas implements RotasInterface {

    /**
     * Inicia as rotas de usuário
     * @param app <Application> (express)
     * @param aut <any> Método que irá autenticar as rotas
     * @param conexao <any> Conexão com o banco
     * @returns void
     */
    public exporRotas = (app: Application, aut: any, conexao: any): void => {
        let usuarioController = new UsuarioController(conexao);

        app.route('/usuarios/salvar').post(usuarioController.salvar);
        app.route('/usuarios/:pagina/:limite').get(usuarioController.buscarTodos);
        app.route('/usuarios/:id').all(aut.autenticar()).get(usuarioController.buscarPorId);
        app.route('/usuarios/remover/:id').delete(usuarioController.remover);
    }
}

export default new UsuarioRotas();
