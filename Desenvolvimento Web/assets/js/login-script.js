const botãoForm = document.getElementById('chamarForm');
const modal = document.getElementById('modal-cadastro');
const botãoFechar = document.querySelector('.close');
const formCadastro = document.getElementById('form-cadastro');
//Senhas:
const senha = document.getElementById('senha');
const confirmaSenha = document.getElementById('confirma-senha');

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

formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    if(senha.value !== confirmaSenha.value){
        checarSenhas();
        return;
    }
    else {
        const dadosForm = new FormData(formCadastro);
        
        fetch('./assets/php/inserir-user.inc.php', {
            method: 'POST',
            body: dadosForm
        }).then(res => res.json()).then(resposta => {
            if(resposta.sucesso){
                console.log('Resposta do php: ', resposta);
                formCadastro.reset();
                alert('Usuário criado com sucesso!');
            }
            else {
                alert('Erro: ' + resposta.erro);
            }
            modal.style.display = 'none';
        }).catch(erro => {
            alert('Erro ao criar usuário ;-;');
            console.error(erro);
        });
    }
});