<?php session_start();
$page = 'aboutus';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>
        Greensight - About the Project &amp; Contact Form
    </title>
    <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/aboutus.css" type="text/css" charset="utf-8">
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
            <?php include 'ssi/header.php' ?>
        </div>
        <div id="navigation" class="">
            <?php include 'ssi/navigation.php' ?>
            <div style="clear:both"></div>
        </div>
        <div id="main">
            <div id="left" class="">
                <div id="top_left" class="shadow corners">
                    <?php include 'ssi/sidebar.php' ?>
                </div>
            </div>
            <div id="right" class="">
                <div id="top_right" class="shadow corners">
                    <h3 class="centered"><a href="#about">About the Website</a></h3>
                    <div class="margin">
                        <h4 class="centered">Greensight was created in september 2011,<br>
                        as part of a MSc Dissertation project at Edinburgh Napier University.<br>
                        </h4>
                        <p class="centered" style="color:#666633"><em>Mission statement:</em></p>
                        <div id="statement" class="margin corners">
                            <h4 class="centered margin"><i>“Greensight is a web based auditing tool that helps quickly calculating the carbon footprint of all the computing equipment of your organisation, and help you take steps to reduce it”</i></h4>
                        </div>
                    </div>
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
