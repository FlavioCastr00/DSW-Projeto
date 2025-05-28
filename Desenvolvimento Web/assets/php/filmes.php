<?php
require_once "data-base-handler.inc.php"; //conexão

$query = "SELECT * FROM filmes";
$stmt = $pdo->query($query);

$filmes = $stmt->fetchAll(); //busca todos os filmes

echo json_encode($filmes); //salva em um arquivo JSON