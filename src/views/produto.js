/**
 * Processo de Renderização do Documento -> produto.html
 */


// A linha abaixo traz foco para o campo input de buscas
const focoProduto = document.getElementById('searchProdutoNome')
const focoprodutoBarcode = document.getElementById('searchProdutoBarCode')

// Mudas as propriedades do documento html ao iniciar a janela
document.addEventListener('DOMContentLoaded', () => {
    btnUpdateProdut.disabled = true
    btnDeleteProdut.disabled = true
    focoProduto.focus()
    focoprodutoBarcode.focus()


})

// Função para manipluar o evento da tecla Enter
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        buscarProdutos()

    }
}

// Função para remover o manipulador do evento da tecla Enter
function restaurarEnter() {
    document.getElementById('frmProduto').removeEventListener('keydown', teclaEnter)
}

// Manipulando o evento (tecla Enter)
document.getElementById('frmProduto').addEventListener('keydown', teclaEnter)
// Array usado para manipulação de dados
let arrayProduto = []

// CRUD Creat/Update>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (capturar os dados)

let formProduto = document.getElementById('frmProduto')
let idProduto = document.getElementById('inputProdut')
let nomeProduto = document.getElementById('inputNameProduto')
let codeProduto = document.getElementById('inputCodBarra')
let precoProduto = document.getElementById('inputPrecoProduto')



// Evento associado ao botão adicionar (Quando o botão for pressionado)

formProduto.addEventListener('submit', async (event) => {

    event.preventDefault()

    console.log(nomeProduto.value, codeProduto.value)

    // Passo 2 - slide (envio das informações para o main)
    // cirar um objeto

    // Estratégia para determinar se é um novo cadastro de produto ou a edição de um cliente já existente
    if (idProduto.value === "") {
        const produto = {
            nomeProd: nomeProduto.value,
            precoProd: precoProduto.value,
            codigoProd: codeProduto.value
        }
        api.novoProduto(produto)

    } else {
        // criar um objeto com o Id do produto
        const produto = {
            idProd: idProduto.value,
            nomeProd: nomeProduto.value,
            precoProd: precoProduto.value,
            codigoProd: codeProduto.value

        }
        api.editarProduto(produto)
    }

})

// Fim do CRUD Creat/Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD READ  CODIGO DO PRODUTO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// CRUD READ - NOME DO PRODUTO
function buscarProdutos() {

    let nomeProd = document.getElementById('searchProdutoNome').value
    // console.log(nomeProd)
    if (nomeProd === "") {
        // api.validarBusca()
        focoProduto.focus()
    } else {
        api.buscaproduto(nomeProd)

        api.renderizarproduto((event, dadosProduto) => {
            console.log(dadosProduto)

            const produtoRenderizado = JSON.parse(dadosProduto)
            arrayProduto = produtoRenderizado

            console.log(arrayProduto)

            arrayProduto.forEach((p) => {
                document.getElementById('inputNameProduto').value = p.nomeProduto
                document.getElementById('inputCodBarra').value = p.barCodeProduto
                document.getElementById('inputProdut').value = p._id
                document.getElementById('inputPrecoProduto').value = p.precoProduto

                focoProduto.value = ""
                focoProduto.disabled = true

                // desativando os botões de busca
                btnReadProdut.disabled = true


                btnCreatProdut.disabled = true

                document.getElementById('btnUpdateProdut').disabled = false
                document.getElementById('btnDeleteProdut').disabled = false

                restaurarEnter()
            })
        })
    }

    api.setarNomeProduto(() => {
        let campoNomeprod = document.getElementById('searchProdutoNome').value
        document.getElementById('inputNameProduto').focus()
        document.getElementById('inputNameProduto').value = campoNomeprod

        foco.value = ""
        foco.blur()
        restaurarEnter()
    })

}

// Fim do CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD READ  CÓDIGO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function apagarProduto() {
    api.deletarProduto(idProduto.value) // Passo 2 do slide

}
// Fim do CRUD Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// RESTAR FORMULÁRIO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

api.resetarFormulario((args) => {
    resetForm()
})

function resetForm() {
    //recarregar a página
    location.reload()
}