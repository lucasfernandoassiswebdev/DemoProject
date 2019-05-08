import { Usuario } from '../../modelos/Usuario';
import { Repositorio } from 'bases';

class UsuarioRepositorio extends Repositorio<Usuario> {

    constructor() {
        super(Usuario);
    }

    public async buscarPorEmail(email: string): Promise<Usuario> {
        return await this.buscarUm({ email: email });
    }
}

export default new UsuarioRepositorio();
