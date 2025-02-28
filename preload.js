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
    bucarCpfCliente: (cliCPF) => ipcRenderer.send('cpf-search', cliCPF),
    renderizarCliente: (dadosCliente) => ipcRenderer.on('client-data', dadosCliente),
    deletarCliente: (idCliente) => ipcRenderer.send('delete-client', idCliente),
    editarCliente: (cliente) => ipcRenderer.send('update-client', cliente),
    setarNomeCliente: (args) => ipcRenderer.on('set-nameClient', args),
    setarCpfCliente: (args) => ipcRenderer.on('set-cpfClient', args),

    // Requisições do Fornecedor
    novoFornecedor: (fornecedor) => ipcRenderer.send('new-supplier', fornecedor),
    buscarFornecedor: (forneNome) => ipcRenderer.send('search-supplier', forneNome),
    renderizarFornecedor: (dadosFornecedor) => ipcRenderer.on('supplier-data', dadosFornecedor),
    deletarFornecedor: (idFornecedor) => ipcRenderer.send('delete-supplier', idFornecedor),
    editarFornecedor: (fornecedor) => ipcRenderer.send('update-suplier', fornecedor),
    setarNomeFornecedor: (args) => ipcRenderer.on('set-nameSuplier', args),
    abrirSite: (urlSite) => ipcRenderer.send('url-site', urlSite),
    mostrarErro: (mensagem) => ipcRenderer.send('mostrar-erro', mensagem),
    // Aviso para os preencher o campo de busca

    novoProduto: (produto) => ipcRenderer.send('new-product', produto),
    validarBusca: () => ipcRenderer.send('dialog-search'),
    // validarBuscaNome: () => ipcRenderer.send('dialog-name'),
    setarBarcode: (args) => ipcRenderer.on('set-barcode', args),
    setarNomeProduto: (args) => ipcRenderer.on('set-nome-product', args),
    buscarProdutoCode: (barcode) => ipcRenderer.send('search-code-product', barcode),
    buscarProdutoNome: (produtonome) => ipcRenderer.send('search-name-product', produtonome),
    renderizarProduto: (dadosProduto) => ipcRenderer.on('product-data', dadosProduto),
    avisoCliente: () => ipcRenderer.send('notice-box'),
    selecionarArquivo: () => ipcRenderer.invoke('open-file-dialog')

})