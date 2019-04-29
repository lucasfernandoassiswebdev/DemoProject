import { Controller } from 'bases';
import { Usuario } from '../../modelos/Usuario';
import UsuarioServico from './UsuarioServico';

export default class UsuarioController extends Controller<Usuario> {

    constructor(connection: any) {
        super(new UsuarioServico(connection));
    }
}
