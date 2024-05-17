const mongoose = require('mongoose')
require('dotenv').config()

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

function main() {
    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@pedro.zmqefgv.mongodb.net/?retryWrites=true&w=majority&appName=pedro`)
        .then(() => console.log("Conectado ao banco Mongo!"))
        .catch(err => console.log("Erro ao conectar ao banco Mongo: ", err))
}

module.exports = main