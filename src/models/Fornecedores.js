/**
 * Modelo de dados - Fornecedores
 */


// Importação de recursos
const { model, Schema } = require('mongoose')

// Criação da estrutura de dados ("tabela") que será usada no banco (Mongo DB - chama de coleção )
const fornecedorSchema = new Schema({
    razaoFornecedor: {
        type: String
    },
    dddFornecedor: {
        type: String
    },
    foneFornecedor: {
        type: String
    },
    siteFornecedor: {
        type: String
    },
    cepFornecedor: {
        type: String
    },
    enderecoFornecedor: {
        type: String
    },
    bairroFornecedor: {
        type: String
    },
    estadoFornecedor: {
        type: String
    },
    ufFornecedor: {
        type: String
    }
})
// exportar para o main
// Para modificar o nome da coleção ("tabela"),basta, 
// modificar na linha abaixo  o rótulo 'Clientes', sempre iniciando com letra maíscula
module.exports = model('Fornecedores', fornecedorSchema)