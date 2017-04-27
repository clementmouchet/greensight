<?php session_start();
$page = 'signup';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>
        Greensight - Signup
    </title>
    <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/signup.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/jquery.msg.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <!-- libraries -->
    <script src="javascripts/libs/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/ui/jquery-ui.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.validate.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.msg.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.center.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
    <!-- custom scripts -->
    <script src="javascripts/greensight.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        if ($.cookie('user')) {
            $.msg({
                bgPath: 'images/',
                clickUnblock : false,
                timeOut : 2000,
                content: '<p class="centered"><b>You are already registered and logged in!<\/b><br><br><i>You are being redirected to the <a class="" href="home.php">home page<\/a><\/p>',
                beforeUnblock : function(){
                    window.location="home.php";
                }
            });
        };
    });
    </script>
</head>
<body>
    <div class="wrapper">
        <div id="header" class="shadow">
            <?php include "ssi/header.php" ?>
        </div>
        <div id="navigation" class="">
            <?php include 'ssi/navigation.php' ?>
            <div style="clear:both"></div>
        </div>
        <div id="main">
            <div id="left" class="shadow corners">
                <div id="result" class=""></div>
                <form id="joinup" action="" method="post" class="margin">
                    <fieldset class="member_form" style="border:none">
                        <legend>Account creation form</legend>
                        <p>
                            <label for="name">Organisation Name:</label> <em class="required">*</em><input type="text" name="name" id="name">
                        </p>
                        <p>
                            <label for="contact">Contact Name:</label> <em class="required">*</em><input type="text" name="contact" id="contact">
                        </p>
                        <p>
                            <label for="address1">Address :</label> <em>&nbsp;</em><input type="text" name="address1" id="address1">
                        </p>
                        <p>
                            <label for="address2">Address :</label> <em>&nbsp;</em><input type="text" name="address2" id="address2">
                        </p>
                        <p>
                            <label for="town">Town:</label> <em>&nbsp;</em><input type="text" name="town" id="town">
                        </p>
                        <p>
                            <label for="postcode">Post Code:</label> <em>&nbsp;</em><input type="text" name="postcode" id="postcode">
                        </p>
                        <p>
                            <label for="phone">Phone:</label> <em>&nbsp;</em><input type="text" name="phone" id="phone">
                        </p>
                        <p>
                            <label for="useremail">Email:</label> <em class="required">*</em><input type="text" name="useremail" id="useremail">
                        </p>
                        <p>
                            <label for="userpassword">Password:</label> <em class="required">*</em><input type="password" name="userpassword" id="userpassword">
                        </p>
                        <p>
                            <label for="password2">Re-type Password:</label><em class="required">*</em><input type="password" name="password2" id="password2">
                        </p>
                        <p>
                            <em class="required">*</em>
                            <input type="checkbox" name="agree" value="checkbox" id="agree" class="required"><label id="agree_lab" for="agree">I have read and understand the informed consent form<br>and consent to participate in this study.</label>
                        </p>
                        <p>
                            <input class="submit" type="submit" value="Submit">
                        </p>
                    </fieldset>
                </form>
            </div>
            <div id="right" class="shadow corners">
                <div class="margin">
                    <input type="button" name="reader" class="reader_btn" value="Reader" onclick="openMe($('#form_title').html(),$('#form_consent').html())">
                    <h4 id="form_title" class="centered rules">INFORMED CONSENT FORM</h4>
                    <p id="form_consent">Edinburgh Napier School of Computing requires that all persons who participate in research studies give their written consent to do so. Please read the following and sign it if you agree with what it says.<br>
                    <br>
                    I freely and voluntarily consent to be a participant in the research project on the topic of Green Information Technology to be conducted by Clément MOUCHET, who is a postgraduate student in the Edinburgh Napier School of Computing. The broad goal of this research study is to evaluate an auditing tool able to perform carbon footprint audits. Specifically, I have been asked to use this software and provide feedback to the developer, which should take no longer than a couple of minutes to complete.<br>
                    <br>
                    I have been told that my responses will be anonymised. I also understand that if at any time during the session I feel unable or unwilling to continue, I am free to leave. That is, my participation in this study is completely voluntary, and I may withdraw from it at any time without negative consequences. [In addition, should I not wish to answer any particular question or questions, I am free to decline.] My name will not be linked with the research materials, and I will not be identified or identifiable in any report subsequently produced by the researcher.<br>
                    <br>
                    I have been given the opportunity to ask questions regarding the procedure, and my questions have been answered to my satisfaction.<br>
                    I have read and understand the above and consent to participate in this study. My acceptation is not a waiver of any legal rights.
                    </p>
                    <input type="button" name="reader" class="reader_btn" value="Print" onclick="openMe($('#form_title').html(),$('#form_consent').html())">
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
