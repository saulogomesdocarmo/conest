/**
 * Processo de Renderização do documento -> fornecedores.html
 */

// CRUD - Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (capturar os dados dos inputs do form)

let formFornecedor = document.getElementById('frmFornecedor')
let razaoFornecedor = document.getElementById('inputNameFornecedor') 
let foneFornecedor = document.getElementById('inputPhoneFornecedor')
let siteFornecedor = document.getElementById('inputSiteFornecedor')

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
        foneForne: foneFornecedor.value,
        siteForne: siteFornecedor.value
    }
    api.novoFornecedor(fornecedor)
})

// Fim do CRUD - Creator >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    document.getElementById('inputNameFornecedor').value = ''
    document.getElementById('inputPhoneFornecedor').value = ''
    document.getElementById('inputSiteFornecedor').value = ''
})

// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>