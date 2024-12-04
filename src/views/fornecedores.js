/**
 * Processo de Renderização do documento -> fornecedores.html
 */

// CRUD - Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (capturar os dados dos inputs do form)

let formFornecedor = document.getElementById('frmFornecedor')
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

// Evento associado ao botão adicionar (Quando o botão for pressionado)

formFornecedor.addEventListener('submit', async (event) => {
    // Evitar o comportamento padrão de envio de um formulário 
    event.preventDefault()
    // Teste importante ! (Fluxo de dados )
    // console.log(razaoFornecedor.value, foneFornecedor.value, siteFornecedor.value)

    // Passo 2 - slide (enviar as informações para o main)
    // criar um objeto
    const fornecedor = {
        razaoForne: razaoFornecedor.value,
        dddForne:  dddFornecedor.value,
        foneForne: foneFornecedor.value,
        siteForne: siteFornecedor.value,
        cepForne: cepFornecedor.value,
        endForne: enderecoFornecedor.value,
        bairroForne: bairroFornecedor.value,
        cidadeForne: cidadeFornecedor.value,
        estadoForne: estadoFornecedor.value,
        ufForne: ufFornecedor.value
    }
    api.novoFornecedor(fornecedor)
})

// Fim do CRUD - Creator >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
})

// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>