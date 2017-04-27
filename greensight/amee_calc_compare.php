<?php session_start();
$page = 'amee_calc'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>
        Greensight - Carbon Calculator - Compare
    </title>
    <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/amee_calc_compare.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="css/amee_calc_compare_print.css" type="text/css" media="print" title="no title" charset="utf-8">
    <link rel="stylesheet" href="css/jquery.jqplot.css" type="text/css">
    <link rel="stylesheet" href="css/jquery.msg.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="css/jquery.tooltip.css" type="text/css" media="screen" title="no title" charset="utf-8">
    
    <!-- libraries -->
    <script src="javascripts/libs/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/ui/jquery-ui.js" type="text/javascript" charset="utf-8"></script> 
    <script src="javascripts/libs/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.validate.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.msg.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.center.min.js" type="text/javascript" charset="utf-8"></script>
    <!--[if lt IE 9]>
    <script language="javascript" type="text/javascript" src="javascripts/libs/excanvas.js"></script>
    <![endif]-->
    <script src="javascripts/libs/jquery.jqplot.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/plugins/jqplot.barRenderer.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/plugins/jqplot.categoryAxisRenderer.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/plugins/jqplot.canvasTextRenderer.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/plugins/jqplot.canvasAxisLabelRenderer.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/plugins/jqplot.pointLabels.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.dateFormat-1.0.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.tooltip.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.tooltip.pack.js" type="text/javascript" charset="utf-8"></script>

    <!-- custom scripts -->
    <script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/greensight.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/calc_compare.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/calc_tooltips.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
    // check if logged in and if not open msg box
    $(document).ready(function() {
    if (!$.cookie('email')) {
        $.msg({
            bgPath: 'images/',
            autoUnblock: false,
            clickUnblock: false,
            content: '<p class="centered">Feature only available<br>for registered users<\/p>' +
            '<p class="btn-wrap centered" style="max-width:184px;">' +
            '<fieldset id="login_bottom" class="login_menu">' +
            '<div id="popup_login_result" style="max-width:162px;" class="centered"><\/div>' +
            '<form method="post" id="login_frm_bottom" class="login_form" action="">' +
            '<p>' +
            '<label for="email_bl">email:<\/label> <input type="text" name="email" id="email_bl" />' +
            '<\/p>' +
            '<p>' +
            '<label for="password_bl">password:<\/label> <input type="password" name="password" id="password_bl" />' +
            '<\/p>' +
            '<p>' +
            '<input class="submit" type="submit" value="Log in" />' +
            '<\/p>' +
            '<div style="clear:both"><\/div>' +
            '<p class="centered">' +
            '<label for="signup" class="desc">Not a member yet?<\/label><a class="" href="signup.php" id="signup" name="signup">Create an account<\/a><br>'+
            '<label for="amee_calc_a" class="desc">or<\/label>'+
            '<a class="" href="amee_calc.php" id="amee_calc_a" name="amee_calc">go back to the calculator<\/a>' +
            '<\/p>' +
            '<\/form>' +
            '<\/fieldset>' +
            '<\/p>',
            afterBlock: function() {
                // store 'this' for other scope to use
                var self = this;
                $("#login_frm_bottom").validate({
                    rules: {
                        email: {
                            required: true,
                            email: true,
                            maxlength: 50

                        },
                        password: {
                            required: true,
                            minlength: 7,
                            maxlength: 20

                        }
                    }
                });
                $("#login_frm_bottom").submit(function() {
                    if ($("#login_frm_bottom").valid() == true) {
                        var email = $('#email_bl').val();
                        var password = $('#password_bl').val();
                        var data = 'email=' + email + '&password=' + password;
                        $.ajax({
                            url: "php_scripts/login.php",
                            type: "POST",
                            data: data,
                            cache: false,
                            success: show_login_Response
                        });
                        //prevent the browser from refreshing the page
                        return false;
                    } else if ($("#login_frm_bottom").valid() == false) {
                        $('#login_bottom').effect("shake", {
                            times: 3
                        },
                        50);
                    }
                });
                function show_login_Response(responseText) {
                    if (responseText == '<p style="color: green"><b>Logged in successfully<br><\/p>') {
                        window.location.reload();
                    } else {
                        $('#popup_login_result').html(responseText).fadeIn('slow');
                        $('#login_bottom').effect("shake", {
                            times: 3
                        },
                        50);
                    }
                };
            }
        });
    };
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
            <div id="left" class=""></div>
            <div id="right" class="">
                <div id="very_top_right">
                    <table id="audit_details" border="0" cellspacing="10" cellpadding="1"></table>
                </div>
                <div id="top_right" class="shadow corners">
                    <div id="chartAll"></div>
                    <div id="chartAllIn"></div>
                    <div id="chartCategory"></div>
                    <div style="clear:both"></div>
                    <div id="chartbtns">
                        <input type="button" name="btn_all_equipment" value="All Equipment" id="btn_all_equipment" onclick="allEquipment()">
                        <input type="button" name="btn_by_category" value="All categories" id="btn_by_category" onclick="byCategory()">
                        <input type="button" name="btn_all_workstation" value="Workstations" id="btn_all_workstation" onclick="allIn('aWorkstation')">
                        <input type="button" name="btn_all_desktop" value="Desktop" id="btn_all_desktop" onclick="allIn('aDesktop')">
                        <input type="button" name="btn_all_intergated" value="Intergated" id="btn_all_intergated" onclick="allIn('aIntergated')">
                        <input type="button" name="btn_all_notebook" value="Notebook" id="btn_all_notebook" onclick="allIn('aNotebook')">
                        <input type="button" name="btn_all_computingequipment" value="C. Equipment" id="btn_all_computingequipment" onclick="allIn('aComputingEquipment')">
                    </div>
                    <p id="results" class="centered"></p>
                </div>
                <div style="clear:both"></div>
                <div id="middle_right_alt" class="shadow corners">
                    <div id="comparator_btns">
                        <input type="button" name="btn_reset_series" value="Reset" id="btn_reset_series" onclick="resetComparator()">
                        <input type="button" name="btn_print_series" value="Print" id="btn_print_series" onclick="window.print()">
                        <input type="button" name="btn_export_series" value="Export" id="btn_export_series" onclick="exportSeries()">
                    </div>
                </div>
                <div id="middle_right" class="">
                    <div id="middle_right_left" class="shadow corners styled_table">
                        <table id="listOfBaskets" class="stripped series" border="0" cellspacing="0" cellpadding="0" summary="saved baskets">
                            <tr>
                                <th class="lob_description">My Saved Audits</th>
                                <th class="btn_series"></th>
                                <th class="btn_series"></th>
                            </tr>
                        </table>
                    </div>
                    <div id="middle_right_right" class="shadow corners styled_table">
                        <table id="listOfLoadedBaskets" class="stripped" border="0" cellspacing="0" cellpadding="0" summary="loaded baskets1">
                            <tr>
                                <th class="lb_description centered">My Loaded Audits</th>
                                <th class="lb_date centered">Date</th>
                                <th class="lb_series centered">Series</th>
                            </tr>
                        </table>
                    </div>
                    <div style="clear:both"></div>
                </div>
                <div style="clear:both"></div>
                <div id="bottom_right" class="shadow corners styled_table">
                    <div id="bottom_right_left">
                        <div id="results_table_s1_title" class="totalfootprint">
                            <p id="title_s1" class="ptotal">Series 1: <i>Not loaded yet</i></p>
                        </div>
                        <table id="results_table_s1" class="stripped" border="0" cellspacing="0" cellpadding="0" summary="equipment carbon footprint series 1">
                            <tr>
								<th class="series_cat chart_cat_s1">Item</th>
                                <th class="qty">Qty</th>
                                <th class="dsc">Description</th>
                                <th class="standby">Standby</th>
                                <th class="totalkWh">kWh</th>
                                <th id="unit_s1" class="amount">Kg of CO2</th>
                                <th class="perunit">Per Unit</th>
                            </tr>
                        </table>
                        <div id="totalfootprint_s1" class="totalfootprint">
                            <p id="ptotal_s1" class="ptotal"></p>
                        </div>
                    </div>
                    <div id="bottom_right_right">
                        <div id="results_table_s2_title" class="totalfootprint">
                            <p id="title_s2" class="ptotal">Series 2: <i>Not loaded yet</i></p>
                        </div>
                        <table id="results_table_s2" class="stripped" border="0" cellspacing="0" cellpadding="0" summary="equipment carbon footprint series 2">
                            <tr>
								<th class="chart_cat chart_cat_s2">Item</th>
                                <th class="qty">Qty</th>
                                <th class="dsc">Description</th>
                                <th class="standby">Standby</th>
                                <th class="totalkWh">kWh</th>
                                <th id="unit_s2" class="amount">Kg of CO2</th>
                                <th class="perunit">Per Unit</th>
                            </tr>
                        </table>
                        <div id="totalfootprint_s2" class="totalfootprint">
                            <p id="ptotal_s2" class="ptotal"></p>
                        </div>
                    </div>
                    <div style="clear:both"></div>
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
