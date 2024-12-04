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
function clientWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let client
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
function productWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let product
    if (main) {
        product = new BrowserWindow({
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
        product.loadFile('./src/views/produto.html')
    }
}

// Janela Fornecedores
function suplierWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let suplier
    if (main) {
        suplier = new BrowserWindow({
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
        suplier.loadFile('./src/views/fornecedor.html')
    }
}

// Janela Relatórios
function relatorioWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let relatorio
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
            ufFornecedor: fornecedor.ufForne

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
            unidadeProduto: produto.unidadeProd,
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