<?php
//checa se o usuário salvou informações usando o método "POST"
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $titulo = $_POST["titulo"];
    $diretor = $_POST["diretor"];
    $roteirista = $_POST["roteirista"];
    $elenco = $_POST["elenco"];
    $nota = $_POST["nota"];
    $imagem = $_POST["imagem"];

    try {
        require_once "data-base-handler.inc.php"; //inclui data-base-handler.inc.php

        $query = "INSERT INTO filmes (titulo, diretor, roteirista, elenco, nota, imagem) VALUES (:titulo, :diretor, :roteirista, :elenco, :nota, :imagem);";

        $stmt = $pdo->prepare($query); //envia a query para o DB
        
        //usando parametros de "nome":
        $stmt->bindParam(":titulo", $titulo);
        $stmt->bindParam(":diretor", $diretor);
        $stmt->bindParam(":roteirista", $roteirista);
        $stmt->bindParam(":elenco", $elenco);
        $stmt->bindParam(":nota", $nota);
        $stmt->bindParam(":imagem", $imagem);

        $stmt->execute(); //executa tudo e salva dados no DB

        //fecha o prompt e a conexão com o DB
        $pdo = null;
        $stmt = null;

        header("Location: ../../index2.html"); //manda o usuário devolta para a página inicial
        
        die(); //termina o script
    } catch (PDOException $e) {
        die("A Query falhou: " . $e->getMessage()); //termina o script
    }
}
else{
    header("Location: ../../index2.html"); //manda o usuário devolta para a página inicial
}