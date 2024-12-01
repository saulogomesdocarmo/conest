/**
 * Modelo de dados dos Produtos
 */

// Importação dos Recursos
const { model, Schema } = require('mongoose')

// criação da estrutura de dados ("tabela") que será utilizada no banco de dados (MONGO DB - Chama de coleção)

const produtoSchema = new Schema({
    nomeProduto: {
        type: String
    },
    unidadeProduto: {
        type: String
    },
    codigoProduto: {
        type: String
    }
})

// exportar para o main
// Para modificar o nome da coleção ("tabela"),basta, 
// modificar na linha abaixo  o rótulo 'Clientes', sempre iniciando com letra maíscula
module.exports = model ('Produtos', produtoSchema)