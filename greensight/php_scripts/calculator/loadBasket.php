<?php
session_start();
error_reporting(0);
require_once '../dbconnect.php';

$id= mysql_real_escape_string(($_GET['id']) ? $_GET['id'] : $_POST['id']);

$get_basket="SELECT oBasket FROM audits WHERE (id='$id')";
$loaded = @ mysql_query($get_basket);
if (!$loaded) {
	echo 'fail';
} else {
    $numrows= @ mysql_num_rows($loaded);
	if ($numrows>0) {
	    $row = @ mysql_fetch_array($loaded, MYSQL_ASSOC);
	}
    header('Content-type: application/json');
    echo json_encode($row['oBasket']);
}
?>