# Demo Project 

O Demo Project é um projeto Nodejs Typescript que implementa e exemplifica o uso das funcionalidades fornecidas pelo [Base Project](https://github.com/lucasfernandoassiswebdev/Bases). Você pode utilizá-lo para conferir como utilizar corretamente as abstrações e funcionalidades fornecidas pelo projeto citado e implementá-las em seu próprio projeto.

Este projeto foi desenvolvido utilizando os seguintes pacotes:
- [bases](https://github.com/lucasfernandoassiswebdev/Bases)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [express](https://expressjs.com/pt-br/)
- [http](https://www.npmjs.com/package/http)
- [http-status](https://www.npmjs.com/package/http-status)
- [jwt-simple](https://www.npmjs.com/package/jwt-simple)
- [lodash](https://lodash.com/)
- [morgan](https://www.npmjs.com/package/morgan)
- [nodemon](https://nodemon.io/)
- [passport](https://www.npmjs.com/package/passport)
- [passport-jwt](https://www.npmjs.com/package/passport-jwt)
- [pg](https://www.npmjs.com/package/pg)
- [typeorm](https://typeorm.io/#/)

## Começando

O primeiro passo é alterar as configurações do banco de dados para que você consiga executar o projeto.

Localize o arquivo **database.ts** no diretório **server/config/**. Este arquivo utiliza as configurações da variável de ambiente que o servidor estiver utilizando para buscar as informações necessárias para estabelecer a conexão com o banco. A variável de ambiente que irá conter estas informações é informada no momento em que o servidor é inicializado.

Para definir variáveis de ambiente neste modelo de projeto, basta criar os arquivos desejados no diretório **server/config/ambiente/nome_do_arquivo.env.ts**.

Neste projeto, por padrão utilizaremos o ambiente de **teste**. Nesta variável foi definido um banco postgres local chamado **demo-database**. Você pode alterar os valores informados no arquivo caso deseje utilizar outro banco.

A aplicação consistirá em operações voltadas a uma entidade chamada **Usuario**. Iremos criar rotas na nossa API para manipular informações voltadas a esta entidade.

Para começar, basta instalar as dependências do projeto com o comando:

```bash
npm install 
```

### Entendendo o fluxo

Tudo começa no arquivo **servidor.ts**, ele é o responsável por criar um servidor HTTP e fazer o mesmo rodar na porta especificada no arquivo de configuração da variável de ambiente. Note que ele inicia o servidor passando como aplicação a classe **API**.

```typescript
import * as http from 'http';
import Api from './api/api';

const configuracao = require('./config/ambiente/configuracao')();

const servidor = http
    .createServer(Api)
    .listen(configuracao.portaServidor)
    .on('listening', () => console.log(`Server rodando na porta ${configuracao.portaServidor}`))
    .on('error', (erro: NodeJS.ErrnoException) => console.error(`Ocorreu um erro ${erro}`));

```

A **Api** é a classe responsável por fazer as configurações iniciais da aplicação, em ordem, é criada uma instância de **express** que representa a nossa aplicação em si, em seguida é feita a conexão com o banco de dados(Postgres e MongoDB), são configurados os pacotes utilizados, middlewares, estratégia de autenticação e por fim são mapeadas as rotas da API.

```typescript
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { Manipuladores, Autenticacao } from 'bases';
import { Connection } from '../config/database';
import RotasConfig from './módulos/rotas/RotasConfig';
import UsuarioServico from './módulos/usuarios/UsuarioServico';
import * as mongoose from 'mongoose';
import * as passport from 'passport';

class Api {

    public app: express.Application;    

    constructor() {
        this.app = express();
        this.iniciaApi();
    }

    private configuracao = require('../config/ambiente/configuracao')();

    private iniciaApi() {

        Connection.then((conexao: any) => {            
            console.error('-> Conexão com o banco de dados efetuada com sucesso! (Postgres)');
        }).catch((erro: any) => {
            console.error(`-> Falha ao tentar conectar no banco de dados(Postgres) ${erro}`);
        }).then(mongoose.connect(this.configuracao.stringConexaoMongo, { useNewUrlParser: true }).then(() => {            
            console.error('-> Conexão com o banco de dados efetuada com sucesso! (Mongo)');
        }).catch((erro: any) => {
            console.error(`-> Falha ao tentar conectar no banco de dados(Mongo) ${erro}`);
        })).then(() => {
            this.app.use(morgan('dev'));
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(bodyParser.json());
            this.app.use(Manipuladores.manipuladorErroApi);
        }).catch((erro: any) => {
            console.error(`-> Falha ao iniciar a definir middlewares ${erro}`);
        }).then(() => {            
            Autenticacao.configurar(passport, UsuarioServico, this.configuracao.chave);            
        }).catch((erro: any) => {
            console.error(`Erro ao configurar estratégia de autenticação da API ${erro}`);
        }).then(() => {            
            RotasConfig.iniciarRotas(this.app, Autenticacao.configurar(passport, UsuarioServico, this.configuracao.chave));
        }).catch((erro: any) => {
            console.error(`Erro ao iniciar rotas da API ${erro}`);
        });
    }
}

export default new Api().app;

```

Nesta proposta de arquitetura serão criados módulos(pastas) para cada entidade, você pode conferir o módulo de **Usuario** no diretório **server/api/módulos/usuarios**.
São propostos 4 arquivos para cada módulo:
- **Controller** -> Responsável por conter os métodos que serão chamados de acordo com as rotas chamadas. Neste arquivo temos a manipulação da requisição recebida e é definida, manipulada e enviada uma resposta adequada para o cliente.
- **Repositorio** -> Classe responsável por se conectar e realizar as operações no banco de dados.
- **Rotas** -> Classe responsável por mapear e expor para a API as rotas do módulo em questão, indicando o verbo http adequado, definição dos parâmetros necessários e a estratégia de autenticação da rota caso necessário.
- **Servico** -> Classe responsável por manipular, verificar e tratar as regras de negócio do aplicação, nesta classe serão feitas as validações e verificações sobre as operações a serem realizadas na aplicação.

### Entidades

A aplicação, ao se conectar com o banco de dados, irá verificar as entidades da nossa aplicação e sincronizá-las com este banco, para isso é necessário expor todas as entidades que desejamos utilizar, fazer isso é bem simples. A cada nova entidade criada, basta apenas importá-la no arquivo **Entidades** localizado em **server/api/modelos/Entidades.ts**.

Note que este arquivo é o mesmo utilizado no nosso arquivo de configuração da conexão com o banco de dados, **database.ts**, sendo assim, é bem simples alterar esta estrutura caso você opte por não usá-la.

- exemplo:

```typescript
import { Entidade1 } from './Modulo1';
import { Entidade2 } from './Modulo2';
import { Entidade3 } from './Modulo3';

const Entidades = [Entidade1, Entidade2, Entidade3];

export default Entidades;
```

### Rotas

O mapeamento e exposição das rotas para a aplicação é bem simples, foi criada a classe de configuração **RotasConfig** no diretório **server/api/módulos/rotas/RotasConfig.ts**.
Para expor as rotas de cada módulo, basta importar os arquivos correspondentes nesta classe e adicioná-los a variável **arquivosDeRota**. O **bases** irá utilizar os arquivos desta variável para automaticamente mapear as rotas na API.

```typescript
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
```