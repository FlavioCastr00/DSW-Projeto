const botãoForm = document.getElementById('chamarForm');
const modal = document.getElementById('modal-cadastro');
const botãoFechar = document.querySelector('.close');
const formCadastro = document.getElementById('form-cadastro');

const senha = document.getElementById('senha');
const confirmaSenha = document.getElementById('confirma-senha');

senha.addEventListener('blur', checarSenhas);
confirmaSenha.addEventListener('blur', checarSenhas);

//Abrir modal ao clicar em "Registre-se"
botãoForm.addEventListener('click', () => {
    modal.style.display = 'flex';
})

//fechar modal ao clicar em "X"
botãoFechar.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

//confirmação de senha
function checarSenhas(){
    const sinalErro = document.querySelectorAll('.erro');

    if(senha.value && confirmaSenha.value){
        if (senha.value !== confirmaSenha.value) {
            sinalErro.forEach(sinal => {
                sinal.style.display = 'inline';
            })
        }
        else {
            sinalErro.forEach(sinal => {
                sinal.style.display = 'none';
            })
        }
        
    }
}

formCadastro.addEventListener('submit', (event) => {});