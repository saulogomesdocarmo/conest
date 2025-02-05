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



//  Cadastrat cpf 

function validarCPF(input) {
    function validarCPF(cpf) {
        // Remover caracteres não numéricos
        cpf = cpf.replace(/[^\d]+/g, '');
    
        // Verificar se o CPF tem 11 caracteres
        if (cpf.length !== 11) {
            return false;
        }
    
        // Verificar se o CPF é uma sequência de números repetidos (ex: 111.111.111-11)
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
    
        // Validar o primeiro dígito verificador
        let soma = 0;
        let peso = 10;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf[i]) * peso;
            peso--;
        }
        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;
        if (parseInt(cpf[9]) !== digito1) {
            return false;
        }
    
        // Validar o segundo dígito verificador
        soma = 0;
        peso = 11;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf[i]) * peso;
            peso--;
        }
        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;
        if (parseInt(cpf[10]) !== digito2) {
            return false;
        }
    
        return true;
    }
    
    const cpf = input.value; // Pega o valor do input
    const campoCpf = document.getElementById('inputCPF');
    
    if (!validarCPF(cpf)) {
        campoCpf.style.borderColor = 'red'; // Destaca o campo em vermelho
        campoCpf.setCustomValidity("CPF inválido!"); // Define uma mensagem de erro customizada
    } else {
        campoCpf.style.borderColor = 'green'; // Destaca o campo em verde
        campoCpf.setCustomValidity(""); // Limpa qualquer mensagem de erro
    }
}
