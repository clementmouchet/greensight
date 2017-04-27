// THIS SCRIPT MAKES USE OF JQPLOT : http://www.jqplot.com/ A JQUERY PLOTTING AND CHARTING PLUGIN
// ARRAYS OF FOOTPRINTS
// by category
var aAllEquipment = [];
var aComputingEquipment = [];
var aWorkstation = [];
var aDesktop = [];
var aIntergated = [];
var aNotebook = [];
// by role
var aRoleDesktop = [];
var aRoleSharedPC = [];
var aRoleServer = [];
var aRoleLaptop = [];
var aRolePrinter = [];
var aRoleSharedPrinter = [];
var aRoleOther = [];

// TOTAL FOOTPRINTS
// by category
var iComputingEquipment = 0;
var iWorkstation = 0;
var iDesktop = 0;
var iIntergated = 0;
var iNotebook = 0;
var totalFootprint = 0;
// by role
var iRoleDesktop = 0;
var iRoleSharedPC = 0;
var iRoleServer = 0;
var iRoleLaptop = 0;
var iRolePrinter = 0;
var iRoleSharedPrinter = 0;
var iRoleOther = 0;

// QUANTITY OF EQUIPMENT
// by category
var iQtyComputingEquipment = 0;
var iQtyWorkstation = 0;
var iQtyDesktop = 0;
var iQtyIntergated = 0;
var iQtyNotebook = 0;
// by role
var iQtyRoleDesktop = 0;
var iQtyRoleSharedPC = 0;
var iQtyRoleServer = 0;
var iQtyRoleLaptop = 0;
var iQtyRolePrinter = 0;
var iQtyRoleSharedPrinter = 0;
var iQtyRoleOther = 0;

// CATEGORY LABELS (BASED ON AMEE PRODUCT TYPE)
var sComputingEquipment = 'Computing equipment';
var sWorkstation = 'Workstation';
var sDesktop = 'Desktop';
var sIntergated = 'Integrated Computers';
var sNotebook = 'Notebook/Tablet';

// ROLES LABELS
var sRoleDesktop = 'Desktop PC';
var sRoleSharedPC = "Shared PC";
var sRoleServer = "Server";
var sRoleLaptop = "Laptop";
var sRolePrinter = "Printer";
var sRoleSharedPrinter = "Shared Printer";
var sRoleOther = "Other";

var conversion_factor = 0;
var conversion_factor_unit = "N/A";


// ACTIONS ON LOAD
$(document).ready(function() {
    $(window).load(function() {

        $('#btn_all_computingequipment').attr("disabled", true);
        $('#btn_all_workstation').attr("disabled", true);
        $('#btn_all_desktop').attr("disabled", true);
        $('#btn_all_intergated').attr("disabled", true);
        $('#btn_all_notebook').attr("disabled", true);

		$('#btn_all_RoleDesktop').attr("disabled", true);
		$('#btn_all_RoleSharedPC').attr("disabled", true);
		$('#btn_all_RoleServer').attr("disabled", true);
		$('#btn_all_RoleLaptop').attr("disabled", true);
		$('#btn_all_RolePrinter').attr("disabled", true);
		$('#btn_all_RoleSharedPrinter').attr("disabled", true);
		$('#btn_all_RoleOther').attr("disabled", true);
		
        loadBasket();
        allEquipment();
    });
});

// LOAD & PARSE THE BASKET OBJECT, PREPARE STATS & DRAW THE TABLE
function loadBasket() {
    // LOAD FROM CACHE
    var oBasket = JSON.parse(localStorage.getItem('oBasket'));
    conversion_factor = oBasket.conversion_factor;
    conversion_factor_unit = oBasket.conversion_factor_unit;
    $("#unit").html(conversion_factor_unit);

    // APPEND DETAILS
    if ($.cookie('user')) {
        $('#audit_details').append('' +
        '<tr><td><b>Auditor:</b></td><td>' + unescape($.cookie('user').replace(/\+/g, " ")) + '</td>' +
        '<td><b>Organisation:</b></td><td>' + unescape($.cookie('org').replace(/\+/g, " ")) + '</td>' +
        '<td><b>Date:</b></td><td>' + $.format.date(new Date(oBasket.timestamp.toString()), "ddd, dd MMMM yyyy @ HH:mm") + '</td></tr>' +
        '<td><b>Conversion Factor:</b></td><td colspan="5">' + oConversion_factors[conversion_factor] + '</td>' +
        '</tr>');
    } else {
        $('#audit_details').append('<tr><td><b>Audit Date:</b></td><td>' + $.format.date(new Date(oBasket.timestamp.toString()), "ddd, dd MMMM yyyy @ HH:mm") + '</td></tr>');
    }

    // LOOP THROUGH THE SELECTION
    for (var i = 0; i < oBasket['aDeviceProfile'].length; i++) {
        var oDeviceProfile = oBasket['aDeviceProfile'][i];

        // PREPARE STATISTICS
        var footprint = parseFloat(parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby) * conversion_factor).toFixed(2);
        totalFootprint = (totalFootprint + parseFloat(footprint));
        // put footprints in arrays for the chart
        // for all equipment
        aAllEquipment.push(parseFloat(footprint));
        // by category
        switch (oDeviceProfile.values.type) {
        case 'Computing equipment':
            iComputingEquipment = iComputingEquipment + (parseFloat(footprint));
            iQtyComputingEquipment = iQtyComputingEquipment + (parseInt(oDeviceProfile.values.quantity));
            aComputingEquipment.push(parseFloat(footprint));
            $('#btn_all_computingequipment').attr("disabled", false);
            break;
        case 'Workstation':
            iWorkstation = iWorkstation + (parseFloat(footprint));
            iQtyWorkstation = iQtyWorkstation + (parseInt(oDeviceProfile.values.quantity));
            aWorkstation.push(parseFloat(footprint));
            $('#btn_all_workstation').attr("disabled", false);
            break;
        case 'Desktop':
            iDesktop = iDesktop + (parseFloat(footprint));
            iQtyDesktop = iQtyDesktop + (parseInt(oDeviceProfile.values.quantity));
            aDesktop.push(parseFloat(footprint));
            $('#btn_all_desktop').attr("disabled", false);
            break;
        case 'Integrated Computers':
            iIntergated = iIntergated + (parseFloat(footprint));
            iQtyIntergated = iQtyIntergated + (parseInt(oDeviceProfile.values.quantity));
            aIntergated.push(parseFloat(footprint));
            $('#btn_all_intergated').attr("disabled", false);
            break;
        case 'Notebook/Tablet':
            iNotebook = iNotebook + (parseFloat(footprint));
            iQtyNotebook = iQtyNotebook + (parseInt(oDeviceProfile.values.quantity));
            aNotebook.push(parseFloat(footprint));
            $('#btn_all_notebook').attr("disabled", false);
            break;
        };
        // by role
        switch (oDeviceProfile.values.role) {
        case 'Desktop PC':
            iRoleDesktop = iRoleDesktop + (parseFloat(footprint));
            iQtyRoleDesktop = iQtyRoleDesktop + (parseInt(oDeviceProfile.values.quantity));
            aRoleDesktop.push(parseFloat(footprint));
            $('#btn_all_RoleDesktop').attr("disabled", false);
            break;
        case 'Shared PC':
            iRoleSharedPC = iRoleSharedPC + (parseFloat(footprint));
            iQtyRoleSharedPC = iQtyRoleSharedPC + (parseInt(oDeviceProfile.values.quantity));
            aRoleSharedPC.push(parseFloat(footprint));
            $('#btn_all_RoleSharedPC').attr("disabled", false);
            break;
        case 'Server':
            iRoleServer = iRoleServer + (parseFloat(footprint));
            iQtyRoleServer = iQtyRoleServer + (parseInt(oDeviceProfile.values.quantity));
            aRoleServer.push(parseFloat(footprint));
            $('#btn_all_RoleServer').attr("disabled", false);
            break;
        case 'Laptop':
            iRoleLaptop = iRoleLaptop + (parseFloat(footprint));
            iQtyRoleLaptop = iQtyRoleLaptop + (parseInt(oDeviceProfile.values.quantity));
            aRoleLaptop.push(parseFloat(footprint));
            $('#btn_all_RoleLaptop').attr("disabled", false);
            break;
        case 'Printer':
            iRolePrinter = iRolePrinter + (parseFloat(footprint));
            iQtyRolePrinter = iQtyRolePrinter + (parseInt(oDeviceProfile.values.quantity));
            aRolePrinter.push(parseFloat(footprint));
            $('#btn_all_RolePrinter').attr("disabled", false);
            break;
        case 'Shared Printer':
            iRoleSharedPrinter = iRoleSharedPrinter + (parseFloat(footprint));
            iQtyRoleSharedPrinter = iQtyRoleSharedPrinter + (parseInt(oDeviceProfile.values.quantity));
            aRoleSharedPrinter.push(parseFloat(footprint));
            $('#btn_all_RoleSharedPrinter').attr("disabled", false);
            break;
        case 'Other':
            iRoleOther = iRoleOther + (parseFloat(footprint));
            iQtyRoleOther = iQtyRoleOther + (parseInt(oDeviceProfile.values.quantity));
            aRoleOther.push(parseFloat(footprint));
            $('#btn_all_RoleOther').attr("disabled", false);
            break;
		default:
			iRoleOther = iRoleOther + (parseFloat(footprint));
            iQtyRoleOther = iQtyRoleOther + (parseInt(oDeviceProfile.values.quantity));
            aRoleOther.push(parseFloat(footprint));
            $('#btn_all_RoleOther').attr("disabled", false);
            break;
        };

        // APPEND TO THE TABLE
        appendToTable(oDeviceProfile, i);
    };
    // APPLY STYLE TO THE TABLE
    styleTable();

    // TOTAL
    $('#head_ptotal').html("Total: <b>" + parseFloat(totalFootprint).toFixed(2) + " " + conversion_factor_unit + " / Year</b>");
    $('#ptotal').html("<tr><td>Total power-usage:</td><td><b>" + parseFloat(totalFootprint / conversion_factor).toFixed(2) + " kWh per Year</b></td><tr>" +
    "<tr><td>Total Carbon footprint:</td><td><b>" + parseFloat(totalFootprint).toFixed(2) + " " + conversion_factor_unit + " per Year</b></td><tr>");
}

// LOAD & PARSE THE BASKET OBJECT, PREPARE STATS & DRAW THE TABLE FOR A SELECTED CATEGORY or ALL
function loadCategory(category) {
    $('#results_table tr:not(:first)').remove();
    // LOAD FROM CACHE
    var oBasket = JSON.parse(localStorage.getItem('oBasket'));
    // LOOP THROUGH THE SELECTION
    if (category) {
        var j = 0;
        for (var i = 0; i < oBasket['aDeviceProfile'].length; i++) {
            var oDeviceProfile = oBasket['aDeviceProfile'][i];
            if (oDeviceProfile.values.type == category || oDeviceProfile.values.role == category) {
                appendToTable(oDeviceProfile, j);
                j++;
            }
        }
    } else {
        for (var i = 0; i < oBasket['aDeviceProfile'].length; i++) {
            var oDeviceProfile = oBasket['aDeviceProfile'][i];
            // APPEND TO THE TABLE
            appendToTable(oDeviceProfile, i);
        }
    }
    styleTable();
}

// BUILD TABLE
function appendToTable(oDeviceProfile, nBofDeviceProfile) {
    // APPEND TO THE TABLE
    // prepare the right output for the product source and standby
    if (oDeviceProfile.values.daysOnPerWeek) {
        var onStandby = '<a href="#time_used_info' + nBofDeviceProfile + '" class="td_source">custom</a>';
        var time_used = '<b>Time used: </b>' + oDeviceProfile.values.weeksOnPerYear + ' weeks per year, ' + oDeviceProfile.values.daysOnPerWeek + ' days a week<br>' +
        '<b>On:</b> ' + oDeviceProfile.values.onPerDay + ' hours per day, <b>Off:</b> ' + oDeviceProfile.values.offPerDay + '  hours per day, on <b>Standby:</b> ' + oDeviceProfile.values.standbyPerDay + ' hours per day';
        var standby_details = 'based on a custom time use.<br>' + time_used + '<br>';
    } else if (oDeviceProfile.values.weeksOnPerYear == 0 && oDeviceProfile.values.daysOnPerWeek == 0) {
		var onStandby = '<a href="#time_used_info' + nBofDeviceProfile + '" class="td_source">custom</a>';
		var time_used = '<b>Time used: </b>Never';
		var standby_details = 'based on a custom time use.<br>' + time_used + '<br>';
	} else {
        var onStandby = onStandbyOpts[oDeviceProfile.values.onStandby];
        var time_used = oDeviceProfile.values.weeksOnPerYear;
        var standby_details = 'based on ' + time_used + '<br>';
    }
    // style
    $("#chart_cat").addClass("chart_cat_s1");
    // append
    $("#results_table").append(
    '<tr id="row' + nBofDeviceProfile + '">' +
    '<td id="chart_cat_s' + 1 + '_' + nBofDeviceProfile + '" class="centered chart_cat_text_s' + 1 + '">' + (nBofDeviceProfile + 1) + '</td>' +
    '<td id="quantity' + nBofDeviceProfile + '" class="centered">' + oDeviceProfile.values.quantity + '<\/td>' +
    '<td id="description' + nBofDeviceProfile + '" class="td_dsc"><a href="#source' + nBofDeviceProfile + '" class="td_source">' + oDeviceProfile.description + '</a><span id="time_used_info' + nBofDeviceProfile + '" class="time_used_info"><b>Role:</b> ' + oDeviceProfile.values.role + ' <span class="location_info"><b>Location:</b> ' + oDeviceProfile.values.location + '</span><br>' + time_used + '</span><\/td>' +
    // hidden td for tooltips and print css
    '<td id="source' + nBofDeviceProfile + '" style="display:none">' +
    '<b>Description:</b> ' + oDeviceProfile.description + '<br>' +
    '<b>Role:</b> <span id="role' + nBofDeviceProfile + '">' + oDeviceProfile.values.role + '</span><br>' +
    '<b>Location:</b> <span id="location' + nBofDeviceProfile + '">' + oDeviceProfile.values.location + '</span><br>' +
    '<b>Average for one unit:</b> ' + parseFloat(oDeviceProfile.values.kWhPerYear).toFixed(2) + ' kWh per year ' +
    standby_details +
    '<b>Source:</b> ' + oDeviceProfile.values.source + '<br>' +
    '<b>Date:</b> ' + oDeviceProfile.values.modified +
    '<\/td>' +
    '<td id="standby' + nBofDeviceProfile + '" class="centered">' + onStandby + '<\/td>' +
    // hidden td for tooltips and print css
    '<td id="standby_details' + nBofDeviceProfile + '" style="display:none">' +
    standby_details +
    '<\/td>' +
    '<td id="totalkWh' + nBofDeviceProfile + '" class="centered">' + parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby).toFixed(2) + '<\/td>' +
    '<td id="totalamout' + nBofDeviceProfile + '" class="centered">' + parseFloat(parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby) * conversion_factor).toFixed(2) + '<\/td>' +
    '<td id="perUnit' + nBofDeviceProfile + '">' + oDeviceProfile.values.perUnit + '<\/td>' +
    '<\/tr>'
    );
};

// APPLY STYLE TO THE TABLE
function styleTable() {
    $(".stripped tr").mouseover(function() {
        $(this).addClass("over");
    }).mouseout(function() {
        $(this).removeClass("over");
    });
    $(".stripped tr:even").addClass("alt");
};

// BUILD CHART FOR ALL EQUIPMENT
function allEquipment() {
    loadCategory();
    // CLEAN UP
    $('#chartAll').empty().height(400);
    $('#chartAllIn').empty().height(0);
    $('#chartCategory').empty().height(0);
    $('#middle_right').fadeOut('');
    // BUILT CHART USING jqplot : http://www.jqplot.com/
    $(document).ready(function() {
        $.jqplot('chartAll', [aAllEquipment], {
            title: "Full Audit",
            stackSeries: false,
            captureRightClick: false,
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    barMargin: 5,
					barPadding: 5,
					barWidth:null,
                    highlightMouseDown: true
                },
                pointLabels: {
                    show: false
                }
            },
            axes: {
                xaxis: {
					label: "Item",
					labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
					pad: 0,
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickOptions: {
                        showMark: true,
                        showGridline: true,
                        show: true,
                    },
                    showTicks: true,
                    showTickMarks: true
                },
                yaxis: {
                    label: conversion_factor_unit + " per Year",
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                }
            },
			cursor:{ 
			        show: true,
			        zoom:true,
			        showTooltip:false,
			},
			highlighter: {
			        lineWidthAdjust: 20,   // pixels to add to the size line stroking the data point marker
			                              	// when showing highlight.  Only affects non filled data point markers.
			        sizeAdjust: 20,          // pixels to add to the size of filled markers when drawing highlight.
			        showTooltip: false,      // show a tooltip with data point values.
			},
            legend: {
                show: false
            }
        });
		$('.button-reset').click(function() { plot1.resetZoom() });
        // Bind a listener to the "jqplotDataClick" event.
        $('#chartAll').bind('jqplotDataClick',
        function(ev, seriesIndex, pointIndex, data) {
            $('#middle_right').fadeIn('');
            $('#results').html($('#quantity' + pointIndex).html() + " " + $('#description' + pointIndex).html() + ". <b>Role:</b> " + $('#role' + pointIndex).html() + ", <b>Location:</b> " + $('#location' + pointIndex).html() + ", on <b>Standby:</b> " + $('#standby' + pointIndex).html() + "<br>" + $('#totalkWh' + pointIndex).html() + "kWh/" + $('#perUnit' + pointIndex).html() + " or " + $('#totalamout' + pointIndex).html() + conversion_factor_unit + "/" + $('#perUnit' + pointIndex).html() + " using selected conversion factor (" + conversion_factor + " " + conversion_factor_unit + "  per kWh)");
        });
    });
};

// BUILD CHART FOR SELECT CATEGORY
function allIn(category) {
    // CLEAN UP
    $('#chartAll').empty().height(0);
    $('#chartAllIn').empty().height(400);
    $('#middle_right').fadeOut('');
    $('#chartCategory').empty().height(0);
    var title = '';
    switch (category) {
		// categories
    case aComputingEquipment:
        title = 'All Computing Equipment';
        loadCategory(sComputingEquipment);
        break;
    case aWorkstation:
        title = 'All Workstations';
        loadCategory(sWorkstation);
        break;
    case aDesktop:
        title = 'All Desktops';
        loadCategory(sDesktop);
        break;
    case aIntergated:
        title = 'All Intergated Computers';
        loadCategory(sIntergated);
        break;
    case aNotebook:
        title = 'All Notebooks & Tablets';
        loadCategory(sNotebook);
        break;

		// roles
    case aRoleDesktop:
        title = 'Role: Desktop PC';
        loadCategory(sRoleDesktop);
        break;
    case aRoleSharedPC:
        title = 'Role: Shared PC';
        loadCategory(sRoleSharedPC);
        break;
    case aRoleServer:
        title = 'Role: Server';
        loadCategory(sRoleServer);
        break;
    case aRoleLaptop:
        title = 'Role: Laptop';
        loadCategory(sRoleLaptop);
        break;
    case aRolePrinter:
        title = 'Role: Printer';
        loadCategory(sRolePrinter);
        break;
    case aRoleSharedPrinter:
        title = 'Role: Shared Printer';
        loadCategory(sRoleSharedPrinter);
        break;
    case aRoleOther:
        title = 'Role: Other';
        loadCategory(sRoleOther);
        break;
    };

    // BUILT CHART USING jqplot : http://www.jqplot.com/
    $(document).ready(function() {
        $.jqplot('chartAllIn', [category], {
            title: title,
            stackSeries: false,
            captureRightClick: true,
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    barMargin: 5,
					barPadding: 8,
					barWidth:null,
                    highlightMouseDown: true
                },
                pointLabels: {
                    show: true
                }
            },
            axes: {
                xaxis: {
					label: "Item",
					labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
					pad: 0,
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickOptions: {
                        showMark: true,
                        showGridline: true,
                        show: true,
                    },
                    showTicks: true,
                    showTickMarks: true
                },
                yaxis: {
                    label: conversion_factor_unit + " per Year",
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                }
            },
			cursor:{ 
			        show: true,
			        zoom:true,
			        showTooltip:false
			},
            legend: {
                show: false
            }
        });
		$('.button-reset').click(function() { plot1.resetZoom() });
        // Bind a listener to the "jqplotDataClick" event.
        $('#chartAllIn').bind('jqplotDataClick',
        function(ev, seriesIndex, pointIndex, data) {
            $('#middle_right').fadeIn('');
            $('#results').html($('#quantity' + pointIndex).html() + " " + $('#description' + pointIndex).html() + ". <b>Role:</b> " + $('#role' + pointIndex).html() + ", <b>Location:</b> " + $('#location' + pointIndex).html() + ", on <b>Standby:</b> " + $('#standby' + pointIndex).html() + "<br>" + $('#totalkWh' + pointIndex).html() + "kWh/" + $('#perUnit' + pointIndex).html() + " or " + $('#totalamout' + pointIndex).html() + conversion_factor_unit + "/" + $('#perUnit' + pointIndex).html() + " using selected conversion factor (" + conversion_factor + " " + conversion_factor_unit + " per kWh)");
        });
    });
};

// BUILD CHART OF ALL CATEGORIES
function byCategory() {
    $('#results_table tr:not(:first)').remove();
    // CLEAN UP
    $('#chartAllIn').empty().height(0);
    $('#chartAll').empty().height(0);
    $('#chartCategory').empty().height(400);
    $('#middle_right').fadeOut('');
    var series = [];
    var seriesLegend = [];
    var i = 0;
    if (iWorkstation != 0) {
        var aWorkstation = [iWorkstation];
        series.push(aWorkstation);
        seriesLegend.push({
            label: sWorkstation
        });
        appendCatToTable(i, iQtyWorkstation, sWorkstation, iWorkstation);
        i++;
    };
    if (iDesktop != 0) {
        var aDesktop = [iDesktop];
        series.push(aDesktop);
        seriesLegend.push({
            label: sDesktop
        });
        appendCatToTable(i, iQtyDesktop, sDesktop, iDesktop);
        i++;
    };
    if (iIntergated != 0) {
        var aIntergated = [iIntergated];
        series.push(aIntergated);
        seriesLegend.push({
            label: sIntergated
        });
        appendCatToTable(i, iQtyIntergated, sIntergated, iIntergated);
        i++;
    };
    if (iNotebook != 0) {
        var aNotebook = [iNotebook];
        series.push(aNotebook);
        seriesLegend.push({
            label: sNotebook
        });
        appendCatToTable(i, iQtyNotebook, sNotebook, iNotebook);
        i++;
    };
    if (iComputingEquipment != 0) {
        var aComputingEquipment = [iComputingEquipment];
        series.push(aComputingEquipment);
        seriesLegend.push({
            label: sComputingEquipment
        });
        appendCatToTable(i, iQtyComputingEquipment, sComputingEquipment, iComputingEquipment);
        i++;
    };
    styleTable();

    // BUILT CHART USING jqplot : http://www.jqplot.com/
    $(document).ready(function() {
        $.jqplot('chartCategory', series, {
            title: "All categories",
            stackSeries: false,
            captureRightClick: true,
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    barMargin: 30,
                    highlightMouseDown: true
                },
                pointLabels: {
                    show: true
                }
            },
            series: seriesLegend,
            axes: {
                xaxis: {
					label: "Item",
					labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
					pad: 0,
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickOptions: {
                        showMark: true,
                        showGridline: true,
                        show: true,
                    },
                    showTicks: true,
                    showTickMarks: true
                },
                yaxis: {
                    label: conversion_factor_unit + " per Year",
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer

                }
            },
			cursor:{ 
			        show: true,
			        zoom:true, 
			        showTooltip:false
			},
            legend: {
                show: true,
                placement: 'outside'
            },
        });
		$('.button-reset').click(function() { plot1.resetZoom() });
    });
};

// BUILD TABLE
function appendCatToTable(i, quantity, description, amount) {
    // APPEND TO THE TABLE
    $("#chart_cat").removeClass("chart_cat_s1");
    $("#results_table").append(
    '<tr id="row' + i + '">' +
    '<td id="quantity' + i + '" class="centered">' + quantity + '</td>' +
    '<td id="description' + i + '">' + description + '</td>' +
    '<td id="standby' + i + '" class="centered">N/A<\/td>' +
    '<td id="totalkWh' + i + '" class="centered">' + parseFloat(amount / conversion_factor).toFixed(2) + '<\/td>' +
    '<td id="totalamout' + i + '" class="centered">' + parseFloat(amount).toFixed(2) + '</td>' +
    '<td id="perUnit' + i + '">year</td>' +
    '<td id="chart_cat_s' + 1 + '_' + i + '" class="centered">' + 1 + '</td>' +
    '</tr>'
    );
};
