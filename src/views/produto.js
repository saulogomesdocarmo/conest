/**
 * Processo de Renderização do Documento -> produto.html
 */

// CRUD Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (capturar os dados)

let formProduto = document.getElementById('frmProduto')
let nomeProduto = document.getElementById('inputNameProduto')
let unidadeProduto = document.getElementById('inputUnidadeProduto')
let codbarraProduto = document.getElementById('inputCodBarra')

// Evento associado ao botão adicionar (Quando o botão for pressionado)

formProduto.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeProduto.value, unidadeProduto.value, codbarraProduto.value)

    // Passo 2 - slide (envio das informações para o main)
    // cirar um objeto

    const produto = {
        nomeProd: nomeProduto.value,
        unidadeProd: unidadeProduto.value,
        codProd: codbarraProduto.value
    }
    api.novoProduto(produto)
})

// Fim do CRUD Creat <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

api.resetarFormulario((args) => {
    document.getElementById('inputNameProduto').value = ''
    document.getElementById('inputUnidadeProduto').value = ''
    document.getElementById('inputCodBarra').value = ''
})