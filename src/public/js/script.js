/**Script - Busca de Endereços */

// CLIENTES
function checarEndereco() {
    let cep = document.getElementById('inputCEP').value
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`

    fetch(urlAPI)
        .then((response) => {
            return response.json()
        })
        .then((dados) => {
            document.getElementById('inputEndereco').value = dados.logradouro
            document.getElementById('inputBairro').value = dados.bairro
            document.getElementById('inputCidade').value = dados.localidade
            document.getElementById('inputEstado').value = dados.estado
            document.getElementById('uf').value = dados.uf
            document.getElementById('ddd').value = dados.ddd;
        })
        .catch((error) => {
            console.log(error)
        })
}

// FORNECEDORES

function fornecedorendereco() {
    let cep02 = document.getElementById('cepFornecedor').value
    let urlAPI = `https://viacep.com.br/ws/${cep02}/json/`

    fetch(urlAPI)
        .then((response) => {
            return response.json()
        })
        .then((dados) => {
            document.getElementById('enderecoFornecedor').value = dados.logradouro
            document.getElementById('bairroFornecedor').value = dados.bairro
            document.getElementById('cidadeFornecedor').value = dados.localidade
            document.getElementById('estadoFornecedor').value = dados.estado
            document.getElementById('ufFornecedor').value = dados.uf
            document.getElementById('dddFornecedor').value = dados.ddd;
        })
        .catch((error) => {
            console.log(error)
        })
}





