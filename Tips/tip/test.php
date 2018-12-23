<?php
        $img = ["","http://seopic.699pic.com/photo/50046/2028.jpg_wh1200.jpg",
                "./images/yys_banner2.jpg",
                "./images/yys_banner3.jpg",
                "./images/yys_banner4.jpg",
                "./images/yys_banner5.jpg",
                "./images/yys_banner5.jpg",""];
        $start = [];
        //随机产生三个路径 并从数组中删除
            $ran = rand(1,count($img)-2-3);   //寻找初始化的3张相连图片
            array_push($start,$img[$ran]);
            array_push($start,$img[$ran+1]);
            array_push($start,$img[$ran+2]);
            array_push($start,$ran);
        if (@$_POST['start'] == "on"){
            echo json_encode($start);
        }
        if(@$_POST['info'] == "all"){
            echo json_encode($img);
        }
