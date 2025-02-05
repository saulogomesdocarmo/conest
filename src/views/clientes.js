/**
 * Processo de Renderização do documento -> clientes.html
 */

// Array usado nos métodos para manipulação da estrutura de dados

// A linha abaixo traz foco para o campo input de buscas
const foco = document.getElementById('searchClient')

// Mudas as propriedades do documento html ao iniciar a janela

document.addEventListener('DOMContentLoaded', () => {
    btnUpdate.disabled = true
    btnDelete.disabled = true
    foco.focus()
})

//  Função para manipular o evento da tecla Enter
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        buscarCliente()
    }
}

// Função para remover o manipulador do evento da tecla Enter
function restaurarEnter() {
    document.getElementById('frmClient').removeEventListener('keydown', teclaEnter)
}

// manipulando o evento (tecla enter)
document.getElementById('frmClient').addEventListener('keydown', teclaEnter)

let arrayCliente = []

// Passo 1 - slide (capturar os dados dos inputs do form)

let formCliente = document.getElementById('frmClient')
let idCliente = document.getElementById('inputIdClient')
let nomeCliente = document.getElementById('inputNameClient')
let cpfCliente = document.getElementById('inputCPF')
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
let compleCliente = document.getElementById('compleCliente')



// CRUD - Creat/Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Evento associado ao botão adicionar (Quando o botão for pressionado)
formCliente.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão de envio em um formulário
    event.preventDefault()
    // teste importante ! (Fluxo de dados )
    console.log(idCliente.value, nomeCliente.value, foneCliente.value, emailCliente.value, compleCliente.value)

    // Passo 2 - slide (envio das informações para o main)
    // cirar um objeto

    // Estratégia para determinar se é um novo cadastro de clientes ou a edição de um cliente já existente
    if (idCliente.value === "") {
        // criar um objeto
        const cliente = {
            nomeCli: nomeCliente.value,
            cpfCli: cpfCliente.value,
            dddCli: dddCliente.value,
            foneCli: foneCliente.value,
            emailCli: emailCliente.value,
            cepCli: cepCliente.value,
            enderecoCli: enderecoCliente.value,
            numRuaCli: numRuaCliente.value,
            bairroCli: bairroCliente.value,
            cidadeCli: cidadeCliente.value,
            estadoCli: estadoCliente.value,
            ufCli: ufCliente.value,
            compleCli: compleCliente.value

        }
        api.novoCliente(cliente)

    } else {
        // criar um novo objeto com o id do Cliente
        const cliente = {
            idCli: idCliente.value,
            nomeCli: nomeCliente.value,
            cpfCli: cpfCliente.value,
            dddCli: dddCliente.value,
            foneCli: foneCliente.value,
            emailCli: emailCliente.value,
            cepCli: cepCliente.value,
            enderecoCli: enderecoCliente.value,
            numRuaCli: numRuaCliente.value,
            bairroCli: bairroCliente.value,
            cidadeCli: cidadeCliente.value,
            estadoCli: estadoCliente.value,
            ufCli: ufCliente.value,
            compleCli: compleCliente.value
        }
        api.editarCliente(cliente)

    }


})

// Fim do Crud Create /Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// CRUD Read Nome do Cliente >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function buscarCliente() {
    // Alert somente para testes
    // alert ("teste do botão buscar") -> O alert "mata" o Electron

    // PASSO 1 (Slide)
    // Pegar o valor da caixa de texto do nome
    let cliNome = document.getElementById('searchClient').value
    // console.log(cliNome) // teste do passo 1
    // PASSO 2 (Slide)
    // Enviar o pedido de busca do cliente ao main
    if (cliNome === "") {
        api.validarBusca() // Validação do campo obrigatório
        foco.focus()
    } else {
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
                document.getElementById('inputCPF').value = c.cpfCliente
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
                document.getElementById('compleCliente').value = c.complementoCliente
                document.getElementById('inputIdClient').value = c._id


                // Limpar o campo de busca e remover o foco
                foco.value = ""


                foco.disabled = true

                // Desativando os botões de busca
                btnRead.disabled = true
                btnReadCPF.disabled = true

                // desativar o botão adicionar
                btnCreat.disabled = true
                // liberar os botões editar e exlcuir
                document.getElementById('btnUpdate').disabled = false
                document.getElementById('btnDelete').disabled = false
                // restauar o padrão da telca Enter
                restaurarEnter()
                // reativar os inputs das caixas

            })
        })
    }
    // setar o nome do cliente e liberar o botão adicionar

    api.setarNomeCliente(() => {
        // setar o nome do cliente
        let campoNome = document.getElementById('searchClient').value
        document.getElementById('inputNameClient').focus
        document.getElementById('inputNameClient').value = campoNome

        // limpar o campo de busca e remover o foco
        foco.value = ""
        foco.blur()
        // restaurar o padrão da tecla Enter
        restaurarEnter()
    })

}

// Validação de CPF
document.getElementById('inputCPF').addEventListener('input', function () {
    validarCPF(this) // Chama a função de validação enquanto o usuário digita
})

// CRUD READ Por CPF

// function buscarCpfCliente() {
//     // Alert somente para testes
//     // alert ("teste do botão buscar") -> O alert "mata" o Electron

//     // PASSO 1 (Slide)
//     // Pegar o valor da caixa de texto do nome
//     let cliCPF = document.getElementById('searchClient').value
//     // console.log(cliNome) // teste do passo 1
//     // PASSO 2 (Slide)
//     // Enviar o pedido de busca do cliente ao main
//     if (cliCPF === "") {
//         api.validarBusca() // Validação do campo obrigatório
//         foco.focus()
//     } else {
//         api.bucarCpfCliente(cliCPF)
//         // Passo 5 - Recebimento
//         api.renderizarCliente((event, dadosCliente) => {
//             // (teste de recebimento dos dados do cliente)
//             console.log(dadosCliente)
//             // Passo 6: Renderização dos dados do cliente no formulário
//             const clienteRenderizado = JSON.parse(dadosCliente)
//             arrayCliente = clienteRenderizado
//             // teste para entendimento da lógica 
//             console.log(arrayCliente)
//             // Percorrer o Array de clientes, extrair os dados e setar(preencher os campos do formulário)
//             arrayCliente.forEach((c) => {
//                 document.getElementById('inputNameClient').value = c.nomeCliente
//                 document.getElementById('inputCPF').value = c.cpfCliente
//                 document.getElementById('inputCEP').value = c.cepCliente
//                 document.getElementById('inputEmailClient').value = c.emailCliente
//                 document.getElementById('ddd').value = c.dddCliente
//                 document.getElementById('inputPhoneClient').value = c.foneCliente
//                 document.getElementById('inputEndereco').value = c.enderecoCliente
//                 document.getElementById('inputBairro').value = c.bairroCliente
//                 document.getElementById('inputCidade').value = c.cidadeCliente
//                 document.getElementById('inputEstado').value = c.estadoCliente
//                 document.getElementById('uf').value = c.ufCliente
//                 document.getElementById('numRuaCliente').value = c.numRuaCliente
//                 document.getElementById('compleCliente').value = c.complementoCliente
//                 document.getElementById('inputIdClient').value = c._id

//                 // Limpar o campo de busca e remover o foco
//                 foco.value = ""

//                 foco.disabled = true

//                 // Desativando os botões de Busca
//                 btnReadCPF.disabled = true
//                 btnRead.disabled = true

//                 // desativar o botão adicionar
//                 btnCreat.disabled = true
//                 // liberar os botões editar e exlcuir
//                 document.getElementById('btnUpdate').disabled = false
//                 document.getElementById('btnDelete').disabled = false
//                 // restauar o padrão da telca Enter
//                 restaurarEnter()
//                 // reativar os inputs das caixas

//             })
//         })
//     }
//     // setar o nome do cliente e liberar o botão adicionar

//     api.setarCpfCliente(() => {
//         // setar o nome do cliente
//         let campoCPF = document.getElementById('searchClient').value
//         document.getElementById('inputCPF').focus
//         document.getElementById('inputCPF').value = campoCPF

//         // limpar o campo de busca e remover o foco
//         foco.value = ""
//         foco.blur()
//         // restaurar o padrão da tecla Enter
//         restaurarEnter()
//     })

// }


// Fim do CRUD Read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function excluirCliente() {
    api.deletarCliente(idCliente.value) // Passo 1 do Slide
}

// Fim do CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    resetForm()
})

function resetForm() {
    // recarregar página
    location.reload()
}



// Fim - Reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<





