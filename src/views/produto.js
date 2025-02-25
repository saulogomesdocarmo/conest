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
let arrayCliente = []

// captura dos inputs do formulário
let formProduto = document.getElementById('frmProduto')
let idProduto = document.getElementById('inputProdut')
let barcodeProduto = document.getElementById('inputCodBarra')
let nomeProduto = document.getElementById('inputNameProduto')
let precoProduto = document.getElementById('inputPrecoProduto')









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