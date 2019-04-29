import { Application } from 'express';
import { Rotas, RotasInterface } from 'bases';

//importação dos arquivos de rota abaixo
import UsuarioRotas from '../usuarios/UsuarioRotas';

class RotasConfig {

    /** 
     * Mapeia a lista de rotas passadas como parâmetro na API
     * @param app <Application> (express)
     * @param aut <any> Classe que irá autenticar as rotas quando necessário
     * @param conexao <any> Conexão com o banco
    */
    public iniciarRotas = (app: Application, aut: any, conexao: any): void => {
        let arquivosDeRota: RotasInterface[] = new Array<RotasInterface>();                
        arquivosDeRota.push(UsuarioRotas);        

        Rotas.iniciarRotas(app, aut, arquivosDeRota, conexao);
    }
}

export default new RotasConfig();
