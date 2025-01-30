/**
 * Processo de Renderização do documento -> fornecedores.html
 */

// Array usado nos métodos para manipulação de estrutura
let arrayFornecedor = []

// CRUD - Creat/Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (capturar os dados dos inputs do form)

let formFornecedor = document.getElementById('frmFornecedor')
let idFornecedor = document.getElementById('inputFornecedor')
let razaoFornecedor = document.getElementById('inputNameFornecedor')
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
            dddForne: dddFornecedor.value,
            foneForne: foneFornecedor.value,
            siteForne: siteFornecedor.value,
            cepForne: cepFornecedor.value,
            endForne: enderecoFornecedor.value,
            numRuaForne: numRuaFornecedor.value,
            bairroForne: bairroFornecedor.value,
            cidadeForne: cidadeFornecedor.value,
            estadoForne: estadoFornecedor.value,
            ufForne: ufFornecedor.value
        }
        api.novoFornecedor(fornecedor)
    } else {
        const fornecedor = {
            idForne: idFornecedor.value,
            razaoForne: razaoFornecedor.value,
            dddForne: dddFornecedor.value,
            foneForne: foneFornecedor.value,
            siteForne: siteFornecedor.value,
            cepForne: cepFornecedor.value,
            endForne: enderecoFornecedor.value,
            numRuaForne: numRuaFornecedor.value,
            bairroForne: bairroFornecedor.value,
            cidadeForne: cidadeFornecedor.value,
            estadoForne: estadoFornecedor.value,
            ufForne: ufFornecedor.value
        }
        api.editarFornecedor(fornecedor)

    }

})

// Fim do CRUD - Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// CRUD READ -> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarFornecedor() {

    let forneNome = document.getElementById('searchForner').value
    console.log(forneNome)

    api.buscarFornecedor()

    api.renderizarFornecedor((event, dadosFornecedor) => {

        console.log(dadosFornecedor)

        const fornecedorRenderizado = JSON.parse(dadosFornecedor)
        arrayFornecedor = fornecedorRenderizado

        arrayFornecedor.forEach((f) => {
            document.getElementById('inputNameFornecedor').value = f.razaoFornecedor
            document.getElementById('cepFornecedor').value = f.cepFornecedor
            document.getElementById('dddFornecedor').value = f.dddFornecedor
            document.getElementById('inputSiteFornecedor').value = f.siteFornecedor
            document.getElementById('inputPhoneFornecedor').value = f.foneFornecedor
            document.getElementById('enderecoFornecedor').value = f.enderecoFornecedor
            document.getElementById('bairroFornecedor').value = f.bairroFornecedor
            document.getElementById('cidadeFornecedor').value = f.cidadeFornecedor
            document.getElementById('estadoFornecedor').value = f.estadoFornecedor
            document.getElementById('ufFornecedor').value = f.ufFornecedor
            document.getElementById('numRuaFornecedor').value = f.numRuaFornecedor
            document.getElementById('inputFornecedor').value = f._id
        })
    })
}

// Fim CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function excluirFornecedor() {
    api.deletarFornecedor(idFornecedor.value) // (Passo 1 - Slide)
}

// Fim do CRUD Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

api.resetarFormulario((args) => {
    document.getElementById('inputNameFornecedor').value = ''
    document.getElementById('inputPhoneFornecedor').value = ''
    document.getElementById('inputSiteFornecedor').value = ''
    document.getElementById('dddFornecedor').value = ''
    document.getElementById('cepFornecedor').value = ''
    document.getElementById('enderecoFornecedor').value = ''
    document.getElementById('bairroFornecedor').value = ''
    document.getElementById('cidadeFornecedor').value = ''
    document.getElementById('ufFornecedor').value = ''
    document.getElementById('numRuaFornecedor').value = ''
})

// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

