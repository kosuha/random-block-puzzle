<?php
    require('./conn.php');

    $data = $_POST["data"];
 
    $sql = "SELECT * FROM ranking ORDER BY score DESC LIMIT 10";
    
    $res = mysqli_query($conn, $sql);
    $numrow = mysqli_num_rows($res);

    $name_list = array();
    $score_list = array();
    $level_list = array();

    for($i=0; $i<$numrow; $i++){  
        // mysql_fetch_array를 반복합니다.       
        $row = mysqli_fetch_array($res);         
        array_push($name_list, $row[1]);
        array_push($score_list, $row[2]);
        array_push($level_list, $row[3]);
    }   

    echo json_encode(array(
        'name'=>$name_list,
        'score'=>$score_list,
        'level'=>$level_list,
        'data'=>$data
    ));
?>