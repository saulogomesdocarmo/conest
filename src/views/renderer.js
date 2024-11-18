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

// íncone de status do banco de dados

api.dbMensagem((event, message) => {
    // validação e troca do ícone
    if (message === "conectado") {             
        document.getElementById('iconDB').src = "../public/img/dbon.png"
    } else {
        document.getElementById('iconDB').src = "../public/img/dboff.png"
    }
})