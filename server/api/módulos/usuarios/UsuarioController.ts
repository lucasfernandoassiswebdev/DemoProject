import { Controller } from 'bases';
import { Usuario } from '../../modelos/Usuario';
import UsuarioServico from './UsuarioServico';

class UsuarioController extends Controller<Usuario> {

    constructor() {
        super(UsuarioServico);
    }
}

export default new UsuarioController();    
