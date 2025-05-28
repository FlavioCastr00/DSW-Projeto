document.addEventListener('DOMContentLoaded', () => {
    const botãoForm = document.getElementById('chamarForm');
    const modal = document.getElementById('modal-cadastro');
    const closeModal = document.querySelector('.close');
    const formCadastro = document.getElementById('form-cadastro');
    const filmesContainer = document.getElementById('lista-filmes');

    const placeholderFilmes = [
      {
        titulo: "Robocop - O Policial do Futuro",
        diretor: "Paul Verhoeven",
        roteirista: "Edward Neumeier",
        elenco: "Peter Weller e Nancy Allen",
        nota: 10,
        imagem: "https://media-cache.cinematerial.com/p/500x/rfbsfifj/robocop-movie-cover.jpg?v=1518192744"
      },
      {
        titulo: "De Volta para o Futuro",
        diretor: "Robert Zemeckis",
        roteirista: "Robert Zemeckis",
        elenco: "Michael J. Fox e Christopher Lloyd",
        nota: 10,
        imagem: "https://i.pinimg.com/736x/79/7c/12/797c12c67ed20c16309100688770f05e.jpg"
      },
      {
        titulo: "Blade Runner - O Caçador de Androides",
        diretor: "Ridley Scott",
        roteirista: "Hampton Fancher",
        elenco: "Harrison Ford e Sean Young",
        nota: 10,
        imagem: "https://i0.wp.com/jotacortizo.wordpress.com/wp-content/uploads/2017/10/blade-runner-poster.jpg?fit=800%2C1200&ssl=1&w=640"
      },
      {
        titulo: "Highlander - O Guerreiro Imortal",
        diretor: "Russell Mulcahy",
        roteirista: "Gregory Widen",
        elenco: "Christopher Lambert e Roxanne Hart",
        nota: 10,
        imagem: "https://www.imdb.com/pt/title/tt0091203/mediaviewer/rm1040549377/?ref_=tt_ov_i"
      },
      {
        titulo: "Um Tira da Pesada",
        diretor: "Martin Brest",
        roteirista: "Daniel Petrie Jr.",
        elenco: "Eddie Murphy e Judge Reinhold",
        nota: 10,
        imagem: "https://www.imdb.com/pt/title/tt0086960/mediaviewer/rm263955457/?ref_=tt_ov_i"
      },
      {
        titulo: "Indiana Jones e a Última Cruzada",
        diretor: "Steven Spielberg",
        roteirista: "Jeffrey Boam",
        elenco: "Harrison Ford e Sean Connery",
        nota: 10,
        imagem: "https://www.imdb.com/pt/title/tt0097576/mediaviewer/rm3821317377/?ref_=tt_ov_i"
      }
    ];

    // Abrir modal ao clicar no botão "Add +"
    botãoForm.addEventListener('click', () => {
      modal.style.display = 'flex';
      const sortearFilme = Math.floor(Math.random() * placeholderFilmes.length);
      const filmeSorteado = placeholderFilmes[sortearFilme];
      document.getElementById("titulo").placeholder = `ex: ${filmeSorteado.titulo}`;
      document.getElementById("diretor").placeholder = `ex: ${filmeSorteado.diretor}`;
      document.getElementById("roteirista").placeholder = `ex: ${filmeSorteado.roteirista}`;
      document.getElementById("elenco").placeholder = `ex: ${filmeSorteado.elenco}`;
      document.getElementById("nota").placeholder = `ex: ${filmeSorteado.nota}`;
      document.getElementById("imagem").placeholder = `ex: ${filmeSorteado.imagem}`;
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

      const dadosForm = new FormData(formCadastro);

      fetch('./assets/php/cadastro-filmes.inc.php', {method : 'POST', body : dadosForm}).then(res => res.json()).then(resposta => {
        if (resposta.sucesso) {
          console.log('Resposta do php: ', resposta)
          addFilme(resposta.filme, resposta.filme.id);
          formCadastro.reset();
          alert('Filme adicionado com sucesso!');
        }
        else {
          alert('Erro: ' + resposta.erro);
        }
        modal.style.display = 'none';
      }).catch(erro => {
        alert('Erro ao adicionar o filme');
        console.error(erro);
      });
    });

    // Função para adicionar um filme ao DOM
    function addFilme(filme, id) {
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
          <button onclick="editarFilme(${id})">Editar</button>
          <button onclick="deletarFilme(${id})">Deletar</button>
        </div>
      `;
      filmesContainer.appendChild(filmeDiv);
    }

    // Função para salvar filmes no localStorage
    // function saveFilmes() {
    //   const filmes = [];
    //   document.querySelectorAll('.filme').forEach((filmeDiv, index) => {
    //     const filme = {
    //       titulo: filmeDiv.querySelector('h2').textContent,
    //       diretor: filmeDiv.querySelector('p:nth-of-type(1)').textContent.replace('Diretor: ', ''),
    //       roteirista: filmeDiv.querySelector('p:nth-of-type(2)').textContent.replace('Roteirista: ', ''),
    //       elenco: filmeDiv.querySelector('p:nth-of-type(3)').textContent.replace('Elenco: ', ''),
    //       nota: filmeDiv.querySelector('h3').textContent.replace('Nota: ', ''),
    //       imagem: filmeDiv.querySelector('img').src
    //     };
    //     filmes.push(filme);
    //   });
    //   localStorage.setItem('filmes', JSON.stringify(filmes));
    // }

    // Função para carregar filmes do localStorage
    function loadFilmes() {
      const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
      filmes.forEach((filme, index) => addFilme(filme, index));
    }

    // Função para editar um filme
    window.editarFilme = function (id) {
      const filmes = JSON.parse(localStorage.getItem('filmes'));
      const filme = filmes[id];

      filme.titulo = prompt('Editar título:', filme.titulo);
      filme.diretor = prompt('Editar diretor:', filme.diretor);
      filme.roteirista = prompt('Editar roteirista:', filme.roteirista);
      filme.elenco = prompt('Editar elenco:', filme.elenco);
      filme.nota = prompt('Editar nota:', filme.nota);
      filme.imagem = prompt('Editar URL da imagem:', filme.imagem);

      if (filme.titulo && filme.diretor && filme.roteirista && filme.elenco && filme.nota && filme.imagem) {
        filmes[id] = filme;
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