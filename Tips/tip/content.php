<?php
    //连接数据库
    $mysql_conf = array(
        'host' => '127.0.0.1:3306',
        'db'   => 'tanmu',
        'db_user' => 'root',
        'db_pwd' => 'root',
    );
    $dns = 'mysql:host='.$mysql_conf['host'].';dbname='.$mysql_conf['db'];
    //构造查询sql
    $val = $_POST['imgSrc'];
    $sql = "select content from tanmu where imgsrc ='".$val."'";
    //查询返回值
    $reten = [];
    try{
        $db = new PDO($dns,$mysql_conf['db_user'],$mysql_conf['db_pwd']);

        $result = $db->query($sql);
        $res = $result->fetchAll();
        array_push($reten,$result->rowCount());
        foreach ($res as $row){
            array_push($reten,$row['content']);
        }
        echo json_encode($reten);
    }catch (PDOException $e){
        die('Could not connect to the datebase:<br/>'.$e->getMessage());
    }
    unset($db);
    //返回数组