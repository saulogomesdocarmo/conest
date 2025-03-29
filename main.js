const { app, BrowserWindow, Menu, shell, ipcMain, dialog } = require('electron/main')
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

// importar bibliotecas nativa do JS para manipular arquivos 
const fs = require('fs')
const { globalShortcut } = require('electron')
const { type } = require('node:os')

// Importar a biblioteca jspdf (instalar antes usando npm i jspdf)
const { jspdf, default: jsPDF } = require('jspdf')

// Janela principal
let win
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // Menu personalizado (Comentar para debugar)
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    win.loadFile('./src/views/index.html')

}

// Janela Sobre
function aboutWindow() {

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

// Botões
ipcMain.on('open-client', () => {
    clientWindow()
})

ipcMain.on('open-supplier', () => {
    suplierWindow()
})

ipcMain.on('open-product', () => {
    productWindow()
})

ipcMain.on('open-report', () => {
    relatorioWindow()
})


app.whenReady().then(() => {
    // registrar o atalho global para devtools em qualquer janela ativa

    globalShortcut.register('Ctrl+Shift+I', () => {
        const tools = BrowserWindow.getFocusedWindow()
        if (tools) {
            tools.webContents.openDevTools()
        }
    })

    createWindow()

    // Melhor local para estabelecer a conexão com o banco de dados
    // Importar o módulo de conexão no ínicio do código

    // No MongoDB é mais eficiente manter uma única conexão aberta durante todo o tempo de vida do aplicativo e usá-la quando necessário. Fechar e reabrir constantemente a conexão aumenta a sobrecarga e reduz o desempenho do servidor.

    // Conexão com o banco
    ipcMain.on('db-connect', async (event, message) => {
        // A linha abaixo estabelece a conexão com o banco
        dbcon = await dbConnect()
        // enviar ao renderizador uma mensagem para trocar o íncone do status do banco de dados
        // delay de 0.5 segundos para sincronizar
        setTimeout(() => {
            event.reply('db-message', "conectado")
        }, 500) // 500ms = 0.5
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
// Reduzir Logs não criticos (mensagem no colse quando executar o Devtools)
app.commandLine.appendSwitch('log-level', '3')

const template = [
    {
        label: 'Cadastrado',
        submenu: [
            {
                label: 'Clientes',
                click: () => clientWindow()
            },
            {
                label: 'Fornecedores',
                click: () => suplierWindow()
            },
            {
                label: 'Produtos',
                click: () => productWindow()
            },
            {
                type: 'separator'
            },
            {
                label: 'Sair',
                accelerator: 'Alt+F4',
                click: () => app.quit()
            },
        ]
    },
    {
        label: 'Relatórios',
        submenu: [
            {
                label: 'Clientes',
                click: () => gerarRelatorioClientes()
            },
            {
                label: 'Fornecedor',
                click: () => gerarRelatorioFornecedor()
            },
            {
                label: 'Produto',
                click: () => gerarRelatorioProduto()
            }
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

// Aviso (pop-up) ao abrir a janela
ipcMain.on('notice-box', () => {
    dialog.showMessageBox({
        type: 'info',
        title: "Atenção!",
        message: "Preencha o campo de busca com os dados antes de iniciar",
        buttons: ['OK']
    })
})


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
            cpfCliente: cliente.cpfCli,
            cepCliente: cliente.cepCli,
            enderecoCliente: cliente.enderecoCli,
            bairroCliente: cliente.bairroCli,
            cidadeCliente: cliente.cidadeCli,
            numRuaCliente: cliente.numRuaCli,
            complementoCliente: cliente.compleCli,
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


// CRUD - Read - Nome >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('dialog-search', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Atenção!',
        message: 'Preencha um nome no campo de Busca',
        buttons: ['OK']
    })
})


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

        // Melhoria na experiência do usuário (se não existir o cliente cadstrado, enviar mensagem e questionar se o usuário deseja cadastrar um novo cliente)
        if (dadosCliente.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Clientes',
                message: 'Cliente não cadastrado.\nDeseja cadastrar este cliente?',
                defaultId: 0,
                buttons: ['Sim', 'Não']
            }).then((result) => {
                if (result.response === 0) {
                    event.reply('set-nameClient')

                } else {
                    event.reply('reset-form')
                }
            })

        }

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
            cpfCliente: cliente.cpfCli,
            cepCliente: cliente.cepCli,
            enderecoCliente: cliente.enderecoCli,
            bairroCliente: cliente.bairroCli,
            cidadeCliente: cliente.cidadeCli,
            numRuaCliente: cliente.numRuaCli,
            complementoCliente: cliente.compleCli,
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

// Acessar site externo 
ipcMain.on('url-site', (event, site) => {
    let url = site.url
    //console.log(url)
    shell.openExternal(url)
})


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
            cnpjFornecedor: fornecedor.cnpjForne,
            dddFornecedor: fornecedor.dddForne,
            foneFornecedor: fornecedor.foneForne,
            siteFornecedor: fornecedor.siteForne,
            cepFornecedor: fornecedor.cepForne,
            enderecoFornecedor: fornecedor.endForne,
            bairroFornecedor: fornecedor.bairroForne,
            cidadeFornecedor: fornecedor.cidadeForne,
            estadoFornecedor: fornecedor.estadoForne,
            ufFornecedor: fornecedor.ufForne,
            numRuaFornecedor: fornecedor.numRuaForne,
            complementoFornecedor: fornecedor.compleForne

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
        // Verifica se o erro é de chave duplicada (CNPJ já 
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

        if (dadosFornecedor.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Clientes',
                message: 'Fornecedor não cadastrado.\nDeseja cadastrar este Fornecedor?',
                defaultId: 0,
                buttons: ['Sim', 'Não']
            }).then((result) => {
                if (result.response === 0) {
                    event.reply('set-nameSuplier')

                } else {
                    event.reply('reset-form')
                }
            })
        }



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
            cnpjFornecedor: fornecedor.cnpjForne,
            dddFornecedor: fornecedor.dddForne,
            foneFornecedor: fornecedor.foneForne,
            siteFornecedor: fornecedor.siteForne,
            cepFornecedor: fornecedor.cepForne,
            enderecoFornecedor: fornecedor.endForne,
            bairroFornecedor: fornecedor.bairroForne,
            cidadeFornecedor: fornecedor.cidadeForne,
            estadoFornecedor: fornecedor.estadoForne,
            ufFornecedor: fornecedor.ufForne,
            numRuaFornecedor: fornecedor.numRuaForne,
            complementoFornecedor: fornecedor.compleForne

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

// Obter o caminho da imagem (executar o open dialog)
ipcMain.handle('open-file-dialog', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        title: "Selecionar Imagem",
        properties: ['openFile'],
        filters: [
            {
                name: 'Imagens',
                extensions: ['png', 'jpg', 'jpeg']
            }
        ]
    })

    if (canceled === true || filePaths.length === 0) {
        return null
    } else {
        return filePaths[0] // retorna o caminho do arquivo
    }
})

// Recebimento dos dados do formulário do produto
ipcMain.on('new-product', async (event, produto) => {
    console.log(produto)

    let caminhoImagemSalvo = ""

    try {
        if (produto.caminhoImagemPro) {
            const uploadDir = path.join(__dirname, 'uploads')
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir)
            }

            const fileName = `${Date.now()}_${path.basename(produto.caminhoImagemPro)}}`
            const uploads = path.join(uploadDir, fileName)

            fs.copyFileSync(produto.caminhoImagemPro, uploads)

            caminhoImagemSalvo = uploads
        }

        const novoProduto = new produtoModel({
            barCodeProduto: produto.barcodePro,
            nomeProduto: produto.nomePro,
            precoProduto: produto.precoPro,
            caminhoImagemProduto: caminhoImagemSalvo
        })

        await novoProduto.save()

        dialog.showMessageBox({
            type: 'info',
            message: 'Produto cadastrado com sucesso.',
            buttons: ['OK']
        })

        event.reply('reset-form')

    } catch (error) {
        if (error.code === 11000) {
            dialog.showMessageBox({
                type: 'error',
                title: 'Atenção!',
                message: "Barcode já cadastrado\nVerifique se digitou corretamente.",
                buttons: ['OK']
            }).then((result) => {
                if (result.response === 0) {
                    event.reply('barcode-invalido')
                }
            })
        } else {
            console.log(error)
        }
    }
})

// CRUD CREATE
ipcMain.on('new-barcode', async (event, produto) => {
    console.log(produto)

    try {
        const novoBarcode = new produtoModel({
            nomeProduto: produto.nomePro,
            barCodeProduto: produto.barcodePro,
            precoProduto: produto.precoProduto
        })

        await novoBarcode.save()

        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: "Produto Adicionado com Sucesso",
            buttons: ['OK']
        })

        event.reply('reset-form')

    } catch (error) {
        if (error.code === 11000) {
            dialog.showMessageBox({
                type: 'error',
                title: 'Atenção!',
                message: "Barcode já cadastrado\nVerifique se digitou corretamente.",
                buttons: ['OK']
            }).then((result) => {
                if (result.response === 0) {
                    event.reply('barcode-invalido')
                }
            })
        } else {
            console.log(error)
        }
    }
})
// Fim do CRUD Create

// CRUD READ/NOME
ipcMain.on('search-name', async (event, proNome) => {
    console.log(proNome)

    try {
        const dadosProduto = await produtoModel.find({
            nomeProduto: new RegExp(proNome, 'i')
        })

        if (dadosProduto.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Produto',
                message: 'Produto não cadastrado.\nDeseja cadastrar este produto?',
                buttons: ['Sim', 'Não']
            }).then((result) => {
                if (result.response === 0) {
                    event.reply('set-name', proNome);
                } else {
                    event.reply('reset-form');
                }
            });
        } else {
            event.reply('data-product', JSON.stringify(dadosProduto));
        }

    } catch (error) {
        console.log(error)
    }
})
// FIM DO CRUD READ/NOME


// CRUD READ /CÓDIGO
ipcMain.on('search-code-product', async (event, barcodeProduto) => {
    console.log(barcodeProduto)

    try {
        const dadosProdutoCode = await produtoModel.find({
            barcodeProduto: new RegExp(barcodeProduto, 'i')
        })
        console.log(dadosProdutoCode)

        if (dadosProdutoCode.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Produtos',
                message: 'Produto não cadastrado.\nDeseja cadastrar esse produto?',
                defaultId: 0,
                buttons: ['SIM', 'NÃO']
            }).then((result) => {
                if (result.response === 0) {
                    event.reply('set-barcode')
                } else {
                    event.reply('reset-form')
                }
            })
        }

        event.reply('product-data', JSON.stringify(dadosProdutoCode))

    } catch (error) {
        console.log(error)
    }
})
// FIM DO CRUD READ /CÓDIGO


// CRUD UPDATE
ipcMain.on('update-product', async (event, produto) => {
    console.log(produto)

    if (produto.caminhoImagemPro === "") {
        try {
            await produtoModel.findByIdAndUpdate(
                produto.idPro, {
                barCodeProduto: produto.barcodePro,
                nomeProduto: produto.nomePro,
                precoProduto: produto.precoPro
            }, { new: true }
            )
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            await produtoModel.findByIdAndUpdate(
                produto.idPro, {
                barCodeProduto: produto.barcodePro,
                nomeProduto: produto.nomePro,
                precoProduto: produto.precoPro,
                caminhoImagemProduto: produto.caminhoImagemPro
            }, { new: true }
            )
        } catch (error) {
            console.log(error)
        }
    }

    dialog.showMessageBox(product, {
        type: 'info',
        message: 'Dados do produto alterados com sucesso.',
        buttons: ['OK']
    }).then((result) => {
        if (result.response === 0) {
            event.reply('reset-form')
        }
    })
})
//  FIM DO CRUD UPDATE

// CRUD Delete
ipcMain.on('delete-product', async (event, idProduto) => {
    console.log(idProduto)

    const { response } = await dialog.showMessageBox(product, {
        type: 'warning',
        buttons: ['Cancelar', 'Excluir'],
        title: 'Atenção!',
        message: 'Tem certeza que deseja excluir este Produto?'
    })

    console.log(response)
    if (response === 1) {
        try {
            await produtoModel.findByIdAndDelete(idProduto)
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
// FIM DO CRUD DELETE


/****************************************/
/************** Relatórios  *************/
/****************************************/

// Relatório de clientes 

async function gerarRelatorioClientes() {
    try {
        // listar os clientes por ordem alfabética
        const cliente = await clienteModel.find().sort({ nomeCliente: 1 })
        console.log(cliente)
        // Formatação do documento
        const doc = new jsPDF('p', 'mm', 'a4') // p (portrait), l (landiscape)
        // tamanho da fonte (Titulo) 
        doc.setFontSize(14)
        // Escrever um texto (titulo)
        doc.text("Relatório de clientes", 14, 20) // x, y (mm)
        // Data 
        const dataAtual = new Date().toLocaleDateString('pt-BR')
        doc.setFontSize(12)
        doc.text(`Data: ${dataAtual}`, 160, 10)
        // varivél de apoio para formatação de altura do conteúdo
        let y = 45
        doc.text("Nome", 14, y)
        doc.text("Telefone", 80, y)
        doc.text("E-mail", 130, y)
        y += 5
        // desenhar linha 
        doc.setLineWidth(0.5) // expessura da linha
        doc.line(10, y, 200, y) // inicio fim 
        y += 10
        // renderizar os clientes 
        cliente.forEach((c) => {
            // se ultrapassar o limite da folha (A4 = 270 mm) adicionar outr página
            if (y > 250) {
                doc.addPage()
                y = 20 //q cabeçalho da página
            }
            doc.text(c.nomeCliente, 14, y)
            doc.text(c.foneCliente, 80, y)
            doc.text(c.emailCliente || "N/A", 130, y)
            y += 10

        })
        // Setar o caminho do arquivo temporário
        const tempDir = app.getAppPath('temp')
        const filePath = path.join(tempDir, 'clientes.pdf') // nome do arquivo
        doc.save(filePath)
        // abrir o arquivo no navegador padrão
        shell.openPath(filePath)
    } catch (error) {
        console.log(error)
    }
}


// Relatório de Fornecedores 

async function gerarRelatorioFornecedores() {
    try {
        // listar os clientes por ordem alfabética
        const fornecedor = await fornecedorModel.find().sort({ razaoFornecedor: 1 })
        console.log(fornecedor)
        // Formatação do documento
        const doc = new jsPDF('p', 'mm', 'a4') // p (portrait), l (landiscape)
        // tamanho da fonte (Titulo) 
        doc.setFontSize(14)
        // Escrever um texto (titulo)
        doc.text("Relatório de Fornecedores", 14, 20) // x, y (mm)
        // Data 
        const dataAtual = new Date().toLocaleDateString('pt-BR')
        doc.setFontSize(12)
        doc.text(`Data: ${dataAtual}`, 160, 10)
        // varivél de apoio para formatação de altura do conteúdo
        let y = 45
        doc.text("Razão", 14, y)
        doc.text("CNPJ", 80, y)
        doc.text("site", 130, y)
        y += 5
        // desenhar linha 
        doc.setLineWidth(0.5) // expessura da linha
        doc.line(10, y, 200, y) // inicio fim 
        y += 10
        // renderizar os clientes 
        fornecedor.forEach((f) => {
            // se ultrapassar o limite da folha (A4 = 270 mm) adicionar outr página
            if (y > 250) {
                doc.addPage()
                y = 20 //q cabeçalho da página
            }
            doc.text(f.razaoFornecedor, 14, y)
            doc.text(f.cnpjFornecedor, 80, y)
            doc.text(f.siteFornecedor || "N/A", 130, y)
            y += 10

        })
        // Setar o caminho do arquivo temporário
        const tempDir = app.getAppPath('temp')
        const filePath = path.join(tempDir, 'fornecedores.pdf') // nome do arquivo
        doc.save(filePath)
        // abrir o arquivo no navegador padrão
        shell.openPath(filePath)
    } catch (error) {
        console.log(error)
    }
}

// Relatório de Fornecedores 

async function gerarRelatorioProdutos() {
    try {
        // listar os clientes por ordem alfabética
        const produto = await produtoModel.find().sort({ nomeProduto: 1 })
        console.log(produto)
        // Formatação do documento
        const doc = new jsPDF('p', 'mm', 'a4') // p (portrait), l (landiscape)
        // tamanho da fonte (Titulo) 
        doc.setFontSize(14)
        // Escrever um texto (titulo)
        doc.text("Relatório de Produtos", 14, 20) // x, y (mm)
        // Data 
        const dataAtual = new Date().toLocaleDateString('pt-BR')
        doc.setFontSize(12)
        doc.text(`Data: ${dataAtual}`, 160, 10)
        // varivél de apoio para formatação de altura do conteúdo
        let y = 45
        doc.text("Produto", 14, y)
        doc.text("Código de Barras", 130, y)
        y += 5
        // desenhar linha 
        doc.setLineWidth(0.5) // expessura da linha
        doc.line(10, y, 200, y) // inicio fim 
        y += 10
        // renderizar os clientes 
        produto.forEach((p) => {
            // se ultrapassar o limite da folha (A4 = 270 mm) adicionar outr página
            if (y > 250) {
                doc.addPage()
                y = 20 //q cabeçalho da página
            }
            doc.text(p.nomeProduto, 14, y)
            doc.text(p.barCodeProduto || "N/A", 130, y)
            y += 10

        })
        // Setar o caminho do arquivo temporário
        const tempDir = app.getAppPath('temp')
        const filePath = path.join(tempDir, 'produtos.pdf') // nome do arquivo
        doc.save(filePath)
        // abrir o arquivo no navegador padrão
        shell.openPath(filePath)
    } catch (error) {
        console.log(error)
    }
}

//relatorios.html
// Adicione esses listeners junto com os outros existentes
ipcMain.on('gerar-relatorio-clientes', () => gerarRelatorioClientes())
ipcMain.on('gerar-relatorio-fornecedores', () => gerarRelatorioFornecedores())
ipcMain.on('gerar-relatorio-produtos', () => gerarRelatorioProdutos())


// Handler para carregar fornecedores
ipcMain.handle('carregar-fornecedores', async () => {
    try {
        const fornecedores = await fornecedorModel.find({}, 'nomeFornecedor').sort({ razaoFornecedor: 1 });
        return fornecedores.map(f => f.razaoFornecedor);
    } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
        return [];
    }
});