import { Application } from 'express';
import { Rotas, RotasInterface, TokenRotas } from 'bases';

import UsuarioServico from '../usuarios/UsuarioServico';

//importação dos arquivos de rota abaixo
import UsuarioRotas from '../usuarios/UsuarioRotas';


class RotasConfig {

    private configuracao = require('../../../config/ambiente/configuracao')();

    /** 
     * Mapeia a lista de rotas passadas como parâmetro na API
     * @param app <Application> (express)
     * @param aut <any> Classe que irá autenticar as rotas quando necessário
     * @param conexao <any> Conexão com o banco
    */
    public iniciarRotas = (app: Application, aut: any, conexao: any): void => {
        let arquivosDeRota: RotasInterface[] = new Array<RotasInterface>();
        arquivosDeRota.push(new TokenRotas(new UsuarioServico(conexao), this.configuracao.chave));
        arquivosDeRota.push(UsuarioRotas);

        Rotas.iniciarRotas(app, aut, arquivosDeRota, conexao);
    }
}

export default new RotasConfig();
