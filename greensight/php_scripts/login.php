<?php
session_start();
error_reporting(0);
require_once 'dbconnect.php';


$path = '/';

// make sure dbconnect.php is loaded // normaly require does it.
if($dbase == '') {
	echo '<p style="color: red"><b>Unexpected error,</b><br>[Problem on the server]<br>Please try again later</p>';
} else {
	$numrows=0;
	// "hybrid" variables can take both GET and POST for more flexibility
	$email = ($_GET['email']) ? $_GET['email'] : $_POST['email'];
	$password = ($_GET['password']) ? $_GET['password'] : $_POST['password'];

	if($email == '') {
		echo '<p style="color: red"><b>Email did not reach the server<br></p>';
	} else if($password == '') {
			echo '<p style="color: red"><b>Password did not reach the server<br></p>';
		} else {
		$check_account="SELECT email,name,contact,admin FROM members WHERE (password='$password' && email='$email')";
		$check= @ mysql_query($check_account);
		if (!$check)
		{
			echo '<p style="color: red"><b>Unexpected error,</b><br>[Unable to verify credentials]<br>please try again later<br></p>';
		} else {
			$numrows= @ mysql_num_rows($check);
			if ($numrows>0) {
				$row = @ mysql_fetch_array($check, MYSQL_ASSOC);
				if ($row['admin']==1) {
					setcookie('superuser', $row['contact'], time()+604800, $path);
					setcookie('user', $row['contact'], time()+604800, $path);
					setcookie('email', $row['email'], time()+604800, $path);
					setcookie('org', $row['name'], time()+604800, $path);
					if (!isset($_COOKIE['superuser'])) {
						$_SESSION['superuser']=$row['name'];
						$_SESSION['user']=$row['contact'];
						$_SESSION['org']=$row['name'];
						$_SESSION['email']=$row['email'];
					}
					echo '<p style="color: green"><b>Logged in successfully<br></p>';
				} else {
					setcookie('user', $row['contact'], time()+604800, $path);
					setcookie('email', $row['email'], time()+604800, $path);
					setcookie('org', $row['name'], time()+604800, $path);
					if (!isset($_COOKIE['user'])) {
						$_SESSION['user']=$row['contact'];
						$_SESSION['org']=$row['name'];
						$_SESSION['email']=$row['email'];
					}
					echo '<p style="color: green"><b>Logged in successfully<br></p>';
				}
			} else {
				echo '<p style="color: red"><b>Invalid credentials,</b> please try again</p>';
			}
		}
	}
}
?>