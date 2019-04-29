import { Usuario } from '../../modelos/Usuario';
import { Repositorio } from 'bases';

export default class UsuarioRepositorio extends Repositorio<Usuario> {

    constructor(connection: any) {
        super(Usuario, connection);
    }

    public async buscarPorEmail(email: string): Promise<Usuario> {        
        return await this.buscarUm({ email: email });
    }
}
