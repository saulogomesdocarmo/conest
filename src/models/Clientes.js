/**
 * Modelo de dados (Clientes)
 */

// Importação de recursos
const { model, Schema } = require('mongoose')

// Criação da estrutura de dados ("tabela") que será usada no banco (Mongo DB - chama de coleção )
const clienteSchema = new Schema({
    nomeCliente: {
        type: String
    },
    foneCliente: {
        type: String
    },
    emailCliente: {
        type: String
    },
})

module.exports = model('Clientes', clienteSchema)