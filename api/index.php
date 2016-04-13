<?php
    require 'libs/Slim/Slim.php';
    require_once 'dbHelper.php';

    \Slim\Slim::registerAutoloader();
    $app = new \Slim\Slim();
    $app = \Slim\Slim::getInstance();
    $db = new dbHelper();
    session_start();
    /**
     * Database Helper Function templates
     */
    /*
    select(table name, where clause as associative array)
    insert(table name, data as associative array, mandatory column names as array)
    update(table name, column names as associative array, where clause as associative array, required columns as array)
    delete(table name, where clause as array)
    */
    //Cardapio
    $app->get('/todosOsLanches', function() { 
        global $db;
        $rows = $db->select("lanches","*",array());
        echoResponse(200, $rows);
    });

    /*LEMBRAR DE MUDAR ROTA */ 
    $app->post('/cadastroLanches', function() use ($app) { 
        $data = json_decode($app->request->getBody());
        $mandatory = array('nome');
        global $db;
        $rows = $db->insert("lanches", $data, $mandatory);
        if($rows["status"]=="success")
            $rows["message"] = "Lanche adicionado com sucesso.";
        echoResponse(200, $rows);
    });

    $app->put('/editarlanche', function() use ($app) { 
        $lanche = json_decode($app->request->getBody());
        if( !isset($lanche->nome) || !isset($lanche->ingredientes) || !isset($lanche->preco) ){
            $rows["status"]="error";
            $rows["message"] = "Campos obrigatórios não preenchidos.";
            echoResponse(200, $rows);
        }
        $data = array('nome' => $lanche->nome, 'ingredientes' => $lanche->ingredientes, 'preco' => $lanche->preco);
        $condition = array('id'=>$lanche->id);
        $mandatory = array();
        global $db;
        $rows = $db->update("lanches", $data, $condition, $mandatory);
        if($rows["status"]=="success")
            $rows["message"] = "Lanche atualizado com sucesso.";
        echoResponse(200, $rows);
    });

    $app->delete('/excluirLanche/:id', function($id) { 
        global $db;
        $rows = $db->delete("lanches", array( 'id' => $id ));
        if($rows["status"]=="success")
            $rows["message"] = "Lanche excluído com sucesso.";
        echoResponse(200, $rows);
    });

    function echoResponse($status_code, $response) {
        global $app;
        $app->status($status_code);
        $app->contentType('application/json');
        echo json_encode($response,JSON_NUMERIC_CHECK);
        die;
    }

    $app->run();
?>