/**
 * Segurança e Desempenho
 */

const { contextBridge, ipcRenderer } = require('electron')

// processos de comunicação entre renderer e main
contextBridge.exposeInMainWorld('api', {
    // A linha abaixo cria uma função que envia uma mensagem ao processo principal
    closeAbout: ()=> ipcRenderer.send('close-about'),
    janelaClientes:() => ipcRenderer.send('open-client'),
    productWindow:() => ipcRenderer.send('view-product')
})