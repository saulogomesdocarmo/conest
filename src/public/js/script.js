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

function validarCPF(cpf) {
    cpf = cpf.replace(/[.-]/g, ""); // Remove pontos e traços
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // Verifica se o CPF tem 11 dígitos ou se são todos iguais
    }
    
    let soma = 0, resto;
    
    // Validação do primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    // Validação do segundo dígito verificador
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cpf-form").addEventListener("submit", function(event) {
        event.preventDefault();
        let cpfInput = document.getElementById("cpf").value;
        let resultado = document.getElementById("resultado");
        
        if (validarCPF(cpfInput)) {
            resultado.textContent = "CPF Válido!";
            resultado.style.color = "green";
        } else {
            resultado.textContent = "CPF Inválido!";
            resultado.style.color = "red";
        }
    });
});





