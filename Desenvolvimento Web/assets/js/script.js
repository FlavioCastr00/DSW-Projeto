document.addEventListener('DOMContentLoaded', () => {
    const botãoForm = document.getElementById('chamarForm');
    const modal = document.getElementById('modal-cadastro');
    const closeModal = document.querySelector('.close');
    const formCadastro = document.getElementById('form-cadastro');
    const filmesContainer = document.getElementById('lista-filmes');

  
    // Abrir modal ao clicar no botão "Add +"
    botãoForm.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  
    // Fechar modal ao clicar no "X"
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Processar o formulário de cadastro
    formCadastro.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const novoFilme = {
        titulo: document.getElementById('titulo').value,
        diretor: document.getElementById('diretor').value,
        roteirista: document.getElementById('roteirista').value,
        elenco: document.getElementById('elenco').value,
        nota: document.getElementById('nota').value,
        imagem: document.getElementById('imagem').value
      };
  
      if (novoFilme.titulo && novoFilme.diretor && novoFilme.roteirista && novoFilme.elenco && novoFilme.nota && novoFilme.imagem) {
        addFilme(novoFilme);
        saveFilmes();
        formCadastro.reset(); // Limpar o formulário
        modal.style.display = 'none'; // Fechar o modal
      } else {
        alert('Todos os campos são obrigatórios!');
      }
    });
  
    // Função para adicionar um filme ao DOM
    function addFilme(filme, index) {
      const filmeDiv = document.createElement('div');
      filmeDiv.classList.add('filme');
      filmeDiv.innerHTML = `
        <div class="filme-desc">
          <img src="${filme.imagem}" alt="${filme.titulo}">
          <div class="desc">
            <h2>${filme.titulo}</h2>
            <p>Diretor: ${filme.diretor}</p>
            <p>Roteirista: ${filme.roteirista}</p>
            <p>Elenco: ${filme.elenco}</p>
            <h3>Nota: ${filme.nota}</h3>
          </div>
        </div>
        <div class="opcoes">
          <button onclick="editarFilme(${index})">Editar</button>
          <button onclick="deletarFilme(${index})">Deletar</button>
        </div>
      `;
      filmesContainer.appendChild(filmeDiv);
    }
  
    // Função para salvar filmes no localStorage
    function saveFilmes() {
      const filmes = [];
      document.querySelectorAll('.filme').forEach((filmeDiv, index) => {
        const filme = {
          titulo: filmeDiv.querySelector('h2').textContent,
          diretor: filmeDiv.querySelector('p:nth-of-type(1)').textContent.replace('Diretor: ', ''),
          roteirista: filmeDiv.querySelector('p:nth-of-type(2)').textContent.replace('Roteirista: ', ''),
          elenco: filmeDiv.querySelector('p:nth-of-type(3)').textContent.replace('Elenco: ', ''),
          nota: filmeDiv.querySelector('h3').textContent.replace('Nota: ', ''),
          imagem: filmeDiv.querySelector('img').src
        };
        filmes.push(filme);
      });
      localStorage.setItem('filmes', JSON.stringify(filmes));
    }
  
    // Função para carregar filmes do localStorage
    function loadFilmes() {
      const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
      filmes.forEach((filme, index) => addFilme(filme, index));
    }
  
    // Função para editar um filme
    window.editarFilme = function (index) {
      const filmes = JSON.parse(localStorage.getItem('filmes'));
      const filme = filmes[index];
  
      filme.titulo = prompt('Editar título:', filme.titulo);
      filme.diretor = prompt('Editar diretor:', filme.diretor);
      filme.roteirista = prompt('Editar roteirista:', filme.roteirista);
      filme.elenco = prompt('Editar elenco:', filme.elenco);
      filme.nota = prompt('Editar nota:', filme.nota);
      filme.imagem = prompt('Editar URL da imagem:', filme.imagem);
  
      if (filme.titulo && filme.diretor && filme.roteirista && filme.elenco && filme.nota && filme.imagem) {
        filmes[index] = filme;
        localStorage.setItem('filmes', JSON.stringify(filmes));
        location.reload();
      } else {
        alert('Todos os campos são obrigatórios!');
      }
    };
  
    // Função para deletar um filme
    window.deletarFilme = function (index) {
      const filmes = JSON.parse(localStorage.getItem('filmes'));
      filmes.splice(index, 1);
      localStorage.setItem('filmes', JSON.stringify(filmes));
      location.reload();
    };
  
    // Carregar filmes ao iniciar
    loadFilmes();
  });