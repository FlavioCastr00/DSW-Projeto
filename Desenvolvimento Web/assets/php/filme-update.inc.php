<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    header("Content-Type: application/json");

    if (!isset($_POST['id'])) {
        echo json_encode(["sucesso" => false, "erro" => "ID do filme não enviado."]);
        exit;
    }

    $id = $_POST['id'];
    $titulo = $_POST["titulo"];
    $diretor = $_POST["diretor"];
    $roteirista = $_POST["roteirista"];
    $elenco = $_POST["elenco"];
    $nota = $_POST["nota"];
    $imagem = $_POST["imagem"];

    try{
        require_once "data-base-handler.inc.php";

        $query = "UPDATE filmes SET titulo = :titulo, diretor = :diretor, roteirista = :roteirista, elenco = :elenco, nota = :nota, imagem = :imagem WHERE id = :id";


        $stmt = $pdo->prepare($query);

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(":titulo", $titulo);
        $stmt->bindParam(":diretor", $diretor);
        $stmt->bindParam(":roteirista", $roteirista);
        $stmt->bindParam(":elenco", $elenco);
        $stmt->bindParam(":nota", $nota);
        $stmt->bindParam(":imagem", $imagem);

        $stmt->execute();

        http_response_code(200);

        echo json_encode([
            "sucesso" => true,
            "filme" => [
                "id" =>$id,
                "titulo" => $titulo,
                "diretor" => $diretor,
                "roteirista" => $roteirista,
                "elenco" => $elenco,
                "nota" => $nota,
                "imagem" => $imagem
            ]
        ]);

        $pdo = null;
        $stmt = null;
        
        die();
    } catch(PDOException $e){
        echo json_encode(["sucesso" => false, "erro" => "A query falhou: " . $e->getMessage()]);
        die(); //termina o script
    }
}
else{
    header("Location: ../../index2.html"); //manda o usuário devolta para a página inicial
}