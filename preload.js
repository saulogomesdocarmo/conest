/**
 * Segurança e Desempenho
 */

const { contextBridge, ipcRenderer } = require('electron')

// estabelecer a conexão com o banco (pedido para o main -> envio de pedido para abrir a conexão com o banco de dados)
ipcRenderer.send('db-connect')

// processos de comunicação entre renderer e main
contextBridge.exposeInMainWorld('api', {
    dbMensagem: (message) => ipcRenderer.on('db-message', message),
    // A linha abaixo cria uma função que envia uma mensagem ao processo principal
    closeAbout: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    productWindow: () => ipcRenderer.send('view-product'),
    suplierWindow: () => ipcRenderer.send('view-suplier'),
    relatorioWindow: () => ipcRenderer.send('view-report'),
    resetarFormulario: (args) => ipcRenderer.on('reset-form', args),
    novoCliente: (cliente) => ipcRenderer.send('new-client', cliente),
    buscarCliente: (cliNome) => ipcRenderer.send('search-client', cliNome),
    renderizarCliente: (dadosCliente) => ipcRenderer.on('client-data', dadosCliente),
    novoFornecedor: (fornecedor) => ipcRenderer.send('new-supplier', fornecedor),
    buscarFornecedor: (forneNome) => ipcRenderer.send('search-supplier', forneNome),
    renderizarFornecedor: (dadosFornecedor) => ipcRenderer.on('supplier-data', dadosFornecedor),
    novoProduto: (produto) => ipcRenderer.send('new-product', produto),
    buscaproduto: (nomeProd) => ipcRenderer.send('search-product', nomeProd)

})