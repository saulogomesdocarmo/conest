/**
 * Processo de Renderização do Documento -> produto.html
 */


// Array usado para manipulação de dados
let arrayProduto = []
// CRUD Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (capturar os dados)

let formProduto = document.getElementById('frmProduto')
let nomeProduto = document.getElementById('inputNameProduto')
let precoProduto = document.getElementById('inputUnidadeProduto')
let codbarraProduto = document.getElementById('inputCodBarra')


// Evento associado ao botão adicionar (Quando o botão for pressionado)

formProduto.addEventListener('submit', async (event) => {

    event.preventDefault()

    // console.log(nomeProduto.value, unidadeProduto.value, codbarraProduto.value)

    // Passo 2 - slide (envio das informações para o main)
    // cirar um objeto

    const produto = {
        nomeProd: nomeProduto.value,
        precoProd: precoProduto.value,
        codProd: codbarraProduto.value
    }
    api.novoProduto(produto)
})

// Fim do CRUD Creat <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD READ  NOME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarProdutos() {

    let nomeProd = document.getElementById('searchProduto').value
    console.log(nomeProd)

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
        })
    })
}

// Fim do CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD READ  CÓDIGO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarProdutosCodBar() {
    let codProd = document.getElementById('searchCodigo').value

    console.log(codProd)

    api.buscarProdutosCodBar(codProd)

    api.renderizarCodigo((event, dadosProdutCode ) => { 

        console.log(dadosProdutCode)

        const produtoRenderizado = JSON.parse(dadosProdutCode)
        arrayProduto = produtoRenderizado

        console.log(arrayProduto)

        arrayProduto.forEach((p) => {
            document.getElementById('inputNameProduto').value = p.nomeProduto
            document.getElementById('inputUnidadeProduto').value = p.precoProduto
            document.getElementById('inputCodBarra').value = p.codigoProduto
            document.getElementById('inputProdut').value = p._id
        }) 
    })

}

// FIM DO CRUD READ - CÓDIGO>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// RESTAR FORMULÁRIO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

api.resetarFormulario((args) => {
    document.getElementById('inputNameProduto').value = ''
    document.getElementById('inputUnidadeProduto').value = ''
    document.getElementById('inputCodBarra').value = ''
})