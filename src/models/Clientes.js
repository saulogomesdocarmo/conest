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
    dddCliente: {
        type: String
    },
    foneCliente: {
        type: String
    },
    emailCliente: {
        type: String
    },
    cpfCliente: {
        type: String
    },
    cepCliente: {
        type: String
    },
    compleCliente: {
        type: String
    },
    enderecoCliente: {
        type: String
    },
    bairroCliente: {
        type: String
    },
    cidadeCliente: {
        type: String
    },
    numRuaCliente: {
        type: String
    },
    estadoCliente: {
        type: String
    },
    ufCliente: {
        type: String
    }
})
// exportar para o main
// Para modificar o nome da coleção ("tabela"),basta, 
// modificar na linha abaixo  o rótulo 'Clientes', sempre iniciando com letra maíscula
module.exports = model('Clientes', clienteSchema)