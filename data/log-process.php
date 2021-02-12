<?php
    require('./conn.php');

    $mobile = $_POST["mobile"];
 
    $sql = "INSERT INTO logs(mobile) VALUES('{$mobile}')";
    
    if($conn->query($sql)){
        echo $mobile;
    } else {
        echo $mobile;
    }
?>