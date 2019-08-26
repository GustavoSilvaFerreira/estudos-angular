const { MongoClient } = require('mongodb');

class UserDb {
    constructor() {
        this.userCollection = {};
    }

    async connect() {
        const mongodbString = process.env.MONGO_URI;
        const mongoClient = new MongoClient(mongodbString, { useNewUrlParser: true });
        const connection = await mongoClient.connect();
        const userCollection = await connection.db(process.env.MONGO_DATABASE).collection('users');

        // adicionamos o user para a instancia da classe
        this.userCollection = userCollection;
    }

    async cadastrar(user) {
        return this.userCollection.insertOne(user);
    }

    async listar(user, skip = 0, limit = 10) {
        let filtro = user;
        return this.userCollection
                    .find(filtro)
                    .skip(parseInt(skip))
                    .limit(parseInt(limit))
                    .toArray()
    }

    async remover(id) {
        return this.userCollection.deleteOne({ _id: id });
    }

    async atualizar(idUser, userAtualizado) {
        // 1º parametro é o filtro
        // 2º o que substituirá o arquivos
        // $set: dao -> ESQUECEU O SET -> VAI PERDER
        return this.userCollection.updateOne({
            _id: idUser
        }, {
            $set: userAtualizado
        });
    }


}

module.exports = UserDb;
