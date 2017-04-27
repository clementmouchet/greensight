<?php
error_reporting(0);
$page = 'profile';
session_start();
if(empty($_COOKIE['user']) && empty($_SESSION['user'])){
    echo'<script>window.location="home.php"</script>';
};
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>
            Greensight - Edit My Profile
        </title>
        <link rel="stylesheet" href="css/signup.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8">
        <!-- libraries -->
        <script src="javascripts/libs/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/ui/jquery-ui.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.validate.min.js" type="text/javascript" charset="utf-8"></script>
        <!-- custom scripts -->
        <script src="javascripts/greensight.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8"></script>
    </head>
    <body>
        <div class="wrapper">
            <div id="header" class="shadow">
                <?php include "ssi/header.php" ?>
            </div>
            <div id="navigation" class="">
                <?php include "ssi/navigation.php" ?>
                <div style="clear:both"></div>
            </div>
            <div id="main">
                <div id="left" class="shadow corners">
                    <div id="result" class=""></div>
                    <form id="edit_profile" action="" method="post" class="margin" name="edit_profile">
                        <fieldset class="member_form" style="border:none">
                            <legend>Update your profile</legend> <?php include "php_scripts/members/load_profile.php" ?>
                            <p>
                                <label for="name">Organisation Name:</label> <em class="required">*</em><input type="text" name="name" id="name" value='<?php echo $name ?>'>
                            </p>
                            <p>
                                <label for="contact">Contact Name:</label> <em class="required">*</em><input type="text" name="contact" id="contact" value='<?php echo $contact ?>'>
                            </p>
                            <p>
                                <label for="address1">Address :</label> <em>&nbsp;</em><input type="text" name="address1" id="address1" value='<?php echo $address1 ?>'>
                            </p>
                            <p>
                                <label for="address2">Address :</label> <em>&nbsp;</em><input type="text" name="address2" id="address2" value='<?php echo $address2 ?>'>
                            </p>
                            <p>
                                <label for="town">Town:</label> <em>&nbsp;</em><input type="text" name="town" id="town" value='<?php echo $town ?>'>
                            </p>
                            <p>
                                <label for="postcode">Post Code:</label> <em>&nbsp;</em><input type="text" name="postcode" id="postcode" value='<?php echo $postcode ?>'>
                            </p>
                            <p>
                                <label for="phone">Phone:</label> <em>&nbsp;</em><input type="text" name="phone" id="phone" value='<?php echo $phone ?>'>
                            </p>
                            <p>
                                <label for="useremail">Email:</label> <em class="required">&nbsp;</em><input type="text" name="useremail" id="useremail" disabled="disabled" value='<?php echo $email ?>'>
                            </p>
                            <p>
                                <label for="userpassword">Password:</label> <em class="required">*</em><input type="password" name="userpassword" id="userpassword">
                            </p>
                            <p>
                                <label for="password2">Re-type Password:</label><em class="required">*</em><input type="password" name="password2" id="password2">
                            </p>
                            <p>
                                <input type="reset" name="reset" value="Reset" class="reset" id="reset"><input class="submit" type="submit" value="Submit">
                            </p>
                        </fieldset>
                    </form>
                </div>
                <div id="right" class="shadow corners">
                    <div class="margin">
                        <p class="centered rules">
                            Emails cannot be updated by the users
                        </p>
                    </div>
                </div>
            </div>
            <div class="push"></div>
        </div>
        <div class="footer">
            <?php include "ssi/footer.html" ?>
        </div>
    </body>
</html>
