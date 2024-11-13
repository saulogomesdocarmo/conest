/**
 * Segurança e Desempenho
 */

const { contextBridge, ipcRenderer } = require('electron')

// estabelecer a conexão com o banco (pedido para o main)
ipcRenderer.send('db-connect')

// processos de comunicação entre renderer e main
contextBridge.exposeInMainWorld('api', {
    // A linha abaixo cria uma função que envia uma mensagem ao processo principal
    closeAbout: ()=> ipcRenderer.send('close-about'),
    janelaClientes:() => ipcRenderer.send('open-client'),
    productWindow:() => ipcRenderer.send('view-product'),
    suplierWindow:() => ipcRenderer.send('view-suplier'),
    relatorioWindow:() => ipcRenderer.send('view-report')

})