import { Servico } from 'bases';
import UsuarioRepositorio from './UsuarioRepositorio';
import { Usuario } from '../../modelos/Usuario';

export default class UsuarioServico extends Servico<Usuario> {

    /**
     * Construtor de UsuarioServico
     * @param conexao <any> Conexão com o banco
     */
    constructor(private conexao: any) {
        super(new UsuarioRepositorio(conexao));
    }

    /**
     * Retorna o usuário correspondente ao e-mail passado como parâmetro
     * @param email <string>
     * @returns Promise<Usuario>
     */
    public findByEmail = async (email: string): Promise<Usuario> => {                
        return await new UsuarioRepositorio(this.conexao).buscarPorEmail(email);
    }
}
