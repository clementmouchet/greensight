<?php
session_start();
error_reporting(0);
require_once '../dbconnect.php';

// make sure dbconnect.php is loaded // normaly require does it.
if($dbase == '') {
	echo '<p style="color: red"><b>Unexpected error,</b><br>[Problem on the server]<br>Please try again later</p>';
} else {
	// "hybrid" variables can take both GET and POST for more flexibility
	$name= mysql_real_escape_string(($_GET['name']) ? $_GET['name'] : $_POST['name']);
	$contact= mysql_real_escape_string(($_GET['contact']) ? $_GET['contact'] : $_POST['contact']);
	$address1= mysql_real_escape_string(($_GET['address1']) ? $_GET['address1'] : $_POST['address1']);
	$address2= mysql_real_escape_string(($_GET['address2']) ? $_GET['address2'] : $_POST['address2']);
	$town= mysql_real_escape_string(($_GET['town']) ?$_GET['town'] : $_POST['town']);
	$postcode= mysql_real_escape_string(($_GET['postcode']) ? $_GET['postcode'] : $_POST['postcode']);
	$phone= mysql_real_escape_string(($_GET['phone']) ? $_GET['phone'] : $_POST['phone']);
	$email = mysql_real_escape_string(($_GET['email']) ? $_GET['email'] : $_POST['email']);
	$password = mysql_real_escape_string(($_GET['password']) ? $_GET['password'] : $_POST['password']);
	$jdate=date('Y-m-d');

	// check that required field are not empty (proper check is done on the client side)
	if ($name == '') {
		echo '<p style="color: red"><b>Unexpected error,</b><br>[empty Organisation Name]<br>please try again later <br></p>';
	} else if ($contact == '') {
			echo '<p style="color: red"><b>Unexpected error,</b><br>[empty Contact Name]<br>please try again later <br></p>';
		} else if ($email == '') {
			echo '<p style="color: red"><b>Unexpected error,</b><br>[empty email]<br>please try again later <br></p>';
		} else if ($password == '') {
			echo '<p style="color: red"><b>Unexpected error,</b><br>[empty password]<br>please try again later <br></p>';
		} else {
		//check if the email is already in DB
		$check_email="SELECT email FROM members WHERE (email='$email')";
		$check= @ mysql_query($check_email);
		if (!$check) {
			echo '<p style="color: red"><b>Unexpected error,</b><br>[Unable to perform email verification]<br>please try again later <br></p>';
		} else {
			$numrows_check= @ mysql_num_rows($check);
			if($numrows_check>0) {
				echo '<p style="color: red"><b>This email is already registered,</b><br>You can ask for your credentials to be re-send by clicking <a href="#">here</a><br></p>';
			} else //carry on with the registration
				{
				$insert="insert into members (name,contact,address1,address2,town,postcode,phone,email,password,jdate,admin) values ('$name','$contact','$address1','$address2','$town','$postcode','$phone','$email','$password','$jdate',0)";
				$register = @ mysql_query($insert);
				if(!$register) {
					echo '<p style="color: red"><b>Unexpected Error,</b><br>[Unable create account in the Database]<br>Please try again later <br></p>';
				} else {
					echo '<p style="color: green"><b>Account created successfully<br></p>';
					//set session for user
					include '../login.php';
				}
			}
		}
	}
}
echo '<p style="color: green"><a href="home.php"><span><b>Go back to the Homepage</b></span></a></p>';

?>
