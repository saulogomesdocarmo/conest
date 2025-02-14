/**
 * Processo de Renderização do documento -> fornecedores.html
 */

// A linha abaixo capitura o campo de input de busca
const focoFornecedor = document.getElementById('searchForner')

// A linha abaixo muda as propriedades do documento html ao iniciar a janela
document.addEventListener('DOMContentLoaded', () => {
    btnEdfornecer.disabled = true
    btnDelfornecer.disabled = true
    focoFornecedor.focus()
})

// Função para manipular o evento da tecla Enter
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        buscarFornecedor()
    }
}

// Função remover o manipulador da tecla Enter
function restaurarEnter() {
    document.getElementById('frmFornecedor').removeEventListener('keydown', teclaEnter)
}

// Manipulando a tecla Enter
document.getElementById('frmFornecedor').addEventListener('keydown', teclaEnter)

// Função para acessar site

function acessarSite() {
    let urlFornecedor = document.getElementById('inputSiteSupplier').value.trim()
    let siteErro = document.getElementById('siteErro')

    // Se ainda não existir, cria a mensagem de erro no HTML
    if (!siteErro) {
        siteErro = document.createElement('div')
        siteErro.id = 'siteErro'
        siteErro.style.color = 'red'
        siteErro.style.fontSize = '0.9em'
        siteErro.style.marginTop = '5px'
        document.getElementById('inputSiteSupplier').after(siteErro)
    }

    // Verifica se o campo está vazio ou contém valor padrão
    if (!urlFornecedor || urlFornecedor === "https://") {
        siteErro.textContent = "Por favor, insira um site válido antes de acessar."
        return
    }

    // Valida se a URL começa com 'https://'
    if (!/^https:\/\/.+/.test(urlFornecedor)) {
        siteErro.textContent = "URL inválida! O site deve começar com 'https://'."
        return
    }

    // Remove a mensagem de erro se a URL for válida
    siteErro.textContent = ""

    // Bloquear a navegação caso a URL seja inválida
    try {
        // Tentativa de abrir o site
        api.abrirSite({ url: urlFornecedor })
    } catch (error) {
        siteErro.textContent = "Erro ao tentar acessar o site. Verifique a URL."
    }
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<




// Array usado nos métodos para manipulação de estrutura
let arrayFornecedor = []

// CRUD - Creat/Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (capturar os dados dos inputs do form)

let formFornecedor = document.getElementById('frmFornecedor')
let idFornecedor = document.getElementById('inputFornecedor')
let razaoFornecedor = document.getElementById('inputNameFornecedor')
let cnpjFornecedor = document.getElementById('cnpjFornecedor')
let foneFornecedor = document.getElementById('inputPhoneFornecedor')
let siteFornecedor = document.getElementById('inputSiteFornecedor')
let dddFornecedor = document.getElementById('dddFornecedor')
let cepFornecedor = document.getElementById('cepFornecedor')
let enderecoFornecedor = document.getElementById('enderecoFornecedor')
let bairroFornecedor = document.getElementById('bairroFornecedor')
let cidadeFornecedor = document.getElementById('cidadeFornecedor')
let estadoFornecedor = document.getElementById('estadoFornecedor')
let ufFornecedor = document.getElementById('ufFornecedor')
let numRuaFornecedor = document.getElementById('numRuaFornecedor')
let compleFornecedor = document.getElementById('CompleFornecedor')

// Evento associado ao botão adicionar (Quando o botão for pressionado)

formFornecedor.addEventListener('submit', async (event) => {
    // Evitar o comportamento padrão de envio de um formulário 
    event.preventDefault()
    // Teste importante ! (Fluxo de dados )
    console.log(razaoFornecedor.value, foneFornecedor.value, siteFornecedor.value)

    // Passo 2 - slide (enviar as informações para o main)
    // criar um objeto

    // Estratégia para determinar se é um novo cadastro de fornecedores ou a edição de um fornecedor já existente
    if (idFornecedor.value === "") {
        // criar um objeto
        const fornecedor = {
            razaoForne: razaoFornecedor.value,
            cnpjForne: cnpjFornecedor.value,
            dddForne: dddFornecedor.value,
            foneForne: foneFornecedor.value,
            siteForne: siteFornecedor.value,
            cepForne: cepFornecedor.value,
            endForne: enderecoFornecedor.value,
            numRuaForne: numRuaFornecedor.value,
            bairroForne: bairroFornecedor.value,
            cidadeForne: cidadeFornecedor.value,
            estadoForne: estadoFornecedor.value,
            ufForne: ufFornecedor.value,
            compleForne: compleFornecedor.value
        }
        api.novoFornecedor(fornecedor)
    } else {
        const fornecedor = {
            idForne: idFornecedor.value,
            razaoForne: razaoFornecedor.value,
            cnpjForne: cnpjFornecedor.value,
            dddForne: dddFornecedor.value,
            foneForne: foneFornecedor.value,
            siteForne: siteFornecedor.value,
            cepForne: cepFornecedor.value,
            endForne: enderecoFornecedor.value,
            numRuaForne: numRuaFornecedor.value,
            bairroForne: bairroFornecedor.value,
            cidadeForne: cidadeFornecedor.value,
            estadoForne: estadoFornecedor.value,
            ufForne: ufFornecedor.value,
            compleForne: compleFornecedor.value
        }
        api.editarFornecedor(fornecedor)

    }

})

// Fim do CRUD - Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// CRUD READ -> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarFornecedor() {

    let forneNome = document.getElementById('searchForner').value
    // console.log(forneNome)
    if (forneNome === "") {
        api.validarBusca() // Validação do campo obrigatório
        focoFornecedor.focus()
    } else {
        api.buscarFornecedor(forneNome)

        api.renderizarFornecedor((event, dadosFornecedor) => {

            console.log(dadosFornecedor)

            const fornecedorRenderizado = JSON.parse(dadosFornecedor)
            arrayFornecedor = fornecedorRenderizado

            arrayFornecedor.forEach((f) => {
                document.getElementById('inputNameFornecedor').value = f.razaoFornecedor
                document.getElementById('cepFornecedor').value = f.cepFornecedor
                document.getElementById('cnpjFornecedor').value = f.cnpjFornecedor
                document.getElementById('dddFornecedor').value = f.dddFornecedor
                document.getElementById('inputSiteFornecedor').value = f.siteFornecedor
                document.getElementById('inputPhoneFornecedor').value = f.foneFornecedor
                document.getElementById('enderecoFornecedor').value = f.enderecoFornecedor
                document.getElementById('bairroFornecedor').value = f.bairroFornecedor
                document.getElementById('cidadeFornecedor').value = f.cidadeFornecedor
                document.getElementById('estadoFornecedor').value = f.estadoFornecedor
                document.getElementById('ufFornecedor').value = f.ufFornecedor
                document.getElementById('numRuaFornecedor').value = f.numRuaFornecedor
                document.getElementById('CompleFornecedor').value = f.complementoFornecedor
                document.getElementById('inputFornecedor').value = f._id

                // Limpar o campo de busca e remover o foco
                focoFornecedor.value = ""
                focoFornecedor.disabled = true

                // desativar o botão de buscar
                btnreadfornecer.disabled = true
                // desativar o botão de adicionar
                btnAdfornecer.disabled = true
                // liberar os botões editar e exlcuir
                document.getElementById('btnEdfornecer').disabled = false
                document.getElementById('btnDelfornecer').disabled = false
                // restauar o padrão da telca Enter
                restaurarEnter()
                // reativar os inputs das caixas

            })
        })
    }

    api.setarNomeFornecedor(() => {
        // setar o nome do cliente
        let campoRazao = document.getElementById('searchForner').value
        document.getElementById('inputNameFornecedor').focus
        document.getElementById('inputNameFornecedor').value = campoRazao

        // limpar o campo de busca e remover o foco
        focoFornecedor.value = ""
        focoFornecedor.blur()
        // restaurar o padrão da tecla Enter
        restaurarEnter()
    })

}

// Fim CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function excluirFornecedor() {
    api.deletarFornecedor(idFornecedor.value) // (Passo 1 - Slide)
}

// Fim do CRUD Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Função para acessar site >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function acessarSite() {
    let urlFornecedor = document.getElementById('inputSiteFornecedor').value
    // console.log(urlFornecedor)
    const url = {
        url: urlFornecedor
    }
    api.abrirSite(url)
}


// Função para resetar formulário >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..

api.resetarFormulario((args) => {
    resetForm()
})

function resetForm() {
    location.reload()
}

// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

