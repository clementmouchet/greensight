<?php
session_start();
error_reporting(0);
require_once '../dbconnect.php';

$user= mysql_real_escape_string(($_GET['user']) ? $_GET['user'] : $_POST['user']);

$get_basket="SELECT id, description FROM audits WHERE (user='$user')";
$loaded = @ mysql_query($get_basket);
if (!$loaded) {
	echo 'fail';
} else {
    $numrows= @ mysql_num_rows($loaded);
	if ($numrows>0) {
	    while ($row = @ mysql_fetch_array($loaded, MYSQL_ASSOC)) {
	        $list['baskets'][] = $row;
	    }
	}
    header('Content-type: application/json');
    echo json_encode($list);
}
?>