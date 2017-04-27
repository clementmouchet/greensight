<?php
require_once '../dbconnect.php';
$id= mysql_real_escape_string(($_GET['id']) ? $_GET['id'] : $_POST['id']);

$query = "DELETE FROM audits WHERE id='$id'";
$link = @ mysql_query($query);
if (!$link) {
	echo 9;
} else {
	echo 1;
}

?>