// Botões 

function fechar() {
    api.closeAbout()
}

function clientes() {
    api.janelaClientes()
}

function produtos() {
    api.productWindow()
}

function fornecedor() {
    api.suplierWindow()
}

function relatorios() {
    api.relatorioWindow()
}

// INSERÇÃO DA DATA NO RODAPÉ
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}

document.getElementById('dataAtual').innerHTML = obterData()