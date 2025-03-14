/**
 * Processo de Renderização do Documento -> produto.html
 */

const focoName = document.getElementById('searchProductName')
const focoCode = document.getElementById('searchProdutoBarCode')


// configuração inicial do formulário
document.addEventListener('DOMContentLoaded', () => {
    btnUpdateProdut.disabled = true
    btnDeleteProdut.disabled = true

    focoCode.focus()
})

// Manipulação do evento Enter para buscar por nome ou barcode
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault()

        const valorBusca = focoName.value || focoCode.value;

        if (focoCode === document.activeElement) {
            buscarProdutoNome(valorBusca)

        }

        else if (focoName === document.activeElement) {
            buscarProdutoCode(valorBusca)
        }
    }
}

// Função para remover o manipulador do evento da tecla Enter 
function restaurarEnter() {
    document.getElementById('frmProduto').removeEventListener('keydown', teclaEnter);
    document.getElementById('frmProduto').addEventListener('keydown', teclaEnter) // Reativa o listner
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
    // console.log(barcodeProduto.value, nomeProduto.value, precoProduto.value, caminhoImagem)

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
//CRUD READ NOME

function buscarProdutoNome() {

    let nomeProduto = focoName.value;

    if (nomeProduto === "") {
        api.validarBusca();
        focoName.focus();
    } else {

        api.buscarProdutoNome(nomeProduto)

        api.renderizarProduto((event, dadosProduto) => {
            console.log(dadosProduto);

            const produtoRenderizado = JSON.parse(dadosProduto);
            arrayProduto = produtoRenderizado;

            console.log(arrayProduto)

            if (arrayProduto.length > 0) {
                arrayProduto.forEach((p) => {
                    document.getElementById('inputNameProduct').value = p.nomeProduto;  // Preencher o nome do produto
                    document.getElementById('inputBarcodeProduct').value = p.barcodeProduto;
                    document.getElementById('inputPriceProduct').value = p.precoProduto;
                    document.getElementById('inputIdProduct').value = p._id;

                    // Renderizar a imagem do produto (se existir )

                    if (p.caminhoImagemProduto) {
                        imagem.src = p.caminhoImagemProduto;
                    } else {
                        imagem.src = "../public/img/camera.png"; // Imagem padrão se não houver caminho
                    }

                    // Limpar o campo de busca e remover o foco
                    focoName.value = "";

                    btnRead.disabled = true;
                    btnCreate.disabled = true;

                    btnUpdateProdut.disabled = false;
                    btnDeleteProdut.disabled = false;
                    // Restaurar o padrão da tecla Enter
                    restaurarEnter();

                    desativarCampoBusca();
                });

            } else {

                btnCreate.disabled = false;

                btnUpdateProdut.disabled = true;
                btnDeleteProdut.disabled = true;

                desativarCampoBusca();
            }
        });
    }
}

// Captura o evento para setar o nome do produto

api.setarNomeProduto((event, nomeProduto) => {
    document.getElementById('inputNameProduto').value = nomeProduto; // preenche o campo nome do produto
    document.getElementById('searchProductName').value = ""; // Limpa o campo de busca

    btnCreate.disabled = false; // Habilita o botão adiconar 

    desativarCampoBusca();

    // Colocar o foco no campo de nome do produto
    document.getElementById('inputNameProduto').focus();
})

// CRUD Read Código de Barras >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let isProcessing = false; // varivél para controlar o estado do processamento

function buscarProdutoCode(barcode) {
    if (isProcessing) return; // Se já estiver processando,ignora
    isProcessing = true; // Marca como processando
    let barcode = document.getElementById('searchProdutoBarCode').value.trim();
    // console.log(barcode) // teste passo 1 do fluxo (slides)

    // validação
    if (barcode === "") {
        api.validarBusca();
        focoCode.focus();
    } else {
        api.buscarProdutoCode(barcode)

        api.renderizarProdutoCode((event, dadosBarcode) => {
            const barcodeRenderizado = JSON.parse(dadosBarcode)
            arrayBarcode = barcodeRenderizado

            if (arrayBarcode.length > 0) {

                arrayBarcode.forEach((p) => {
                    document.getElementById('inputProdut').value = p._id;
                    document.getElementById('inputNameProduto').value = p.nomeProduto;
                    document.getElementById('inputCodBarra').value = p.barCodeProduto;
                    document.getElementById('inputPrecoProduto').value = p.precoProduto;

                    // Renderizar a imagem do produto (se existir)
                    if (p.caminhoImagemProduto) {
                        imagem.src = p.caminhoImagemProduto
                        //Atualiza o src da imagem
                    } else {
                        imagem.src = "../public/img/camera.png"; // Imagem padrão se não houver caminho
                    }

                    // Limpar o campo de busca e remover o foco

                    focoCode.value = "";
                    btnRead.disabled = true;
                    btnCreatProdut.disabled = true;

                    btnUpdateProdut.disabled = false;
                    btnDeleteProdut.disabled = false;
                    restaurarEnter()

                    desativarCampoBusca();
                });

            } else {
                // Produto não encontrado
                btnCreatProdut.disabled = false;
                btnUpdateProdut.disabled = true;
                btnDeleteProdut.disabled = true;

                desativarCampoBusca();
            }

            isProcessing = false
        })
    }
}

focoCode.value = "";

// Captura o evento para setar o código de barras
api.setarBarcode((event, barCode) => {
    document.getElementById('inputCodBarra').value = barCode; // Preenche o campo de código de barras
    document.getElementById('searchProdutoBarCode').value = ""; // Limpa o campo de busca
    btnCreate.disabled = false; // Habilita o botão de adicionar

    // Desabilitar os campos de busca
    desabilitarCamposBusca();

    // Colocar o foco no campo de código de barras
    document.getElementById('inputCodBarra').focus();
});

let timeoutId;

focoCode.addEventListener('input', function () {
    clearTimeout(timeoutId); // Limpa o timeout anterior
    timeoutId = setTimeout(() => {
        if (focoCode.value !== "") {
            const enterEvent = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                key: "Enter",
                keyCode: 13,
                which: 13,
            });
            focoCode.dispatchEvent(enterEvent); // Dispara o evento "Enter"
        }
    }, 200); // Atraso de 200ms (ajuste conforme necessário)
});

// FIM do CRUD Read Código de Barras >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function apagarProduto() {
    console.log(idProduto.value) // passo 1 (fluxo-do-slide)
    api.deletarProduto(idProduto.value) // Passo 2 do slide

}
// Fim do CRUD Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Função para desabilitar os campos de busca
function desativarCampoBusca() {
    document.getElementById('searchProductName').disabled = true; // Desabilita o campo de busca por nome 
    document.getElementById('searchProdutoBarCode').disabled = true; // Desabilita o campo de busca por código de barras
}

// Função para navegar entre os campos com a tecla Enter
function navegarComEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede o comportamento padrão do Enter

        // Obtém o campo atual 
        const campoAtual = event.target;

        // Obtém todos os campos do formulário 
        const campos = Array.from(document.querySelector('#frmProduto input[required'));

        // Encontra o índice do campo atual
        const indiceAtual = campos.indexOf(campoAtual);

        // Se o campo atual for o último, envia o formulário
        if (indiceAtual === campos.length - 1) {
            document.getElementById('frmProduto').dispatchEvent(new Event('subimt'))
        } else {
            // Move o foco para o próximo campo
            campos[indiceAtual + 1].focus();
        }
    }
}

// Adiciona o evento de tecla Enter a todos os campos required
document.querySelectorAll('#frmProduto input[required]').forEach(campo => {
    campo.addEventListener('keydown', navegarComEnter);
});
 
// RESTAR FORMULÁRIO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

api.resetarFormulario((args) => {
    resetForm()
})

function resetForm() {
    //recarregar a página
    location.reload()
}

