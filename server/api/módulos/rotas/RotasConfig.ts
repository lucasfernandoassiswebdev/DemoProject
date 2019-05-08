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
    */
    public iniciarRotas = (app: Application, aut: any): void => {
        let arquivosDeRota: RotasInterface[] = new Array<RotasInterface>();
        arquivosDeRota.push(new TokenRotas(UsuarioServico, this.configuracao.chave));
        arquivosDeRota.push(UsuarioRotas);

        Rotas.iniciarRotas(app, aut, arquivosDeRota);
    }
}

export default new RotasConfig();
