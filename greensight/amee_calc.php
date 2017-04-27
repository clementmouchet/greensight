<?php session_start();
$page = 'amee_calc'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>
            Greensight - Carbon Calculator
        </title>
        <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/amee_calc.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/jquery.msg.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <link rel="stylesheet" href="css/jquery.tooltip.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <!-- libraries -->
        <script src="javascripts/libs/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/ui/jquery-ui.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.selectboxes.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.selectboxes.pack.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.OnEnter.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.validate.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.msg.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.center.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.numeric.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.json2xml.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.dateFormat-1.0.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.tooltip.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.tooltip.pack.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/libs/jquery.ba-replacetext.min.js" type="text/javascript" charset="utf-8"></script>
        <!-- custom scripts -->
        <script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/greensight.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/calc_calculator.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/calc_tooltips.js" type="text/javascript" charset="utf-8"></script>
        <script type="text/javascript" charset="utf-8">
        $(document).ready(function() {
            // ACTIONS ON LOAD
            $(window).load(function() {
                // initiate the calculator, operate changes as soon as the DOM is ready.
                // see resetCalc() for details
                resetCalc(true);
                // if possible load the saved audits
                if ($.cookie('email')) {
                    loadListOfBaskets();
                };
                // load cache from local storage
                loadCache();
                // disbale buttons that should not be used now
                $('#saveBasket').attr("disabled", true);
                $('#clearBasket').attr("disabled", true);
                $('#export_xml').attr("disabled", true);
            });
            // APPLY NUMERIC RULE
            $(".qty, .weeks, .hours").numeric({
                decimal: false,
                negative: false
            });
            // VALIDATION RULE
            $("#time_use").validate({
                rules: {
                    weeksOnPerYear: {
                        required: true,
                        min: 0,
                        max: 52
                    },
                    daysOnPerWeek: {
                        required: true,
                        min: 0,
                        max: 7
                    },
                    standbyPerDay: {
                        required: true,
                        min: 0,
                        max: 24
                    },
                    offPerDay: {
                        required: true,
                        min: 0,
                        max: 24
                    },
                    onPerDay: {
                        required: true,
                        min: 0,
                        max: 24
                    }
                }
            });
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
						<div id="wrap_listOfBaskets">
							<table id="listOfBaskets" class="stripped calc" border="0" cellspacing="0" cellpadding="0" summary="list Of Baskets">
	                            <tr>
	                                <th class="centered" colspan="3">
	                                    My Saved Audits
	                                </th>
	                            </tr>
	                        </table>
						</div>
                        <?php
                        if (!isset($_COOKIE['email'])) {
	                        echo ('<p class="centered">Login or register<br>to access this function</p>');
                        } else {
							echo ('<input type="button" name="merge" value="Merge audits" id="merge" onclick="toMergerPage()" class="compare">');
						} ?>
                    </div>
                    <div id="middle_left" class="shadow corners">
                        <table id="reportBasket" class="stripped" border="0" cellspacing="0" cellpadding="0" summary="report Basket">
                            <tr>
                                <th class="centered">
                                    Report
                                </th>
                            </tr>
                        </table><input type="button" name="checkout" value="Show report" id="checkout" disabled="true" onclick="toResultsPage()" class="compare checkout">
                    </div>
                    <div id="bottom_left" class="shadow corners">
                        <table id="compareBaskets" class="stripped" border="0" cellspacing="0" cellpadding="0" summary="compare Baskets">
                            <tr>
                                <th class="centered">
                                    Compare My Saved Audits
                                </th>
                            </tr>
                        </table>
                        <?php
                        if (!isset($_COOKIE['email'])) {
	                        echo ('<p class="centered">Login or register<br>to access this function</p>');
                        } else {
	                        echo ('<input type="button" name="compare_two" value="Compare two audits" id="compare_two" class="compare" onclick=toComparePage(2)>');
                        } ?>
                        <div id="topbar">
                            <a href="#top" id="top" class="topbtn" name="top">Top&nbsp;^</a>
                        </div>
                    </div>
                </div>
                <div id="right" class="">
                    <div id="top_right" class="shadow corners">
                        <div class="corners" id="dsrc_details">
                            <p class="" id="data_src_details">
                                To start using the calculator, select a category.<br>
                                The data is sourced from <a href="http://www.amee.com/">AMEE</a> database.<br>
                                The source and conversion factor from your selections will be displayed here.
                            </p>
                        </div>
                        <div id="dcalclulator">
                            <select name="conversion_factors" id="conversion_factors" onchange="useFactor($(this).val())" size="1">
                                <option id="defaultconvfactor" class="default" value="">
                                    Select a conversion factor
                                </option>
                                <optgroup label="UK conversions factors">
                            </select>
                            <select name="sProfileCategory" id="sProfileCategory" class="sProfileCategory" onchange="pickSelect($('#sProfileCategory').val(), $('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1">
                                <option id="defaultdatacat" class="default" value="">
                                    Select a data category
                                </option>
                                <optgroup label="Energy Star - US appliances - for products comparison">
                                    <option value="/home/appliances/energystar/office/computers/desktopsAndIntegrated">
                                        Desktops & Integrated Computers
                                    </option>
                                    <option value="/home/appliances/energystar/office/computers/workstations">
                                        Workstations
                                    </option>
                                    <option value="/home/appliances/energystar/office/computers/notebooksAndTablets">
                                        Notebooks & Tablets
                                    </option>
                                <optgroup label="Market Transformation Programme / DEFRA - UK appliances - for audits">
                                    <option value="/home/appliances/computers/generic">
                                        Computing Equipment
                                    </option>
                                    <option value="/home/appliances/entertainment/generic">
                                        Entertainment generic
                                    </option>
                            </select>
                            <select name="productType" id="productType" class="productType" onchange="pickSelect($('#sProfileCategory').val(), $('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                                <option id="defaultcat" class="default" value="">
                                    Select a product type
                                </option>
                            </select>
                            <select name="brand" id="brand" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a brand
                                </option>
                            </select>
                            <select name="modelName" id="modelName" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a model
                                </option>
                            </select>
                            <select name="modelNumber" id="modelNumber" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a model Number
                                </option>
                            </select>
                            <select name="category" id="category" onchange="setStandby($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a category
                                </option>
                            </select>
                            <select name="device" id="device" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val(),$('#device').val(), $('#rating').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a Device
                                </option>
                            </select>
                            <select name="rating" id="rating" onchange="setStandby($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val(),$('#device').val(), $('#rating').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a Rating
                                </option>
                            </select>
                            <select name="role" id="role" onchange="setRole('weeks',$('#device').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select role
                                </option>
                            </select>
                            <select name="onStandby" id="onStandby" onchange="setQuantity()" size="1" style="display:none">
                                <option class="default" value="">
                                    Select standby time
                                </option>
                            </select>
                            <span id="span_location" style="display:none">
                                <label for="location">Location (optional):</label>
                                <input type="text" name="location" value="" id="location" class="location">
                            </span>
                            <div id="time_use_details">
                                <form id="time_use">
                                    <span id="span_weeksOnPerYear" style="display:none">
                                        <label for="weeksOnPerYear">Number of weeks used per year:</label>
                                        <input type="text" name="weeksOnPerYear" value="" id="weeksOnPerYear" class="weeks">
                                        <input type="button" value="Continue" id="weeksOnPerYear_btn" onclick="setTimeUse('days')">
                                    </span>
                                    <span id="span_daysOnPerWeek" style="display:none">
                                        <label for="daysOnPerWeek">Number of days used per week:</label>
                                        <input type="text" name="daysOnPerWeek" value="" id="daysOnPerWeek" class="days">
                                        <input type="button" value="Continue" id="daysOnPerWeek_btn" onclick="setTimeUse('on')">
                                    </span>
                                    <span id="span_onPerDay" style="display:none">
                                        <label for="onPerDay">Hours on per day:</label>
                                        <input type="text" name="onPerDay" value="" id="onPerDay" class="hours">
                                        <input type="button" value="Continue" id="onPerDay_btn" onclick="setTimeUse('off', $('#onPerDay').val(),$('#offPerDay').val(),$('#standbyPerDay').val())">
                                    </span>
                                    <span id="span_offPerDay" style="display:none">
                                        <label for="offPerDay">Hours off per day:</label>
                                        <input type="text" name="offPerDay" value="" id="offPerDay" class="hours">
                                        <input type="button" value="Continue" id="offPerDay_btn" onclick="setTimeUse('standby', $('#onPerDay').val(),$('#offPerDay').val(),$('#standbyPerDay').val())">
                                    </span>
                                    <span id="span_standbyPerDay" style="display:none">
                                        <label for="standbyPerDay">Hours on standby per day:</label>
                                        <input type="text" name="standbyPerDay" value="" id="standbyPerDay" class="hours">
                                        <input type="button" value="Continue" id="standbyPerDay_btn" onclick="setTimeUse('continue',$('#onPerDay').val(),$('#offPerDay').val(),$('#standbyPerDay').val())">
                                    </span>
                                </form>
                            </div>
                            <span id="span_quantity" style="display:none">
                                 <label for="quantity">Number of devices:</label>
                                 <input type="text" name="quantity" value="1" id="quantity" class="qty"><br>
                            </span>
                             <input type="button" name="reset" value="Reset" id="reset" onclick="resetCalc(true)">
                             <input type="button" name="submit" value="Submit" id="submit" onclick="getFooprint($('#sProfileCategory').val(),$('#productType').val(),$('#brand').val(),$('#modelName').val(), $('#modelNumber').val(),$('#category').val(),$('#device').val(), $('#rating').val(), $('#onStandby').val(), $('#role').val(), $('#location').val(), $('#weeksOnPerYear').val(), $('#daysOnPerWeek').val(), $('#onPerDay').val(), $('#offPerDay').val(), $('#standbyPerDay').val(), $('#quantity').val())">
                        </div>
                    </div>
                    <div style="clear:both"></div>
                    <div id="bottom_right" class="shadow corners">
                        <span id="results" class="centered"></span>
                        <table id="results_table" class="stripped corners" border="0" cellspacing="0" cellpadding="0" summary="equipment carbon footprint">
                            <tr>
                                <th class="qty">
                                    Qty
                                </th>
                                <th class="dsc">
                                    Description
                                </th>
                                <th class="standby">
                                    <a href="http://discover.amee.com/categories/Computers_generic/">Standby</a>
                                </th>
                                <th class="totalkWh">
                                    kWh
                                </th>
                                <th id="unit" class="amount">
                                    Kg CO2
                                </th>
                                <th class="perunit">
                                    Per Unit
                                </th>
                                <th class="edit">
                                    Edit
                                </th>
                            </tr>
                        </table><input type="button" name="checkout" value="Show Report" id="checkout" disabled="true" onclick="toResultsPage()" class="bottom_right_btns checkout">
                        <input type="button" name="clearBasket" value="Clear All" id="clearBasket" class="bottom_right_btns" onclick="clearBasket()">
                        <input type="button" name="export_xml" value="Export to XML" id="export_xml" class="bottom_right_btns" onclick="exportToXML()">
                        <?php
                        if (!empty($_COOKIE['superuser']) || !empty($_COOKIE['user'])) {
	                        echo ('<input type="button" name="saveBasket" value="Save" id="saveBasket" class="bottom_right_btns" onclick="saveBasket()">');
                        } ?>
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
