<table id="sidebar" class="" border="0" cellspacing="0" cellpadding="0" summary="sidebar">
	<tr>
		<th class="centered">
			Sidebar
		</th>
	</tr>
</table>
<div id="accordion" class="margin">
	<h4>
		<a href="home.php">Home</a>
	</h4>
	<ul class="sidebar_list">
		<li>
			<a href="home.php">Getting started</a>
		</li>
		<li>
			<a href="home.php">Latest updates</a>
		</li>
		<?php if (!isset($_SESSION) || !isset($_COOKIE['user'])) {
	echo '<li><a href="#login">Login</a></li>';
} ?>
	</ul>
	<h4>
		<a href="amee_calc.php">Carbon Calculator</a>
	</h4>
	<ul class="sidebar_list">
		<li>
			<a href="amee_calc.php">Caclulate</a>
		</li>
		<li>
			<a href="amee_calc.php">Get report</a>
		</li>
		<li>
			<a href="amee_calc_compare.php">Compare</a>
		</li>
	</ul>
	<h4>
		<a href="aboutus.php">About the website</a>
	</h4>
	<ul class="sidebar_list">
		<li>
			<a href="aboutus.php">Aims</a>
		</li>
		<li>
			<a href="aboutus.php">Mission statement</a>
		</li>
	</ul>
</div>
<div id="topbar">
	<a href="#top" id="top" class="topbtn" name="top">Top&nbsp;^</a>
</div>