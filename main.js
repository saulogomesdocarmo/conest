const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain, dialog } = require('electron/main')
const path = require('node:path')

// Importação do módulo de conexão
const { dbConnect, desconectar } = require('./database.js')
// status de conexão com o banco de dados. No MongoDB é mais eficiente manter uma única conexão aberta durante todo o tempo de vida 
// do aplicativo e usá-la quando necessário. Fechar e reabrir constatemente uma a conexão aumenta a sobrecarga e reduz o desempenho do servidor.

// A váriavel abaixo é usada pra garantir que o banco de dados inicie desconectado (evitar abrir outra instância)
let dbcon = null // valor null  -> inicia sem nenhuma conexão

// Importação do Schema Clientes da camada Model
const clienteModel = require('./src/models/Clientes.js')

// Importação do Schema Fornecedores da camada Model
const fornecedorModel = require('./src/models/Fornecedores.js')

const produtoModel = require('./src/models/Produtos.js')
// Janela principal
let win
function createWindow() {
    win = new BrowserWindow({
        width: 1010,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // Menu personalizado (Comentar para debugar)
    // Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    win.loadFile('./src/views/index.html')

    // botões  
    ipcMain.on('open-client', () => {
        clientWindow()
    })

    ipcMain.on('view-product', () => {
        productWindow()
    })

    ipcMain.on('view-suplier', () => {
        suplierWindow()
    })

    ipcMain.on('view-report', () => {
        relatorioWindow()
    })
}

// Janela Sobre
function aboutWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let about
    if (main) {
        about = new BrowserWindow({
            width: 360,
            height: 160,
            autoHideMenuBar: true,
            resizable: false,
            minimizable: false,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        about.loadFile('./src/views/sobre.html')
    }

    ipcMain.on('close-about', () => {
        console.log('Recebi a mensagem close-about')
        if (about && !about.isDestroyed()) {
            about.close()
        }
    })
}

// Janela Clientes
let client
function clientWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()

    if (main) {
        client = new BrowserWindow({
            width: 800,
            height: 705,
            // autoHideMenuBar: true,
            parent: main,
            modal: true,
            resizable: false,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        client.loadFile('./src/views/clientes.html')
    }
}

// Janela Produtos
let product
function productWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()

    if (main) {
        product = new BrowserWindow({
            width: 800,
            height: 705,
            // autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        product.loadFile('./src/views/produto.html')
    }
}

// Janela Fornecedores
let suplier
function suplierWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()

    if (main) {
        suplier = new BrowserWindow({
            width: 800,
            height: 705,
            // autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        suplier.loadFile('./src/views/fornecedor.html')
    }
}

// Janela Relatórios
let relatorio
function relatorioWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()

    if (main) {
        relatorio = new BrowserWindow({
            width: 800,
            height: 705,
            autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        relatorio.loadFile('./src/views/relatorios.html')
    }
}

app.whenReady().then(() => {
    createWindow()

    // Melhor local para estabelecer a conexão com o banco de dados
    // Importar o módulo de conexão no ínicio do código

    // Conexão com o banco
    ipcMain.on('db-connect', async (event, message) => {
        // A linha abaixo estabelece a conexão com o banco
        dbcon = await dbConnect()
        // enviar ao renderizador uma mensagem para trocar o íncone do status do banco de dados
        event.reply('db-message', "conectado")
    })

    // desconectar do banco ao encerrar a aplicação
    app.on('before-quit', async () => {
        await desconectar(dbcon)

    })


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

const template = [
    {
        label: 'Arquivo',
        submenu: [
            { label: 'Novo', accelerator: 'CmdOrCtrl+N' },
            { label: 'Abrir', accelerator: 'CmdOrCtrl+O' },
            { label: 'Salvar', accelerator: 'CmdOrCtrl+S' },
            { label: 'Salvar Como', accelerator: 'CmdOrCtrl+Shift+S' },
            { type: 'separator' },
            { label: 'Sair', accelerator: 'Alt+F4', click: () => app.quit() }
        ]
    },
    {
        label: 'Editar',
        submenu: [
            { label: 'Desfazer', role: 'undo' },
            { label: 'Refazer', role: 'redo' },
            { type: 'separator' },
            { label: 'Recortar', role: 'cut' },
            { label: 'Copiar', role: 'copy' },
            { label: 'Colar', role: 'paste' }
        ]
    },
    {
        label: 'Zoom',
        submenu: [
            { label: 'Aumentar', role: 'zoomIn' },
            { label: 'Reduzir', role: 'zoomOut' },
            { label: 'Ajustar', role: 'resetZoom' }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            { label: 'Repositório', click: () => shell.openExternal('https://github.com/saulogomesdocarmo/minidev.git') },
            { label: 'Linkedin', click: () => shell.openExternal('https://www.linkedin.com/in/saulo-gomes-do-carmo-74156719a/') },
            { label: 'Sobre', click: () => aboutWindow() }
        ]
    }
]
/**************************************************/
/*****Clientes**************************************/
/**************************************************/

// CRUD Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Recebimento dos dados do fomulário do cliente
ipcMain.on('new-client', async (event, cliente) => {
    // Teste de recebimento dos dados (Passo 2 - slide) Importante !
    console.log(cliente)

    // Passo 3 - slide (cadastrar os dados no banco de dados)
    try {
        // criar um novo objeto usando a classe modelo
        const novoCliente = new clienteModel({
            nomeCliente: cliente.nomeCli,
            dddCliente: cliente.dddCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli,
            cepCliente: cliente.cepCli,
            enderecoCliente: cliente.enderecoCli,
            bairroCliente: cliente.bairroCli,
            cidadeCliente: cliente.cidadeCli,
            numRuaCliente: cliente.numRuaCli,
            estadoCliente: cliente.estadoCli,
            ufCliente: cliente.ufCli

        })
        // A linha abaixo usa a biblioteca moogoose para salvar
        await novoCliente.save()

        // Cofirmação de cliente adicionado no banco
        dialog.showMessageBox({
            type: 'info',
            title: "Aviso",
            message: "Cliente adicionado com sucesso",
            buttons: ['OK']
        })
        // enviar uma resposta para o renderizador resetar o form
        event.reply('reset-form')

    } catch (error) {
        console.log(error)
    }
})

// Fim do CRUD Creat <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// CRUD - Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

ipcMain.on('search-client', async (event, cliNome) => {
    // teste de recebimento do nome do cliente a ser pesquisado (Passo 2)
    console.log(cliNome)
    // Passos 3 e 4 - Pesquisar no banco de dados o cliente pelo nome
    // find() -> buscar no banco de dados (mongoose)
    // RegExp -> Filtro pelo nome do cliente -> 'i' insensitive (maísculo ou minúsculo)
    // Atenção: nomeCliente -> vem do -> model | cliNome -> vem do -> renderizador
    try {
        const dadosCliente = await clienteModel.find({
            nomeCliente: new RegExp(cliNome, 'i')
        })
        console.log(dadosCliente) // Teste dos passos 3 e 4 
        // Passo 5 - slide -> enviar os dados do cliente para o renderizador
        // JSON.stringfy converte pra JSON
        event.reply('client-data', JSON.stringify(dadosCliente))

    } catch (error) {
        console.log(error)
    }
})

// Fim do CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete - CLIENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('delete-client', async (event, idCliente) => {
    //teste de recebimento do id do cliente (passo 2 - slide)
    console.log(idCliente)
    // confirmação antes de excluir o cliente (IMPORTANTE!)
    // client é a variável ref a janela de clientes
    const { response } = await dialog.showMessageBox(client, {
        type: 'warning',
        buttons: ['Cancelar', 'Excluir'], //[0,1]
        title: 'Atenção!',
        message: 'Tem certeza que deseja excluir este cliente?'
    })
    // apoio a lógica
    console.log(response)
    if (response === 1) {
        //Passo 3 slide
        try {
            const clienteExcluido = await clienteModel.findByIdAndDelete(idCliente)
            dialog.showMessageBox({
                type: 'info',
                title: 'Aviso',
                message: 'Cliente excluído com sucesso',
                buttons: ['OK']
            })
            event.reply('reset-form')
        } catch (error) {
            console.log(error)
        }
    }

})

// Fim do CRUD Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('update-client', async (event, cliente) => {
    // teste de recebimento dos dados do cliente (passo 2)
    console.log(cliente)

    try {
        const clienteEditado = await clienteModel.findByIdAndUpdate(
            cliente.idCli, {
            nomeCliente: cliente.nomeCli,
            dddCliente: cliente.dddCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli,
            cepCliente: cliente.cepCli,
            enderecoCliente: cliente.enderecoCli,
            bairroCliente: cliente.bairroCli,
            cidadeCliente: cliente.cidadeCli,
            numRuaCliente: cliente.numRuaCli,
            estadoCliente: cliente.estadoCli,
            ufCliente: cliente.ufCli
        },
            {
                new: true
            }

        )
    } catch (error) {
        console.log(error)
    }
    dialog.showMessageBox(client, {
        type: 'info',
        message: 'Dados do cliente alterados com sucesso.',
        buttons: ['OK']
    }).then((result) => {
        if (result.response === 0) {
            event.reply('reset-form')
        }
    })
})

// Fim do CRUD Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


/**************************************************/
/*****Fornecedores**************************************/
/**************************************************/

// CRUD Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Recebimento dos dados do fomulário do fornecedor
ipcMain.on('new-supplier', async (event, fornecedor) => {
    // Teste de recebimento dos dados (passo 2 - slide)
    console.log(fornecedor)

    // Passo 3 -  slide (cadastrar os dados no banco de dados)
    try {
        // criar um objeto usando a classe modelo
        const novoFornecedor = new fornecedorModel({
            razaoFornecedor: fornecedor.razaoForne,
            dddFornecedor: fornecedor.dddForne,
            foneFornecedor: fornecedor.foneForne,
            siteFornecedor: fornecedor.siteForne,
            cepFornecedor: fornecedor.cepForne,
            enderecoFornecedor: fornecedor.endForne,
            bairroFornecedor: fornecedor.bairroForne,
            cidadeFornecedor: fornecedor.cidadeForne,
            estadoFornecedor: fornecedor.estadoForne,
            ufFornecedor: fornecedor.ufForne,
            numRuaFornecedor: fornecedor.numRuaForne

        })
        // A linha abaixo usa a biblioteca moogoose para salvar
        await novoFornecedor.save()

        // Cofirmação de cliente adicionado no banco

        dialog.showMessageBox({
            type: 'info',
            title: "Aviso",
            message: "Fornecedor cadastrado com sucesso",
            buttons: ['OK']
        })

        // enviar uma resposta para o renderizador resetar o form
        event.reply('reset-form')

    } catch (error) {
        console.log(error)
    }
})


// Fim do CRUD - CREAT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// CRUD READ - >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

ipcMain.on('search-supplier', async (event, forneNome) => {
    console.log(forneNome)

    try {
        const dadosFornecedor = await fornecedorModel.find({
            razaoFornecedor: new RegExp(forneNome, 'i')
        })
        console.log(dadosFornecedor)

        event.reply('supplier-data', JSON.stringify(dadosFornecedor))

    } catch (error) {
        console.log(error)
    }
})


// FIM DO CRUD READ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

ipcMain.on('delete-supplier', async (event, idFornecedor) => {
    // teste de recebimento dos dados do fornecedor (Passo 2 - Slide)
    console.log(idFornecedor)
    // confirmação antes de excluir o forncedor (IMPORTANTE!)
    // Suplier é a variável ref a janela de fornecedores
    const { response } = await dialog.showMessageBox(suplier, {
        type: 'warning',
        buttons: ['Cancelar', 'Exlcuir'],
        title: 'Atenção!',
        message: 'Deseja deletar o fornecedor?',
    })
    // apoio a lógica
    console.log(response)
    if (response === 1) {
        // Passo 3 do Slide
        try {
            const fornecedorExcluido = await fornecedorModel.findByIdAndDelete(idFornecedor)
            dialog.showMessageBox({
                type: 'info',
                title: 'Aviso',
                message: 'Cliente excluído com Sucesso',
                buttons: ['OK']
            })
            event.reply('reset-form')
        } catch (error) {
            console.log(error)
        }
    }
})

// Fim do CRUD Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('update-suplier', async (event, fornecedor) => {
    // teste de recebimento dos dados do cliente (passo 2)
    console.log(fornecedor)

    try {
        const fornecedorEditado = await fornecedorModel.findByIdAndUpdate(
            fornecedor.idForne, {
            razaoFornecedor: fornecedor.razaoForne,
            dddFornecedor: fornecedor.dddForne,
            foneFornecedor: fornecedor.foneForne,
            siteFornecedor: fornecedor.siteForne,
            cepFornecedor: fornecedor.cepForne,
            enderecoFornecedor: fornecedor.endForne,
            bairroFornecedor: fornecedor.bairroForne,
            cidadeFornecedor: fornecedor.cidadeForne,
            estadoFornecedor: fornecedor.estadoForne,
            ufFornecedor: fornecedor.ufForne,
            numRuaFornecedor: fornecedor.numRuaForne
        },
            {
                new: true
            }

        )
    } catch (error) {
        console.log(error)
    }
    dialog.showMessageBox(client, {
        type: 'info',
        message: 'Dados do fornecedor alterados com sucesso.',
        buttons: ['OK']
    }).then((result) => {
        if (result.response === 0) {
            event.reply('reset-form')
        }
    })
})
// Fim do CRUD Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

/**************************************************/
/*****Produtos**************************************/
/**************************************************/

// CRUD Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Recebimento dos dados do fomulário de produtos

ipcMain.on('new-product', async (event, produto) => {
    console.log(produto)

    try {
        const novoProduto = new produtoModel({
            nomeProduto: produto.nomeProd,
            precoProduto: produto.precoProd,
            codigoProduto: produto.codProd
        })

        await novoProduto.save()

        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: 'Produto cadastrado com sucesso.',
            buttons: ['OK']
        })

        event.reply('reset-form')

    } catch (error) {
        console.log(error)
    }
})

// Fim do CRUD Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// CRUD READ nome - >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

ipcMain.on('search-product', async (event, nomeProd,) => {
    console.log(nomeProd)

    try {
        const dadosProduto = await produtoModel.find({
            nomeProduto: new RegExp(nomeProd, 'i')
        })



        console.log(dadosProduto)

        event.reply('product-data', JSON.stringify(dadosProduto))

    } catch (error) {
        console.log(error)
    }
})

// FIM DO CRUD READ nome <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD READ codigo - >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('search-code', async (event, codProd) => {
    console.log(codProd)

    try {
        const codeProduto = await produtoModel.find({
            codigoProduto: new RegExp(codProd, 'i')
        })

        console.log(codeProduto)

        event.reply('product-data', JSON.stringify(codeProduto))

    } catch (error) {
        console.log(error)
    }
})
// FIM DO CRUD READ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('delet-product', async (event, idProduto) => {
    // Teste de recebimento dos dados do Fornecedor (Passo 2 - Slide)
    console.log(idProduto)
    // confirmação antes de excluir o forncedor (IMPORTANTE!)
    // Suplier é a variável ref a janela de fornecedores
    const { response } = await dialog.showMessageBox(product, {
        type: 'warning',
        buttons: ['Cancelar', 'Excluir'], //[0,1]
        title: 'Atenção!',
        message: 'Tem certeza que deseja excluir este produto?'
    })
    // apoio a lógica
    console.log(response)
    if (response === 1) {
        // Passo 3 do Slide
        try {
            const produtoExcluído = await produtoModel.findByIdAndDelete(idProduto)
            dialog.showMessageBox({
                type: 'info',
                title: 'Aviso',
                message: 'Produto excluído com sucesso',
                buttons: ['OK']
            })
            event.reply('reset-form')
        } catch (error) {
            console.log(error)
        }
    }
})
// Fim do CRUD Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('update-product', async (event, produto) => { 
    console.log(produto)
})
// Fim do CRUD Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<