<?php
error_reporting(0);
$url="dberror.php";
$hostmame="localhost";
$username="greensight";
$password="greensight";
$dbase="greensight";
$link= @ mysql_connect($hostname, $username, $password);
if (!$link){
	echo "<script language=\"JavaScript\">\n";
	echo "databaseAlert()";
	echo "</script>\n";
	die();
} else {
	$db_selected = @ mysql_select_db($dbase, $link);
	if (!$db_selected){
		echo "<script language=\"JavaScript\">\n";
		echo "databaseAlert()";
		echo "</script>\n";
		die();
	}
}

?>
