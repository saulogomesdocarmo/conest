/** Modulo de conexao com o banco de dados - com o MONGOOSE*/

// Importar biblioteca
const mongoose = require('mongoose')

// Definir URL e a autenticação do banco de dados 
const url = 'mongodb+srv://admin:123SENAC@clusterconest.xqzwa.mongodb.net/'

// Status de conexão (ícone de conexão)
let isConnected = false

// só estabelecer uma conexão se não estiver conectado
const dbConnect = async () => {
    if (isConnected === false) {
        await conectar()
    }
}

// conectar 
const conectar = async () => {
    if (isConnected === false) {
        try {
            // linha abaixo abre a conexão com o MongoDB
            await mongoose.connect(url)
            isConnected = true // Sinalizar que o banco está conectado
            console.log("MongoDB Conectado")
        } catch (error) {
            console.log(`Problema Detectado: ${error}`)
        }
    }
}

// desconectar 
const desconectar = async () => {
    if (isConnected === false) {
        try {
            // linha abaixo encerra a conexão com o MongoDB
            await mongoose.disconnect(url)
            isConnected = false // Sinalizar que o banco está conectado
            console.log("MongoDB Desconectado")
        } catch (error) {
            console.log(`Problema Detectado: ${error}`)
        }
    }
}


// (rede local - IP do servidor)