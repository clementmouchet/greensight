<?php session_start();
$page = 'home'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>
        Greensight - Home Page
    </title>
    <link rel="stylesheet" href="css/master.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="css/home.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="css/navigation.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="css/jquery.msg.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <!--[if gte IE 8]>
        <style> #login_frm_bottom { padding-left /*\**/: .5em\9; padding-right /*\**/: .8em\9; } </style>
    <![endif]-->
    <!--[if gte IE 9]>
        <style> #login_frm_bottom { padding-left: .1em; padding-right: .3em; } </style>
    <![endif]-->
    <!-- libraries -->
    <script src="javascripts/libs/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/ui/jquery-ui.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/ui/jquery.ui.widget.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.validate.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.msg.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.center.min.js" type="text/javascript" charset="utf-8"></script>
    <!-- custom scripts -->
    <script src="javascripts/greensight.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        if ($.cookie('lastVisit')) {
            $('#lastVisit').html("Your last Visit was on " + $.cookie('lastVisit'));
            $('#loggedas').html("Welcome Back<br/>" + $('#session').html());
        } else {
            $('#lastVisit').html("Thank you for visiting our website !");
        }
        $.cookie('lastVisit', $.datepicker.formatDate('DD, dd MM', new Date()), { expires: 60 },{ path: '/' });
    });
    </script>
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
                <?php
                    if (!isset($_SESSION) || !isset($_COOKIE['user'])) {
                        include 'ssi/bottom_left.php';
                    };
                ?>
            </div>
            <div id="right" class="">
                <div id="top_right" class="shadow corners">
                    <div id="featured" class="">
                        <ul class="ui-tabs-nav">
                            <li>
                                <p id="getting_started" class="centered">GETTING STARTED</p>
                            </li>
                            <li class='ui-tabs-nav-item ui-tabs-selected' id='nav-featured1'><a href='#featured1'><span>Calculate footprints</span></a></li>
                            <li class='ui-tabs-nav-item ui-tabs-selected' id='nav-featured2'><a href='#featured2'><span>Save your audits</span></a></li>
                            <li class='ui-tabs-nav-item ui-tabs-selected' id='nav-featured3'><a href='#featured3'><span>Get Reports</span></a></li>
                            <li class='ui-tabs-nav-item ui-tabs-selected' id='nav-featured4'><a href='#featured4'><span>Compare audits</span></a></li>
                        </ul>
                        <div id="featured1" class="ui-tabs-panel">
                            <img src="images/gs1.jpg" width="500" height="303" alt="Calculate footprints">
                            <div class="info">
                                <h2>Calculate footprints</h2>
                                <p>of all your computing equipment in seconds … <a href="amee_calc.php">Get stared &gt;&gt;</a></p>
                            </div>
                        </div>
                        <div id="featured2" class="ui-tabs-panel">
                            <img src="images/gs2.jpg" width="500" height="303" alt="Calculate footprints">
                            <div class="info">
                                <h2>Save you audits for later use</h2>
                                <p>to access them anywhere, compare them, or more … <a href="amee_calc.php">Get stared &gt;&gt;</a></p>
                            </div>
                        </div>
                        <div id="featured3" class="ui-tabs-panel">
                            <img src="images/gs3.jpg" width="500" height="303" alt="Get Reports">
                            <div class="info">
                                <h2>Get gorgeous Reports</h2>
                                <p>to help you process the data, and make decisions … <a href="amee_calc.php">Get stared &gt;&gt;</a></p>
                            </div>
                        </div>
                        <div id="featured4" class="ui-tabs-panel">
                            <img src="images/gs4.jpg" width="500" height="303" alt="Compare audits">
                            <div class="info">
                                <h2>Compare audits</h2>
                                <p>go beyond the reports, anticipate, track changes … <a href="amee_calc_compare.php">Get stared &gt;&gt;</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="clear:both"></div>
                <div id="left_right" class="shadow corners">
                    <p id="membership" class="centered">MEMBERSHIP</p>
                    <h4 id="loggedas">
                        <?php
                            if (empty($_SESSION)) {
                                echo 'Not registered?<br>';
                            } else {
                                echo 'logged as<br>';
                            };
                        ?> 
                        <span id="session">
                        <?php
                            if (isset($_SESSION['superuser'])) {
                                echo '<span style="color:#930">' . $_SESSION['superuser'] . "</span>";
                            } else if (isset($_COOKIE['superuser'])) {
                                echo '<span style="color:#930">' . $_COOKIE['superuser'] . "</span>";
                            } else if (isset($_SESSION['user'])) {
                                echo '<span style="color:#663">' . $_SESSION['user'] . "</span>";
                            } else if (isset($_COOKIE['user'])) {
                                echo '<span style="color:#663">' . $_COOKIE['user'] . "</span>";
                            } else if (empty($_SESSION) || empty($_COOKIE['user'])) {
                                echo '<span><a href="signup.php">Create an account</a></span>';
                            };
                        ?>
                        </span>
                    </h4>
                    <p id="lastVisit" class="centered"></p>
                </div>
                <div id="right_right" class="shadow corners">
                    <p id="website_updates" class="centered">WEBSITE UPDATES</p>
                    <h4 class="website_updates centered">no updates</h4>
                </div>
                <div style="clear:both"></div>
            </div>
        </div>
        <div class="push"></div>
    </div>
    <div class="footer">
        <?php include "ssi/footer.html" ?>
    </div>
</body>
</html>
