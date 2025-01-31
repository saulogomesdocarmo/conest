/**
 * Processo de Renderização do documento -> clientes.html
 */

// Array usado nos métodos para manipulação da estrutura de dados

// A linha abaixo capitura o campo de input de busca
const foco = document.getElementById('searchClient')

// Mudas as propriedades do documento html ao iniciar a janela

// document.addEventListener('DOMContentLoaded', () => { 
//     btnCreat.disabled = true
//     btnUpdate.
// })





let arrayCliente = []

// Passo 1 - slide (capturar os dados dos inputs do form)

let formCliente = document.getElementById('frmClient')
let idCliente = document.getElementById('inputIdClient')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let dddCliente = document.getElementById('ddd')
let emailCliente = document.getElementById('inputEmailClient')
let cepCliente = document.getElementById('inputCEP')
let enderecoCliente = document.getElementById('inputEndereco')
let bairroCliente = document.getElementById('inputBairro')
let cidadeCliente = document.getElementById('inputCidade')
let estadoCliente = document.getElementById('inputEstado')
let ufCliente = document.getElementById('uf')
let numRuaCliente = document.getElementById('numRuaCliente')

// CRUD - Creat/Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Evento associado ao botão adicionar (Quando o botão for pressionado)
formCliente.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão de envio em um formulário
    event.preventDefault()
    // teste importante ! (Fluxo de dados )
    console.log(idCliente.value, nomeCliente.value, foneCliente.value, emailCliente.value)

    // Passo 2 - slide (envio das informações para o main)
    // cirar um objeto

    // Estratégia para determinar se é um novo cadastro de clientes ou a edição de um cliente já existente
    if (idCliente.value === "") {
        // criar um objeto
        const cliente = {
            nomeCli: nomeCliente.value,
            dddCli: dddCliente.value,
            foneCli: foneCliente.value,
            emailCli: emailCliente.value,
            cepCli: cepCliente.value,
            enderecoCli: enderecoCliente.value,
            numRuaCli: numRuaCliente.value,
            bairroCli: bairroCliente.value,
            cidadeCli: cidadeCliente.value,
            estadoCli: estadoCliente.value,
            ufCli: ufCliente.value

        }
        api.novoCliente(cliente)

    } else {
        // criar um novo objeto com o id do Cliente
        const cliente = {
            idCli: idCliente.value,
            nomeCli: nomeCliente.value,
            dddCli: dddCliente.value,
            foneCli: foneCliente.value,
            emailCli: emailCliente.value,
            cepCli: cepCliente.value,
            enderecoCli: enderecoCliente.value,
            numRuaCli: numRuaCliente.value,
            bairroCli: bairroCliente.value,
            cidadeCli: cidadeCliente.value,
            estadoCli: estadoCliente.value,
            ufCli: ufCliente.value
        }
        api.editarCliente(cliente)

    }


})

// Fim do Crud Create /Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarCliente() {
    // Alert somente para testes
    // alert ("teste do botão buscar") -> O alert "mata" o Electron

    // PASSO 1 (Slide)
    // Pegar o valor da caixa de texto do nome
    let cliNome = document.getElementById('searchClient').value
    console.log(cliNome) // teste do passo 1
    // PASSO 2 (Slide)
    // Enviar o pedido de busca do cliente ao main
    api.buscarCliente(cliNome)
    // Passo 5 - Recebimento
    api.renderizarCliente((event, dadosCliente) => {
        // (teste de recebimento dos dados do cliente)
        console.log(dadosCliente)
        // Passo 6: Renderização dos dados do cliente no formulário
        const clienteRenderizado = JSON.parse(dadosCliente)
        arrayCliente = clienteRenderizado
        // teste para entendimento da lógica 
        console.log(arrayCliente)
        // Percorrer o Array de clientes, extrair os dados e setar(preencher os campos do formulário)
        arrayCliente.forEach((c) => {
            document.getElementById('inputNameClient').value = c.nomeCliente
            document.getElementById('inputCEP').value = c.cepCliente
            document.getElementById('inputEmailClient').value = c.emailCliente
            document.getElementById('ddd').value = c.dddCliente
            document.getElementById('inputPhoneClient').value = c.foneCliente
            document.getElementById('inputEndereco').value = c.enderecoCliente
            document.getElementById('inputBairro').value = c.bairroCliente
            document.getElementById('inputCidade').value = c.cidadeCliente
            document.getElementById('inputEstado').value = c.estadoCliente
            document.getElementById('uf').value = c.ufCliente
            document.getElementById('numRuaCliente').value = c.numRuaCliente
            document.getElementById('inputIdClient').value = c._id

        })
    })


}

// Fim do CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function excluirCliente() {
    api.deletarCliente(idCliente.value) // Passo 1 do Slide
}

// Fim do CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    console.log('teste de recebimento')
    document.getElementById('inputNameClient').value = ''
    document.getElementById('inputPhoneClient').value = ''
    document.getElementById('inputEmailClient').value = ''
    document.getElementById('ddd').value = ''
    document.getElementById('inputCEP').value = ''
    document.getElementById('inputEndereco').value = ''
    document.getElementById('inputBairro').value = ''
    document.getElementById('inputCidade').value = ''
    document.getElementById('inputEstado').value = ''
    document.getElementById('numRuaCliente').value = ''
    document.getElementById('uf').value = ''

})



// Fim - Reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<





