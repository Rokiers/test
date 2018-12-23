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
    $cont = $_POST['content'];
    $sql = "insert into tanmu(imgsrc,content,c_time) value('".$val."','".$cont."',NOW())";
    //查询返回值
    try{
        $db = new PDO($dns,$mysql_conf['db_user'],$mysql_conf['db_pwd']);
        $db->exec($sql);
    }catch (PDOException $e){
        die('Could not connect to the datebase:<br/>'.$e->getMessage());
    }
    unset($db);
    //注销连接