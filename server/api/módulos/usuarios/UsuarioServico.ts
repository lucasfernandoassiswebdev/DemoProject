import { Servico } from 'bases';
import UsuarioRepositorio from './UsuarioRepositorio';
import { Usuario } from '../../modelos/Usuario';

class UsuarioServico extends Servico<Usuario> {

    /**
     * Construtor de UsuarioServico     
     */
    constructor() {
        super(UsuarioRepositorio);
    }

    /**
     * Retorna o usuário correspondente ao e-mail passado como parâmetro
     * @param email <string> email do usuário a ser retornado
     * @returns Promise<Usuario> Retorna o usuário correspondente ao e-mail passado como parâmetro
     */
    public buscarPorEmail = async (email: string): Promise<Usuario> => {
        return await UsuarioRepositorio.buscarPorEmail(email);
    }
}

export default new UsuarioServico();
