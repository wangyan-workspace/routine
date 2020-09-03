<?php

    //文件头，可将从服务器返回的文件以.json的文件格式返回客户端
    header('content-type:application/json;charset=utf-8');
    //1.接收参数（当用户向服务器提交信息时）
    // $username = $_POST['username'];

    //2.进行处理
    $users = array(
        //键值对的形式
        array("id"=>11,"name"=>"lisi","gender"=>"男"),
        array("id"=>22,"name"=>"wangwu","gender"=>"女"),
    );

    //把文件转换成.json文件格式
    echo json_encode($users);

?>
