/**
 * Processo de Renderização do documento -> clientes.html
 */

// CRUD - Creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Passo 1 - slide (capturar os dados dos inputs do form)

let formCliente = document.getElementById('frmClient')
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




// Evento associado ao botão adicionar (Quando o botão for pressionado)
formCliente.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão de envio em um formulário
    event.preventDefault()
    // teste importante ! (Fluxo de dados )
    // console.log(nomeCliente.value, foneCliente.value, emailCliente.value)

    // Passo 2 - slide (envio das informações para o main)
    // cirar um objeto
    const cliente = {
        nomeCli: nomeCliente.value,
        dddCli: dddCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value,
        cepCli: cepCliente.value,
        enderecoCli: enderecoCliente.value,
        bairroCli: bairroCliente.value,
        cidadeCli: cidadeCliente.value,
        ufClie: ufCliente.value,
        
    }
    api.novoCliente(cliente)

})

// Fim do Crud CREAT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args) => {
    document.getElementById('inputNameClient').value = ''
    document.getElementById('inputPhoneClient').value = ''
    document.getElementById('inputEmailClient').value = ''
    document.getElementById('ddd').value = ''
    document.getElementById('inputCEP').value = ''
    document.getElementById('inputEndereco').value = ''
    document.getElementById('inputBairro').value = ''
    document.getElementById('inputCidade').value = ''
    document.getElementById('inputEstado').value = ''
    document.getElementById('uf').value = ''

})



// Fim - Reset form <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<





