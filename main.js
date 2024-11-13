const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron/main')
const path = require('node:path')

// Importação do módulo de conexão
const { dbConnect, desconectar } = require('./database.js')
// status de conexão com o banco de dados. No MongoDB é mais eficiente manter uma única conexão aberta durante todo o tempo de vida 
// do aplicativo e usá-la quando necessário. Fechar e reabrir constatemente uma a conexão aumenta a sobrecarga e reduz o desempenho do servidor.

// A váriavel abaixo é usada pra garantir que o banco de dados inicie desconectado (evitar abrir outra instância)
let dbcon = null // valor null  -> inicia sem nenhuma conexão

// Janela principal
let win
function createWindow() {
    win = new BrowserWindow({
        width: 1010,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    win.loadFile('./src/views/index.html')

    // botões  
    ipcMain.on('open-client', () => {
        console.log('teste de recebimento de mensagem')
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
            height: 600,
            autoHideMenuBar: true,
            parent: main,
            modal: true,
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
            height: 600,
            autoHideMenuBar: true,
            parent: main,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        product.loadFile('./src/views/produto.html')
    }
}

// Janela Funcionários
function suplierWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let suplier
    if (main) {
        suplier = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true,
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
            height: 600,
            autoHideMenuBar: true,
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
    ipcMain.on('db-connect', async (event, message) => {
        // A linha abaixo estabelece a conexão com o banco
        dbcon = await dbConnect()

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
