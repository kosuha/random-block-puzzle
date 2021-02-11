<?php
    require('./conn.php');

    $name = $_POST["name"];
    $score = $_POST["score"];
    $level = $_POST["level"];
 
    $sql = "INSERT INTO ranking(name,score,level) VALUES('{$name}','{$score}','{$level}')";
    
    if($conn->query($sql)){
        echo json_encode(array(
            'name'=>$name,
            'score'=>$score,
            'level'=>$level
        ));
    } else {
        echo json_encode(array(
            'name'=>$name,
            'score'=>$score,
            'level'=>$level
        ));
    }
?>