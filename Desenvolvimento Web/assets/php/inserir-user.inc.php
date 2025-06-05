<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    header('Content-Type: application/json');

    $nome = $_POST["nome"];
    $sobrenome = $_POST["sobrenome"];
    $email = $_POST["email"];
    $senha = $_POST["senha"];

    try{
        //Procura tabela para ver se o email já existe no banco de dados
        require_once "data-base-handler.inc.php";

        $query = "SELECT email FROM users WHERE email = :email";

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        $emailExiste = $stmt->fetch(PDO::FETCH_ASSOC);

        //Se já existir, faz uma mensagem de erro:
        if ($emailExiste){
            echo json_encode(["sucesso" => false, "erro" => "Email já cadastrado!"]);
            exit();
        }
        
        //Se não existir, prossegue para inserir o usuário
        $query = "INSERT INTO users(nome, sobrenome, email, senha) VALUES (:nome, :sobrenome, :email, :senha)";

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":sobrenome", $sobrenome);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha);

        $stmt->execute();

        echo json_encode(["sucesso" => true]);
        
        $pdo = null;
        $stmt = null;
        exit();

    }
    catch (PDOException $e){
        echo json_encode(["sucesso" => false, "erro" => "Erro no banco de dados: " . $e->getMessage()]);
        exit();
    }
}
else{
    header("Location: ../../index1.html");
    exit();
}