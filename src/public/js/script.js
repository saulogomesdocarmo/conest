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

function buscaCPF() { 
    let Soma;
    let Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;

}