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

    // Requisições para as funções que criam as janelas
    closeAbout: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    productWindow: () => ipcRenderer.send('view-product'),
    suplierWindow: () => ipcRenderer.send('view-suplier'),
    relatorioWindow: () => ipcRenderer.send('view-report'),

    // Requisição da função que limpa os campos do sistema 
    resetarFormulario: (args) => ipcRenderer.on('reset-form', args),

    // Requisições do Cliente
    novoCliente: (cliente) => ipcRenderer.send('new-client', cliente),
    buscarCliente: (cliNome) => ipcRenderer.send('search-client', cliNome),
    renderizarCliente: (dadosCliente) => ipcRenderer.on('client-data', dadosCliente),
    deletarCliente: (idCliente) => ipcRenderer.send('delete-client', idCliente),
    editarCliente: (cliente) => ipcRenderer.send('update-client', cliente),

    // Requisições do Fornecedor
    novoFornecedor: (fornecedor) => ipcRenderer.send('new-supplier', fornecedor),
    buscarFornecedor: (forneNome) => ipcRenderer.send('search-supplier', forneNome),
    renderizarFornecedor: (dadosFornecedor) => ipcRenderer.on('supplier-data', dadosFornecedor),
    deletarFornecedor: (idFornecedor) => ipcRenderer.send('delete-supplier', idFornecedor),

    // Requisições do Produto
    novoProduto: (produto) => ipcRenderer.send('new-product', produto),
    buscaproduto: (nomeProd) => ipcRenderer.send('search-product', nomeProd),
    renderizarproduto: (dadosProduto) => ipcRenderer.on('product-data', dadosProduto),
    buscarcodigo: (codProduto) => ipcRenderer.send('search-code', codProduto)
})