const { MongoClient } = require('mongodb');

class TaskDb {
    constructor() {
        this.taskCollection = {};
    }

    async connect() {
        const mongodbString = process.env.MONGO_URI;
        const mongoClient = new MongoClient(mongodbString, { useNewUrlParser: true });
        const connection = await mongoClient.connect();
        const taskCollection = await connection.db(process.env.MONGO_DATABASE).collection(process.env.MONGO_COLLECTION);

        // adicionamos o task para a instancia da classe
        this.taskCollection = taskCollection;
    }

    async cadastrar(task) {
        return this.taskCollection.insertOne(task);
    }

    async listar(task, skip = 0, limit = 10) {
        let filtro = {};
        if(task.description) {
            // usamos um operador do MongoDb para filtrar frases que contenham aquele texto
            filtro = { description:
                        {
                            $regex: `.*${task.description}*.`,
                            $options: 'i'
                        }
                    }
        }
        return this.taskCollection
                    .find(filtro)
                    .skip(parseInt(skip))
                    .limit(parseInt(limit))
                    .toArray()
    }

    async remover(id) {
        return this.taskCollection.deleteOne({ _id: id });
    }

    async atualizar(idTask, taskAtualizado) {
        // 1º parametro é o filtro
        // 2º o que substituirá o arquivos
        // $set: dao -> ESQUECEU O SET -> VAI PERDER
        return this.taskCollection.updateOne({
            _id: idTask
        }, {
            $set: taskAtualizado
        });
    }


}

module.exports = TaskDb;
