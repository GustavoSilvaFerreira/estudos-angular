// vamos importar a biblioteca padrão do Node.js para trabalhar com requisições Web
const http = require('http');

// FAZEMOS A CONFIG DE AMBIENTE ANTES DE TODOS OS PACOTES
const { config } = require('dotenv')

const env = process.env.NODE_ENV
config({
    path: `./config/.env.${env}`
})

const Hapi = require('hapi')

// importamos o joi para validar as requisições
const Joi = require('joi')

// Swagger são os 3 abaixo
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

// boom para status HTTP
const Boom = require('boom')

// jwt para manipular token
const Jwt = require('jsonwebtoken')

// hapi jwt para validar em todos os request
const HapiJwt = require('hapi-auth-jwt2')

const { ObjectID } = require('mongodb')

const Db = require('./src/taskDb')
const userDb = require('./src/userDb')

const app = new Hapi.Server({
    port: process.env.PORT,
    // devemos informar quem pode acessar a nossa API
    routes: {
        // outra opção
        // cors: true,
        cors: {
            // podemos informar a lista de clientes que podem acessar
            // para liberar a todos, deixamos o *
            origin: ['*'],
        }
    }
})

const MINHA_CHAVE_SECRETA = process.env.JWT_KEY;
const USER = {
    usuario: process.env.USER_API,
    senha: process.env.SENHA_API,
}

// colocar em todas as rotas dentro do objeto VALIDATE
const defaultHeader = Joi.object({
    authorization: Joi.string().required()
}).unknown()

async function main() {
    try {
        const database = new Db()
        await database.connect()
        console.log('Database conectado!');

        const databaseUsers = new userDb()
        await databaseUsers.connect()
        console.log('Database users conectado!');

        await app.register([
            HapiJwt,
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: {
                    documentationPath: '/v1/documentation',
                    info: {
                        title: 'API de tarefas - Gustavo',
                        version: 'v1.0'
                    },
                    lang: process.env.API_LANG,
                }
            }
        ])

        // criamos uma estrategia de autenticação padrão para refletir em todas as rotas
        app.auth.strategy('jwt','jwt', {
            key: MINHA_CHAVE_SECRETA,
            validate: (dado, request) => {
                // poderiamos validar o usuario no banco
                // verificar se ele está com a conta em dia
                // ou mesmo se continua ativo na base

                return {
                    isValid: true
                }
            }
        })
        app.auth.default('jwt')

        // vamos definir as rotas
        app.route([
            {
                // http://localhost:3000/v1/tasks?description=tarefa
                // http://localhost:3000/v1/tasks?skip=1&limit=2
                path: '/v1/tasks',
                method: 'GET',

                config: {
                    // auth: false,
                    tags: ['api'],
                    description: 'Listar tarefas',
                    notes: 'Pode filtrar por descrição e página',
                    validate: {
                        // por padrão o Hapi nao mostra os erros então manipulamos a função para mostrar
                        failAction: (request, h, err) => {
                            throw err
                        },
                        // podemos validar headers, query, payload e params
                        query: {
                            description: Joi.string().min(2),
                            skip: Joi.number().default(0),
                            limit: Joi.number().max(10).default(10)
                        },
                        headers: defaultHeader
                    }
                },
                handler: async (request) => {
                    try {
                        let { query } = request
                        const { skip, limit } = query
                        query.id = request.auth.credentials.id;


                        // por padrão tudo que vem da web vem como string temos que fazer o mapeamento manual
                        // o mongoDb não deixa usar mais string para esse caso
                        return database.listar(query, skip, limit)
                    } catch (error) {
                        console.error('Erro: ', error)
                        return Boom.internal();
                    }
                }
            },
            {
                path: '/v1/tasks',
                method: 'POST',
                config: {
                    // auth: false,
                    tags: ['api'],
                    description: 'Cadastrar tarefas',
                    notes: 'Cadastrar descrição da tarefa',
                    validate: {
                        failAction: (r, h, erro) => {
                            throw erro
                        },
                        payload: {
                            description: Joi.string().required(),
                            done: Joi.boolean().required()
                        },
                        headers: defaultHeader
                    }
                },
                handler: async (request, h) => {
                    try {
                        let { payload } = request
                        payload.user = request.auth.credentials.id;

                        const v = await database.cadastrar(payload)
                        // código correto para cadastrado (created)
                        return h.response(v).code(201)
                    } catch (error) {
                        console.error('Erro: ', error)
                        return Boom.internal();
                    }
                }
            },
            {
                path: '/v1/tasks/{id}',
                method: 'DELETE',
                config: {
                  // auth: false,
                    tags: ['api'],
                    description: 'Remover tarefas',
                    notes: 'Remover tarefa por ID',
                    validate: {
                        failAction: (r, h, erro) => {
                            throw erro
                        },
                        params: {
                            id: Joi.string().max(40).required()
                        },
                        headers: defaultHeader
                    }
                },
                async handler(request) {
                    try {
                        const { id } = request.params
                        return database.remover(ObjectID(id))
                    } catch (error) {
                        console.error('Erro: ', error)
                        return Boom.internal();
                    }
                }
            },
            {
                path: '/v1/tasks/{id}',
                method: 'PATCH',
                config: {
                  // auth: false,
                    tags: ['api'],
                    description: 'Atualizar tarefas',
                    notes: 'Atualiza tarefa parcialmente',
                    validate: {
                        failAction: (r, h, erro) => {
                          throw erro
                        },
                        params: {
                          id: Joi.string().max(40).required()
                        },
                        payload: {
                          description: Joi.string().required(),
                          done: Joi.boolean().required()
                        },
                        headers: defaultHeader
                    }
                },
                async handler(request) {
                    try {
                        // const { id } = request.params
                        // const { payload } = request
                        const {
                            params: {
                                id,
                            },
                            payload
                        } = request

                        return database.atualizar(ObjectID(id), payload)
                    } catch (error) {
                        console.error('Erro: ', error)
                        return Boom.internal();
                    }
                }
            },
            {
                path: '/v1/login',
                method: 'POST',
                config: {
                    // desabilitamos a autenticação no login
                    auth: false,
                    tags: ['api'],
                    description: 'Fazer login',
                    notes: 'Login com usuário e senha',
                    validate: {
                        failAction: (r, h, erro) => {
                            throw erro
                        },
                        payload: {
                            usuario: Joi.string().max(10).required(),
                            senha: Joi.string().min(3).max(100).required()
                        }
                    }
                },
                async handler({payload: { usuario, senha }}) {
                    try {
                        const user = await databaseUsers.listar({name: usuario, password: senha});
                        const id = user[0]._id.toString();

                        if(user.length === 0) {
                            return Boom.unauthorized()
                        }

                        const tokenPayload = {usuario, id}

                        const token = Jwt.sign(tokenPayload, MINHA_CHAVE_SECRETA, {
                            expiresIn: '900s',// 15 min
                        });

                        return {token}
                    } catch (error) {
                        console.error('Erro: ', error)
                        return Boom.internal();
                    }
                }
            }

        ])

        await app.start()
        console.log(`Servidor rodando ${app.info.host}:${app.info.port}`);

    } catch (error) {
        console.error('Erro: ', error)
    }
}
main();
