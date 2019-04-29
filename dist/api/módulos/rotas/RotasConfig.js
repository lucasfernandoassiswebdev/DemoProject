"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bases_1 = require("bases");
//importação dos arquivos de rota abaixo
const UsuarioRotas_1 = require("../usuarios/UsuarioRotas");
class RotasConfig {
    constructor() {
        /**
         * Mapeia a lista de rotas passadas como parâmetro na API
         * @param app <Application> (express)
         * @param aut <any> Classe que irá autenticar as rotas quando necessário
         * @param conexao <any> Conexão com o banco
        */
        this.iniciarRotas = (app, aut, conexao) => {
            let arquivosDeRota = new Array();
            arquivosDeRota.push(UsuarioRotas_1.default);
            bases_1.Rotas.iniciarRotas(app, aut, arquivosDeRota, conexao);
        };
    }
}
exports.default = new RotasConfig();
