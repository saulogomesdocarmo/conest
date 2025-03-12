/**
 * Processo de Renderização do Documento -> produto.html
 */

const focoName = document.getElementById('searchProductName')
const focoCode = document.getElementById('searchProdutoBarCode')


// configuração inicial do formulário
document.addEventListener('DOMContentLoaded', () => {
    btnUpdateProdut.disabled = true
    btnDeleteProdut.disabled = true
    focoName.focus()

    // Adiciona o evento para o campo de código de barras
    document.getElementById('searchProdutoBarCode').addEventListener('input', (event) => {
        // Verifica se o campo de barcode foi alterado (presumimos que o leitor de código de barras digite diretamente)
        if (event.target.value.length > 0) {
            // Coloca o valor escaneado diretamente no campo de Barcode (não no nome do produto)
            document.getElementById('inputCodBarra').value = event.target.value;


            // Dispara a função de busca do produto por barcode
            buscarProdutoCode()
        }
    });
})

// Manipulação do evento Enter para buscar por nome ou barcode
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault()

        const valorBusca = focoName.value || focoCode.value;

        if (focoName === document.activeElement) {
            buscarProdutoNome(valorBusca)

        }

        else if (focoCode === document.activeElement) {
            buscarProdutoCode(valorBusca)
        }
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
let arrayBarcode = []

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

    // Estratégia usada para diferenciar adicionar/editat (se existir idProduto)
    if (idProduto.value === "") {
        const produto = {
            barcodePro: barcodeProduto.value,
            nomePro: nomeProduto.value,
            precoPro: precoProduto.value,
            caminhoImagemPro: caminhoImagem ? caminhoImagem : ""
        }
        api.novoProduto(produto)

    } else {

        const produto = {
            idPro: idProduto.value,
            barcodePro: barcodeProduto.value,
            nomePro: nomeProduto.value,
            precoPro: precoProduto.value,
            caminhoImagemPro: caminhoImagem ? caminhoImagem : ""
        }
        api.editarProduto(produto)
    }

})

// CRUD Read Código de Barras >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function buscarProdutoCode() {
    let barcode = document.getElementById('searchProdutoBarCode').value.trim();
    // console.log(barcode) // teste passo 1 do fluxo (slides)

    // validação
    if (barcode === "") {
        api.validarBusca()
        focoName.focus();
        return;
    }

    api.buscarProdutoCode(barcode)

    // Passo 2 de 
    // Fluxo (slides)
    // Recebimento dos dados do produto
    api.renderizarProdutoCode((event, dadosBarcode) => {
        try {
            if (!dadosBarcode || dadosBarcode === "[]" || dadosBarcode.length === 0) {
                if (confirm("Código de barras não encotrado. Deseja cadastrar um novo produto ?")) {
                    document.getElementById('inputCodBarra').value = barcode
                    document.getElementById('inputNameProduto').focus();
                    document.getElementById('btnCreatProdut').disabled = false;
                } else {
                    document.getElementById('searchProdutoBarCode').value = "";
                }

                return;
            }

            const barcodeRenderizado = JSON.parse(dadosBarcode)
            if (barcodeRenderizado.length > 0) {
                const produto = barcodeRenderizado[0];

                document.getElementById('inputNameProduto').value = produto.nomeProduto;
                document.getElementById('inputCodBarra').value = produto.barCodeProduto;
                document.getElementById('inputPrecoProduto').value = produto.precoProduto
                document.getElementById('inputProdut').value = produto._id

                focoName.value = "";
                focoName.disabled = true;
                btnReadProduct.disabled = true;
                btnCreatProdut.disabled = true;

                document.getElementById('btnUpdateProdut').disabled = false;
                document.getElementById('btnDeleteProdut').disabled = false;
            }
        } catch (error) {
            console.error("Erro ao processar os dados do produto:", error)
        }
    })

}


//CRUD READ NOME

function buscarProdutoNome() {

    let nomeProduto = document.getElementById('searchProductName').value

    if (nomeProduto === 0) {
        api.validarBusca();
        focoName.focus();
    } else {

        api.buscarProdutoNome(nomeProduto)

        api.renderizarProduto((event, dadosProduto) => { 
            console.log(dadosProduto);
            
            const produtoRenderizado = JSON.parse(dadosProduto);
            arrayProduto = produtoRenderizado;

            console.log(arrayProduto)

            arrayProduto.forEach((c) => {
                document.getElementById('inputNameProduct').value = c.nomeProduto;  // Preencher o nome do produto
                document.getElementById('inputBarcodeProduct').value = c.barcodeProduto;
                document.getElementById('inputPriceProduct').value = c.precoProduto;
                document.getElementById('inputIdProduct').value = c._id;
               
                // Limpar o campo de busca e remover o foco
                foco.value = "";
                foco.disabled = true;
                btnRead.disabled = true;
                btnCreate.disabled = true;
               
                // Liberar os botões editar e excluir
                document.getElementById('btnUpdate').disabled = false;
                document.getElementById('btnDelete').disabled = false;
               
                // Restaurar o padrão da tecla Enter
                restaurarEnter();
            })
        });
    }
}
// Fim CRUD READ NOME
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
// FIM do CRUD Read Código de Barras >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// CRUD Read Código Nome >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function apagarProduto() {
    console.log(idProduto.value) // passo 1 (fluxo-do-slide)
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

