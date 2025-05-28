<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    header("Content-Type: application/json");

    if (!isset($_POST['id'])) {
        echo json_encode(["sucesso" => false, "erro" => "ID do filme não enviado."]);
        exit;
    }

    $id = $_POST['id'];

    try {
        require_once "data-base-handler.inc.php";

        $query = "DELETE FROM filmes WHERE id = :id";
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(["sucesso" => true]);
        }
        else {
            echo json_encode(["sucesso" => false, "erro" => "Filme não encontrado."]);
        }

        $stmt = null;
        $pdo = null;
        die();
    } catch (PDOException $e) {
        echo json_encode(["sucesso" => false, "erro" => "Erro no banco de dados: " . $e->getMessage()]);
    }
}
else {
    header("Location: ../../index2.html");
}