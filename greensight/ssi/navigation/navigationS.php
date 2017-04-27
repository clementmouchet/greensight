<ul id="menu" class="tabs">
	<li <?php include 'ssi/navigation/home_tab.php' ?>>
		<a href="home.php">Home</a>
	</li>
	<li <?php include 'ssi/navigation/amee_calc_tab.php' ?>>
		<a href="amee_calc.php">Carbon Calculator</a>
		<ul class="dropdown shadow corners">
			<li>
				<p class="desc centered margin">
					Calculate a carbon footprint using AMEE database
				</p>
			</li>
			<li>
                <a class="dropdown_link centered corners" href="amee_calc.php">Calculate</a>
            </li>
            <li>
                <a class="dropdown_link centered corners" href="amee_calc.php">Get Report</a>
            </li>
            <li>
                <a class="dropdown_link centered corners" href="amee_calc_compare.php">Compare My Audits</a>
            </li>
		</ul>
	</li>
	<li <?php include 'aboutus_tab.php';?>>
        <a href="aboutus.php">About the website</a>
    </li>
    <li class="float_right">
        <a class="loginout" href="php_scripts/logout.php">Log out</a>
    </li>
    <li <?php include 'profile_tab.php' ?> class="float_right">
        <a href="edit_profile.php">My Profile</a>
    </li>
	<li class="float_right">
		<?php echo "<span>". ($_SESSION['org'] ? $_SESSION['org'] : $_COOKIE['org']) ." :</span>"; ?>
	</li>
</ul>