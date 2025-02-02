/**
 * Processo de Renderização do Documento -> produto.html
 */


// A linha abaixo traz foco para o campo input de buscas
const focoProduto = document.getElementById('searchProduto')

// Mudas as propriedades do documento html ao iniciar a janela
document.addEventListener('DOMContentLoaded', () => {
    btnUpdateProdut.disabled = true
    btnDeleteProdut.disabled = true
    focoProduto.focus()
})

// Função para manipluar o evento da tecla Enter
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        buscarProdutos()
        buscarProdutosCodigo()
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
let precoProduto = document.getElementById('inputUnidadeProduto')
let codbarraProduto = document.getElementById('inputCodBarra')


// Evento associado ao botão adicionar (Quando o botão for pressionado)

formProduto.addEventListener('submit', async (event) => {

    event.preventDefault()

    console.log(nomeProduto.value, codbarraProduto.value)

    // Passo 2 - slide (envio das informações para o main)
    // cirar um objeto

    // Estratégia para determinar se é um novo cadastro de clientes ou a edição de um cliente já existente
    if (idProduto.value === "") {
        const produto = {
            nomeProd: nomeProduto.value,
            precoProd: precoProduto.value,
            codProd: codbarraProduto.value
        }
        api.novoProduto(produto)

    } else {
        // criar um objeto com o Id do produto
        const produto = {
            idProd: idProduto.value,
            nomeProd: nomeProduto.value,
            precoProd: precoProduto.value,
            codProd: codbarraProduto.value
        }
        api.editarProduto(produto)
    }

})

// Fim do CRUD Creat/Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD READ  NOME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarProdutosCodigo() {
    let codProduto = document.getElementById('searchProduto').value
    // console.log(codProduto)
    if (codProduto === "") {
        api.validarBusca()
        focoProduto.focus()
    } else {
        api.buscarcodigo(codProduto)

        api.renderizarproduto((event, dadosProduto) => {
            console.log(dadosProduto)

            const produtoRenderizado = JSON.parse(dadosProduto)
            arrayProduto = produtoRenderizado

            console.log(arrayProduto)

            arrayProduto.forEach((p) => {
                document.getElementById('inputNameProduto').value = p.nomeProduto
                document.getElementById('inputUnidadeProduto').value = p.precoProduto
                document.getElementById('inputCodBarra').value = p.codigoProduto
                document.getElementById('inputProdut').value = p._id

                focoProduto.value = ""

                focoProduto.disabled = true
                // btnProds.disabled = true

                btnReadCode.disabled = true

                btnCreatProdut.disabled = true

                document.getElementById('btnUpdateProdut').disabled = false
                document.getElementById('btnDeleteProdut').disabled = false

                restaurarEnter()

            })
        })
    }
    api.setarProduto(() => {
        //setar o nome do cliente       
        let campoCodeProduto = document.getElementById('searchProduto').value
        document.getElementById('inputCodBarra').focus()
        document.getElementById('inputCodBarra').value = campoCodeProduto
        //limpar o campo de busca e remover o foco
        foco.value = ""
        foco.blur()
        //restaurar o padrão da tecla Enter
        restaurarEnter()
        //reativar os inputs das caixas de texto
        /*
        document.querySelectorAll('.bloqueio input').forEach(input => {
            input.disabled = false
        })
        */
    })


}

function buscarProdutos() {

    let nomeProd = document.getElementById('searchProduto').value
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
                document.getElementById('inputUnidadeProduto').value = p.precoProduto
                document.getElementById('inputCodBarra').value = p.codigoProduto
                document.getElementById('inputProdut').value = p._id

                focoProduto.value = ""
                focoProduto.disabled = true
                btnReadProdut.disabled = true
                btnCreatProdut.disabled = true

                document.getElementById('btnUpdateProdut').disabled = false
                document.getElementById('btnDeleteProdut').disabled = false

                restaurarEnter()
            })
        })
    }

    api.setarNomeProduto(() => {
        let campoNomeprod = document.getElementById('searchProduto').value
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
function exlcuirProduto() {
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