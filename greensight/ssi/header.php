<img id="heading" src="images/gslogo.png" alt="Greensight - a Carbon Calculator">
<img class="headlogo" src="images/napierlogo.png" alt="Napierlogo">
<div id="logged_as">
	<?php if ($_SESSION['user'] || $_COOKIE['user']) {
	echo "<span>Logged as: ". ($_SESSION['user'] ? $_SESSION['user'] : $_COOKIE['user']) ."</span>";
} else {
	echo "<span>Not logged in";
}?>
</div>