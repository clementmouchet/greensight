<?php session_start();
$page = 'amee_calc'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>
        Greensight - Carbon Calculator - Results
    </title>
    <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/amee_calc_results.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/amee_calc_results_print.css" type="text/css" media="print" charset="utf-8">
    <link rel="stylesheet" href="css/jquery.jqplot.css" type="text/css">
    <link rel="stylesheet" href="css/jquery.msg.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="css/jquery.tooltip.css" type="text/css" media="screen" title="no title" charset="utf-8">

    <!-- libraries -->
    <script src="javascripts/libs/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8"></script>   
    <script src="javascripts/libs/ui/jquery-ui.js" type="text/javascript" charset="utf-8"></script> 
    <script src="javascripts/libs/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.validate.min.js" type="text/javascript" charset="utf-8"></script>
    <!--[if lt IE 9]>
    <script language="javascript" type="text/javascript" src="javascripts/libs/excanvas.js"></script>
    <![endif]-->
    <script src="javascripts/libs/jquery.jqplot.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/plugins/jqplot.barRenderer.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/plugins/jqplot.categoryAxisRenderer.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/plugins/jqplot.canvasTextRenderer.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/plugins/jqplot.canvasAxisLabelRenderer.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/plugins/jqplot.pointLabels.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="javascripts/libs/plugins/jqplot.cursor.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.tooltip.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.tooltip.pack.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.dateFormat-1.0.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.json2xml.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.msg.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.center.min.js" type="text/javascript" charset="utf-8"></script>
        
    <!-- custom scripts -->
    <script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/greensight.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/calc_report.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/calc_tooltips.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        if (!localStorage.getItem('oBasket')) {
            $.msg({
                bgPath: 'images/',
                clickUnblock : false,
                timeOut : 5000,
                content: '<p class="centered"><b>Please create or load a saved audit to use this function<\/b><br><br><i>You will be redirected to the <a class="" href="amee_calc.php">calculator<\/a> in 5 seconds<\/p>',
                beforeUnblock : function(){
                    window.location="amee_calc.php";
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
                    <div id="chart_totalfootprint" class="">
                        <p id="head_ptotal"></p>
                    </div>
                    <div id="chartAll"></div>
                    <div id="chartAllIn"></div>
                    <div id="chartCategory"></div>
                    <div style="clear:both"></div>
                    <div id="chartbtns">
                        <p class="chartbtns_legend centered">Product type Categories</p>
                        <input type="button" name="btn_all_equipment" value="All Equipment" id="btn_all_equipment" onclick="allEquipment()">
						<input type="button" name="btn_by_room" value="All rooms" id="btn_by_room" onclick="byRooms()" disabled="true">
                        <!-- <input type="button" name="btn_by_category" value="All categories" id="btn_by_category" onclick="byCategory()">
                        <input type="button" name="btn_all_workstation" value="Workstations" id="btn_all_workstation" onclick="allIn(aWorkstation)">
                        <input type="button" name="btn_all_desktop" value="Desktop" id="btn_all_desktop" onclick="allIn(aDesktop)">
                        <input type="button" name="btn_all_intergated" value="Intergated" id="btn_all_intergated" onclick="allIn(aIntergated)">
                        <input type="button" name="btn_all_notebook" value="Notebook" id="btn_all_notebook" onclick="allIn(aNotebook)">
                        <input type="button" name="btn_all_computingequipment" value="C. Equipment" id="btn_all_computingequipment" onclick="allIn(aComputingEquipment)"> -->
                        <div style="clear:both"></div>
                        <p class="chartbtns_legend centered">Roles</p>
                        <input type="button" name="btn_all_RoleDesktop" value="Desktop PC" id="btn_all_RoleDesktop" onclick="allIn(aRoleDesktop)">
                        <input type="button" name="btn_all_RoleSharedPC" value="Shared PC" id="btn_all_RoleSharedPC" onclick="allIn(aRoleSharedPC)">
                        <input type="button" name="btn_all_RoleServer" value="Server" id="btn_all_RoleServer" onclick="allIn(aRoleServer)">
                        <input type="button" name="btn_all_RoleLaptop" value="Laptop" id="btn_all_RoleLaptop" onclick="allIn(aRoleLaptop)">
                        <input type="button" name="btn_all_RolePrinter" value="Printer" id="btn_all_RolePrinter" onclick="allIn(aRolePrinter)">
                        <input type="button" name="btn_all_RoleSharedPrinter" value="Shared Printer" id="btn_all_RoleSharedPrinter" onclick="allIn(aRoleSharedPrinter)">
                        <input type="button" name="btn_all_RoleOther" value="Other" id="btn_all_RoleOther" onclick="allIn(aRoleOther)">
                    </div>
                </div>
                <div style="clear:both"></div>
                <div id="middle_right" class="shadow corners">
                    <p id="results" class="centered"></p>
                </div>
                <div id="middle_right_alt" class="shadow corners">
                    <div id="comparator_btns">
                        <input type="button" name="back" value="Go Back" id="back" onclick="history.back()"><input type="button" name="btn_print_series" value="Print" id="btn_print_series" onclick="window.print()"><input type="button" name="btn_export_series" value="Export" id="btn_export_series" onclick="exportToXML()">
                    </div>
                </div>
                <div id="bottom_right" class="shadow corners">
                    <table id="results_table" class="stripped" border="0" cellspacing="0" cellpadding="0" summary="equipment carbon footprint">
                        <tr>
							<th id="chart_cat" class="chart_cat centered">Item</th>
                            <th class="qty">Qty</th>
                            <th class="dsc">Description</th>
                            <th class="standby">Standby</th>
                            <th class="totalkWh centered">kWh</th>
                            <th id="unit" class="amount centered">Kg of CO2</th>
                            <th class="perunit">Per Unit</th>
                        </tr>
                    </table>
                </div>
                <div id="totalfootprint" class="shadow corners">
                    <table id="ptotal" border="0" cellspacing="2" cellpadding="4"></table>
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
