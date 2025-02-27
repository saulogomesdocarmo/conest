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

// CRUD Read Código de Barras >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarProdutoCode() {
    let barcode = document.getElementById('searchProdutoBarCode').value
    // console.log(barcode) // teste passo 1 do fluxo (slides)

    // validação
    if (barcode === "") {
        api.validarBusca()
        focoCode.focus()
    } else {
        api.buscarProdutoCode(barcode) // Passo 2 de 
        // Fluxo (slides)
        // Recebimento dos dados do produto
        api.renderizarProduto((event, dadosProduto) => {    // teste do passo 5
            console.log(dadosProduto)
            // Passo 6 Renderização dos dados do produto
            const produtoRenderizado = JSON.parse(dadosProduto)
            arrayProduto = produtoRenderizado
            // percorrer o vetor de produtos e extrair os dados e setar (preencher) os campos do formulário

            arrayProduto.array.forEach((p) => {
                document.getElementById('inputProdut').value = p._id
                document.getElementById('inputCodBarra').value = p.barcodeProduto
                document.getElementById('inputNameProduto').value = p.nomeProduto
                document.getElementById('inputPrecoProduto').value = p.precoProduto

                // ######## Renderizar Imagem#####
                // se exister imagem cadastrada 

                if (p.caminhoImagemProduto) {
                    imagem.src = p.caminhoImagemProduto
                }

                // limpar o campo de busca, remover o foco e desativar a busca
                focoCode.value = ""
                focoCode.disabled = true
                // liberar os  botões editar e exlcuir e bloquear o botão adicionar
                document.getElementById('btnUpdateProdut').disabled = false
                document.getElementById('btnDeleteProdut').disabled = false
                document.getElementById('btnCreatProdut').disabled = true
            });
        })
    }
}

// Setar o campo do código de barras (se o produto não estiver cadastrado)

api.setarBarcode(() => {
    // setar o barcode do produto
    let campoBarcode = document.getElementById('searchProdutoBarCode').value
    document.getElementById('inputCodBarra').value = campoBarcode
    // limpar o campo de busca e remover o foco
    focoCode.value = ""
    document.getElementById('inputNameProduto').focus()
    //restaurar a teclaEnter (associar ao botão adicionar)
    restaurarEnter()
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

