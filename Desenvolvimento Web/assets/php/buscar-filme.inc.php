<?php
header("Content-Type: application/json");

if (!isset($_GET['id'])) {
    echo json_encode(["erro" => "ID do filme não fornecido."]);
    exit;
}

$id = $_GET['id'];

try {
    require_once "data-base-handler.inc.php";

    $query = "SELECT * FROM filmes WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $filme = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($filme) {
        echo json_encode($filme);
    } else {
        echo json_encode(["erro" => "Filme não encontrado."]);
    }

    $pdo = null;
    $stmt = null;
} catch (PDOException $e) {
    echo json_encode(["erro" => "Erro no banco de dados: " . $e->getMessage()]);
}