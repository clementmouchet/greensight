<?php session_start();
$page = 'amee_calc'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>
        Greensight - Carbon Calculator - Audit merger
    </title>
    <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8">
	<link rel="stylesheet" href="css/amee_calc_results_load.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/amee_calc_results_print.css" type="text/css" media="print" charset="utf-8">
    <link rel="stylesheet" href="css/jquery.jqplot.css" type="text/css">
    <link rel="stylesheet" href="css/jquery.msg.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="css/jquery.tooltip.css" type="text/css" media="screen" title="no title" charset="utf-8">
	<style type="text/css" media="screen">
		#bottom_right tr.alt td {
			border-top:2px solid #999;
		}
	</style>
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
    <script src="javascripts/libs/jquery.tooltip.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.tooltip.pack.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.dateFormat-1.0.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.json2xml.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.msg.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/libs/jquery.center.min.js" type="text/javascript" charset="utf-8"></script>
        
    <!-- custom scripts -->
    <script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/greensight.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/calc_report_load.js" type="text/javascript" charset="utf-8"></script>
    <script src="javascripts/calc_tooltips.js" type="text/javascript" charset="utf-8"></script>
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
                </div>
                <div style="clear:both"></div>
                <div id="middle_right" class="">
                    <div id="middle_right_left" class="shadow corners styled_table">
                        <table id="listOfBaskets" class="stripped merger" border="0" cellspacing="0" cellpadding="0" summary="saved baskets">
                            <tr>
                                <th class="lob_description">My Saved Audits</th>
                                <th class="btn_series"></th>
                            </tr>
                        </table>
                    </div>
                    <div id="middle_right_right" class="shadow corners styled_table">
                        <table id="listOfLoadedBaskets" class="stripped" border="0" cellspacing="0" cellpadding="0" summary="loaded baskets1">
                            <tr>
                                <th class="lb_description centered">My Loaded Audits</th>
                                <th class="lb_date centered">Date</th>
                            </tr>
                        </table>
                    </div>
                </div>
                <div style="clear:both"></div>
				<div id="middle_right_alt" class="shadow corners">
                    <div id="comparator_btns">
                        <input type="button" name="back" value="Go Back" id="back" onclick="history.back()"><input type="button" name="btn_editBasket" value="Edit" id="btn_editBasket" onclick="editBasket()"><input type="button" name="btn_saveBasket" value="Save" id="btn_saveBasket" onclick="saveBasket()"><input type="button" name="btn_toResultsPage" value="Report" id="btn_toResultsPage" onclick="toResultsPage()"><input type="button" name="btn_print_series" value="Print" id="btn_print_series" onclick="window.print()"><input type="button" name="btn_export_series" value="Export" id="btn_export_series" onclick="exportToXML()">
                    </div>
                </div>
                <div id="bottom_right" class="shadow corners styled_table">
                    <table id="results_table" class="stripped" border="0" cellspacing="0" cellpadding="0" summary="equipment carbon footprint">
                        <tr>
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
