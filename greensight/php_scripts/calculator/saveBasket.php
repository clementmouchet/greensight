<?php
session_start();
error_reporting(0);
require_once '../dbconnect.php';

$oBasket= mysql_real_escape_string(($_GET['oBasket']) ? $_GET['oBasket'] : $_POST['oBasket']);
$description= mysql_real_escape_string(($_GET['description']) ? $_GET['description'] : $_POST['description']);
$user= mysql_real_escape_string(($_GET['user']) ? $_GET['user'] : $_POST['user']);

// check that required field are not empty (proper check is done on the client side)
if ($oBasket == '') {
		echo '<p style="color: red" class="centered"><b>Unexpected error,</b><br>[empty Selection]<br>please try again later <br></p>';
	} else if ($description == '') {
		echo '<p style="color: red" class="centered"><b>Unexpected error,</b><br>[empty Description]<br>please try again later <br></p>';
	} else if ($user == '') {
		echo '<p style="color: red" class="centered"><b>Unexpected error,</b><br>[empty email]<br>please try again later <br></p>';
	} else {
	    $insert="insert into audits (oBasket,description,user) values ('$oBasket','$description','$user')";
		$saved = @ mysql_query($insert);
		if(!$saved) {
			echo '<p style="color: red" class="centered"><b>Unexpected Error,</b><br>[Unable save in the Database]<br>Please try again later <br></p>';
		} else {
		    $get_basket="SELECT id FROM audits WHERE (oBasket='$oBasket' && description='$description' && user='$user')";
            $loaded = @ mysql_query($get_basket);
            if ($loaded) {
                $numrows= @ mysql_num_rows($loaded);
            	if ($numrows>0) {
            	    $row = @ mysql_fetch_array($loaded, MYSQL_ASSOC);
            	}
            }
			echo ($row['id']);
		}
	}
	    


?>