/**
 * Processo de Renderização do Documento -> produto.html
 */

const focoCode = document.getElementById('searchProdutoBarCode')

// configuração inicial do formulário
document.addEventListener('DOMContentLoaded', () => {
    btnUpdateProdut.disabled = true
    btnDeleteProdut.disabled = true
    focoCode.focus()
})

// Função para manipular o envento da tecla ENTER
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        buscarProdutoCode()
    }
}

// Função para remover o manipulador do evento da tecla Enter 
function restaurarEnter() {
    document.getElementById('frmProduto').removeEventListener('keydown', teclaEnter)
}

// manipulando o evento (tecla Enter)
document.getElementById('frmProduto').addEventListener('keydown', teclaEnter)

// Array usado nos métodos para manipulação da estrutura de dados
let arrayProduto = []

// captura dos inputs do formulário
let formProduto = document.getElementById('frmProduto')
let idProduto = document.getElementById('inputProdut')
let barcodeProduto = document.getElementById('inputCodBarra')
let nomeProduto = document.getElementById('inputNameProduto')
let precoProduto = document.getElementById('inputPrecoProduto')
let caminhoImagemProduto = document.getElementById('pathImageProduct')
let imagem = document.getElementById('imageProductPreview')

// variável usada para armazenar o caminho da imagem
let caminhoImagem

// CRUD - CREAT/UPDATE >>>>>>>>>>>>>>>>>
// Solicitar ao main o uso do explorador de arquivos e armazenar o caminho da imagem selecionada na variável caminhoImagem

async function uploadImage() {
    caminhoImagem = await api.selecionarArquivo()
    console.log(caminhoImagem)
    // Correção do BUG de Imagem
    if (caminhoImagem) {
        imagem.src = `file://${caminhoImagem}`
    }
    btnCreatProdut.focus() // correção BUG (tecla ENTER)
}

formProduto.addEventListener('submit', async (event) => {
    event.preventDefault()
    // teste de recebimento dos inputs do formulário
    console.log(barcodeProduto.value, nomeProduto.value, precoProduto.value, caminhoImagem)

    // criar um objeto
    // caminhoImagemPro: caminhoImagem ? caminhoImagem : "" 
    // ? : (operador ternário (if else)) correção de BUG se não existir caminho da imagem (se nenhuma imagem selecionada) enviar uma string vazia ""
    const produto = {
        barcodePro: barcodeProduto.value,
        nomePro: nomeProduto.value,
        precoPro: precoProduto.value,
        caminhoImagemPro: caminhoImagem ? caminhoImagem : ""
    }
    api.novoProduto(produto)
})








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

// CRUD Read Código de Barras >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarProdutoCode() {
    let barcode = document.getElementById('searchProdutoBarCode').value
    // console.log(barcode) // teste passo 1 do fluxo (slides)
}