import { Application } from 'express';
import UsuarioController from './UsuarioController';
import { RotasInterface } from 'bases';

class UsuarioRotas implements RotasInterface {

    /**
     * Inicia as rotas de usuário
     * @param app <Application> (express)
     * @param aut <any> Método que irá autenticar as rotas     
     * @returns void
     */
    public exporRotas = (app: Application, aut: any): void => {
        app.route('/usuarios/salvar').all(aut.autenticar()).post(UsuarioController.salvar);
        app.route('/usuarios/buscaPorNome').all(aut.autenticar()).get(UsuarioController.buscar);
        app.route('/usuarios/:pagina/:limite').all(aut.autenticar()).get(UsuarioController.buscarTodos);
        app.route('/usuarios/:id').all(aut.autenticar()).get(UsuarioController.buscarPorId);
        app.route('/usuarios/remover/:id').all(aut.autenticar()).delete(UsuarioController.remover);
    }

    public exporControllers(): any[] {
        return [UsuarioController];
    }
}

export default new UsuarioRotas();
