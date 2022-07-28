const mongoose = require('mongoose')

//Criação de um model (coleção para o Banco de Dados chamado Person com campos especificados)
const Person = mongoose.model('Person', {

    name: String,
    salary: Number,
    approved: Boolean,
})

//exportando o model para o index.js
module.exports = Person