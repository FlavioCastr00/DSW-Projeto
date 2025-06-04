document.addEventListener('DOMContentLoaded', () => {
    const botãoForm = document.getElementById('chamarForm');
    const modal = document.getElementById('modal-cadastro');
    const modalEdição = document.getElementById('modal-edição');
    const closeModal = document.querySelector('.close');
    const closeEdição = document.getElementById('close-edição');
    const formCadastro = document.getElementById('form-cadastro');
    const formEdição = document.getElementById('form-edição');
    const filmesContainer = document.getElementById('lista-filmes');

    let idEdiçãoAtual = null;

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

    //Função para deletar filme:
    window.deletarFilme = function(id) {
      if(confirm("Tem certeza que deseja deletar este filme?")) {
        fetch('./assets/php/deletar-filme.inc.php', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: 'id=' + encodeURIComponent(id)
        }).then(res => res.json()).then(resposta => {
          if (resposta.sucesso) {
            const filmes = document.querySelectorAll('.filme');
            filmes.forEach(filme =>{
              const botao = filme.querySelector(`button[onclick="deletarFilme(${id})"]`);
              if (botao) {
                filme.remove();
              }
            });
            alert('Filme deletado com sucesso!');
          }
          else {
            alert('Erro ao deletar: ' + resposta.erro);
          }
        }).catch(erro => {
          alert('Erro ao tentar deletar o filme.');
          console.error(erro);
        });
      }
    };

    //Função para abrir modal de edição filme:
    window.editarFilme = function(id){
      idEdiçãoAtual = id; //atribui o id do filme que está sendo editado
      modalEdição.style.display = 'flex';
    };

    //função para processar form de edição de filme
    formEdição.addEventListener('submit', (event) => {
      event.preventDefault();

      const dadosForm = new FormData(formEdição); //cria o objeto a partir do form no html
      dadosForm.append('id', idEdiçãoAtual); //adiciona informação do id ao objeto

      //inserir "fetch" para executar php aqui:
      if (confirm("Tem certeza que deseja atualizar este filme?")){
        fetch('./assets/php/filme-update.inc.php', {
          method: 'POST',
          body: dadosForm //manda os dados para o scipt em php
        }).then(res => res.json()).then(resposta => {
          if (resposta.sucesso){
            const filmes = document.querySelectorAll('.filme');
            filmes.forEach(filme => {
              const botao = filme.querySelector(`button[onclick="editarFilme(${idEdiçãoAtual})"]`);
              if (botao){
                filme.remove(); //remove o filme do DOM temporáriamente
              }
            });

            console.log("Resposta do PHP: ", resposta);
            addFilme(resposta.filme, resposta.filme.id); //adiciona o filme novamente
            formEdição.reset();
            modalEdição.style.display = 'none';
            alert("Filme editado com sucesso!");
          }
          else{
            alert("Erro: " + resposta.erro);
          }
        }).catch(erro => {
          alert("Erro ao atualizar o filme.");
          console.error(erro);
        });
      }
    });

    closeEdição.addEventListener('click', () => {
      modalEdição.style.display = 'none';
    });

    // // Função para carregar filmes do localStorage
    // function loadFilmes() {
    //   const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    //   filmes.forEach((filme, index) => addFilme(filme, index));
    // }

    // // Carregar filmes ao iniciar
    // loadFilmes();
  });