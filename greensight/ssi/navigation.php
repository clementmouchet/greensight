<?php
if (isset($_COOKIE['superuser']) && !empty($_COOKIE['superuser']) || isset($_SESSION['superuser'])) {
	include "ssi/navigation/navigationS.php";
} else if (isset($_COOKIE['user']) && !empty($_COOKIE['user']) || isset($_SESSION['user'])) {
		include "ssi/navigation/navigationM.php";
	} else {
	include "ssi/navigation/navigation.php";
};
?>