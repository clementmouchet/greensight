<?php
require "php_scripts/dbconnect.php";
if (isset($_SESSION['email'])) {
	$email=$_SESSION['email'];
} else if (isset($_COOKIE['email'])) {
    $email=$_COOKIE['email'];
} else {
    echo'<p style="color: red"><b>Unexpected error,</b><br>[Login corrupted]<br>Please log off, login and try again</p>';
}
$query = "SELECT * FROM members WHERE (email='$email')";
$link=mysql_query($query);
if (!$link) {
	echo'<p style="color: red"><b>Unexpected error,</b><br>[Unable to perform email verification]<br>Please try again later</p>';
} else {
    $numrows=mysql_num_rows($link);
    if ($numrows>0) {
    	$row = mysql_fetch_array($link, MYSQL_ASSOC);
    	$name=$row['name'];
    	$contact=$row['contact'];
    	$address1=$row['address1'];
    	$address2=$row['address2'];
    	$town=$row['town'];
    	$postcode=$row['postcode'];
    	$phone=$row['phone'];
    }
}

?>