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
	<li <?php  if($page=='signup') echo " class='current_tab float_right'"?> class="float_right">
        <a href="login" class="login"><?php if($page=='signup') {echo 'CREATE AN ACCOUNT';} else {echo 'Log in / Register';};?></a>
        <fieldset id="login_menu" class="shadow login_menu">
            <div id="Login_result"></div>
            <form method="post" id="login" class="login_form" action="">
                <p>
                    <label for="email">email:</label> <input type="text" name="email" id="email" />
                </p>
                <p>
                    <label for="password">password:</label> <input type="password" name="password" id="password" />
                </p>
                <p>
                    <input class="submit" type="submit" value="Log in" /><!-- <a class="readvise" href="#" class="" id="readvise" name="readvise">Re-advise credentials</a> -->
                </p>
                <div style="clear:both"></div>
                <p class="centered">
                    <label for="signup" class="desc">Not a member yet?</label><a class="dropdown_link" href="signup.php" id="signup" name="signup">Create an account</a>
                </p>
            </form>
        </fieldset>
    </li>
</ul>