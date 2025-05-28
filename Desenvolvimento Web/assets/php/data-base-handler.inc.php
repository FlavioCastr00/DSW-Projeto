<?php

$dsn = "mysql:host=localhost;dbname=filmesdb"; //Data Source Name (fonte dos dados)
$dbusername = "root";
$dbpassword = ""; //atribuir "root" caso não funcione

try {
    //PHP Data Objects:
    $pdo = new PDO($dsn, $dbusername, $dbpassword);

    //Gerenciar erros
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //Apagar essa linha caso não funcione

    //echo "Conectado com sucesso ao banco!";
}
catch(PDOException $e) {
    echo "Conexão com Banco de Dados falhou: " . $e->getMessage();
}