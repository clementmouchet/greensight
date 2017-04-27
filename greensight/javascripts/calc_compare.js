// THIS SCRIPT MAKES USE OF JQPLOT : http://www.jqplot.com/ A JQUERY PLOTTING AND CHARTING PLUGIN

// DEFINE SERIES OBJECT
var oSeries1 = oSeries();
var oSeries2 = oSeries();

// ARRAY WITH ALL AVAILABLE OSERIES
var aSeries = [oSeries1, oSeries2];

var aAllEquipment;
var aComputingEquipment;
var aWorkstation;
var aDesktop;
var aIntergated;
var aNotebook;

// CATEGORY LABELS (BASED ON AMEE PRODUCT TYPE)
var sComputingEquipment = 'Computing equipment';
var sWorkstation = 'Workstation';
var sDesktop = 'Desktop';
var sIntergated = 'Integrated Computers';
var sNotebook = 'Notebook/Tablet';

// COUNTER
var nBofDeviceProfile = 0;

// FACTORS
var conversion_factor;
var conversion_factor_unit;
var chart_conversion_factor_unit;

// ACTIONS ON LOAD
$(document).ready(function() {
    $(window).load(function() {
        $('#btn_all_equipment').attr("disabled", true);
        $('#btn_by_category').attr("disabled", true);
        $('#btn_all_computingequipment').attr("disabled", true);
        $('#btn_all_workstation').attr("disabled", true);
        $('#btn_all_desktop').attr("disabled", true);
        $('#btn_all_intergated').attr("disabled", true);
        $('#btn_all_notebook').attr("disabled", true);
		$('#top_right').hide();
		$('#middle_right_alt').hide();
        loadListOfBaskets();
		$('#btn_export_series').attr("disabled", true);
    });
});

// OBJECT SERIES 'oSeries' CONSTRUCTOR
function oSeries() {
    var oSeries = {
        // ARRAYS OF FOOTPRINTS
        aAllEquipment: [],
        aComputingEquipment: [],
        aWorkstation: [],
        aDesktop: [],
        aIntergated: [],
        aNotebook: [],
        // TOTAL FOOTPRINTS
        iComputingEquipment: 0,
        iWorkstation: 0,
        iDesktop: 0,
        iIntergated: 0,
        iNotebook: 0,
        totalFootprint: 0,
        // QUANTITY OF EQUIPMENT BY CATEGORY
        iQtyComputingEquipment: 0,
        iQtyWorkstation: 0,
        iQtyDesktop: 0,
        iQtyIntergated: 0,
        iQtyNotebook: 0,
        // FLAG
        loaded: false,
		// factors
		conversion_factor: 0,
		conversion_factor_unit: "N/A"
    };
    return oSeries;
}

// RETURN THE OSERIES ASSOCIATED TO AN INTEGER
function getoSeries(series) {
    switch (series) {
    case 1:
        var selectedSeries = aSeries[0];
        break;
    case 2:
        var selectedSeries = aSeries[1];
        break;
    }
    return selectedSeries;
}

// RESET COMPARATOR (GRAPH, TABLES, INPUTS, AND OSERIES)
function resetComparator() {
    for (var i = aSeries.length - 1; i >= 0; i--) {
        aSeries[i] = oSeries();
    };
    cleanUpTables();
    cleanUpCharts();
	$('#results').empty();
	$('#audit_details').empty();
    $('#listOfLoadedBaskets tr:not(:first)').remove();
    $('.ptotal').empty();
    $('.series' + 1).attr("disabled", false);
    $('.series' + 2).attr("disabled", true);
    $('#btn_all_equipment').attr("disabled", true);
    $('#btn_by_category').attr("disabled", true);
    $('#btn_all_computingequipment').attr("disabled", true);
    $('#btn_all_workstation').attr("disabled", true);
    $('#btn_all_desktop').attr("disabled", true);
    $('#btn_all_intergated').attr("disabled", true);
    $('#btn_all_notebook').attr("disabled", true);
	$('#top_right').fadeOut();
	$('#middle_right_alt').fadeOut();
	$('#middle_right').fadeIn('');
    localStorage.clear();
}

// LOAD LIST OF BASKETS OF THE CURRENT USER
function loadListOfBaskets() {
    if ($.cookie('email')) {
        var user = $.cookie('email');
        $.getJSON('php_scripts/calculator/loadListOfBaskets.php', {
            user: user
        },
        function(listOfBaskets, textStatus) {
			if (listOfBaskets != null) {
				if (listOfBaskets.baskets.length > 1) {
					$.each(listOfBaskets.baskets,
		            function(i, basket) {
		                $("#listOfBaskets").append('<tr id="basket' + basket.id + '"><td id="basketId' + basket.id + '" style="display:none">' + basket.id + '</td><td id="basketDesc' + basket.id + '" class="lob_description">' + basket.description + '</td><td><input type="button" name="use_basket' + basket.id + '_in_s1" value="Set as Series 1" id="use_basket' + basket.id + '_in_s1" class="series1" onclick="loadSelectedBasket(' + basket.id + ',1)"></td><td><input type="button" name="use_basket' + basket.id + '_in_s2" value="Set as Series 2" id="use_basket' + basket.id + '_in_s2" class="series2" onclick="loadSelectedBasket(' + basket.id + ',2)"></td></tr>'
		                )
		            });
		            $('.series' + 2).attr("disabled", true);
		            styleTable();
				} else {
					$("#middle_right_left").append('<p class="centered" style="color:red">Not enough saved audits, please save at least 2 audits to use this feature</p>');
				}
			} else {
				$("#middle_right_left").append('<p class="centered" style="color:red">No saved audits, please save at least 2 audits to use this feature</p>');
			}
        });
    }
}

// LOAD SELECTED BASKET
function loadSelectedBasket(id, series) {
	$(document).ready(function() {
		var description = $('#basketDesc' + id).html();
	    $.getJSON('php_scripts/calculator/loadBasket.php', {
	        id: id
	    },
	    function(basket, textStatus) {
	        var oBasket = JSON.parse(basket);
	        var date = new Date(oBasket.timestamp.toString());
			
			if (series == 1) {
				var content = '<p class="centered">This will load the selection named:<br><br><b>"' + description + '"</b> as <b>Series ' + series + '</b><br><br>'+
				'('+oBasket.aDeviceProfile.length+' profiles)<br>'+
				'Unit: '+oBasket.conversion_factor_unit+'<br><br>'+
				'created on:<br>' + $.format.date(date, "ddd dd MMM yyyy, HH:mm") + '<br>'+
				'</p>' +
		        '<p class="btn-wrap centered">' +
		        '<input type="button" name="cancelLoadDb" value="Cancel" id="cancelLoadDb">&nbsp;' +
		        '<input type="button" name="loadDb" value=" Load "id="loadDb">' +
		        '</p>'
			} else if (series == 2) {
				if ((oBasket.conversion_factor_unit == getoSeries(1).conversion_factor_unit) && (oBasket.aDeviceProfile.length == getoSeries(1).aAllEquipment.length)) {
					chart_conversion_factor_unit = oBasket.conversion_factor_unit+ " per Year";
					var content = '<p class="centered">This will load the selection named:<br><br><b>"' + description + '"</b> as <b>Series ' + series + '</b><br><br>'+
					'('+oBasket.aDeviceProfile.length+' profile(s))<br>'+
					'Unit: '+oBasket.conversion_factor_unit+'<br><br>'+
					'created on:<br>' + $.format.date(date, "ddd dd MMM yyyy, HH:mm") + '<br>'+
					'</p>' +
			        '<p class="btn-wrap centered">' +
			        '<input type="button" name="cancelLoadDb" value="Cancel" id="cancelLoadDb">&nbsp;' +
			        '<input type="button" name="loadDb" value=" Load "id="loadDb">' +
			        '</p>'
				} else {
					if (oBasket.conversion_factor_unit != getoSeries(1).conversion_factor_unit) {
						chart_conversion_factor_unit = 'differ : see series unit';
						var content = '<p class="centered">This will load the selection named:<br><br><b>"' + description + '"</b> as <b>Series ' + series + '</b><br><br>'+
						'<b><span style="color: red">Units differ</span></b><br>'+
						'('+oBasket.aDeviceProfile.length+' profiles)<br>'+
						'<span style="color: red">Unit: '+oBasket.conversion_factor_unit+' (series 1 unit is '+getoSeries(1).conversion_factor_unit+')</span><br><br>'+
						'created on:<br>' + $.format.date(date, "ddd dd MMM yyyy, HH:mm") + '<br>'+
						'</p>' +
				        '<p class="btn-wrap centered">' +
				        '<input type="button" name="cancelLoadDb" value="Cancel" id="cancelLoadDb">&nbsp;' +
				        '<input type="button" name="loadDb" value=" Load anyway "id="loadDb">' +
				        '</p>'
					} else {
						var content = '<p class="centered">This will load the selection named:<br><br><b>"' + description + '"</b> as <b>Series ' + series + '</b><br><br>'+
						'<b><span style="color: red">Number of profiles differ</span></b><br>'+
						'<span style="color: red">'+oBasket.aDeviceProfile.length+' profile(s) (series 1 has '+getoSeries(1).aAllEquipment.length+' profile(s))</span><br>'+
						'Unit: '+oBasket.conversion_factor_unit+'<br><br>'+
						'created on:<br>' + $.format.date(date, "ddd dd MMM yyyy, HH:mm") + '<br>'+
						'</p>' +
				        '<p class="btn-wrap centered">' +
				        '<input type="button" name="cancelLoadDb" value="Cancel" id="cancelLoadDb">&nbsp;' +
				        '<input type="button" name="loadDb" value=" Load anyway "id="loadDb">' +
				        '</p>'
					}
				}
			};
		
			$.msg({
		        bgPath: 'images/',
		        autoUnblock: false,
		        clickUnblock: false,
		        content: content,
		        afterBlock: function() {
		            // store 'this' for other scope to use
		            var self = this;
		            $('#cancelLoadDb').bind('click',
		            function() {
		                self.unblock();
		            });
		            $('#loadDb').bind('click',
		            function() {
		                var user = $.cookie('email');
		                $('#results_table_s' + series + ' tr:not(:first)').remove();
		                $('#results_table tr:not(:first)').remove();
		                $.getJSON('php_scripts/calculator/loadBasket.php', {
		                    id: id
		                },
		                function(oBasket, textStatus) {
		                    // console.log("loadBasket.php returned: ", JSON.parse(oBasket));
		                    localStorage.setItem('oBasket' + series, oBasket);
		                    // console.log("oBasket saved as: ", 'oBasket' + series, ' > ', JSON.parse(localStorage.getItem('oBasket' + series)));
		                    try {
		                        loadBasket(series);
		                        $("#listOfLoadedBaskets").append(
		                        '<tr id="lb_row' + series + '">' +
		                        '<td id="lb_description' + series + '" class="lb_description">' + description + '</td>' +
		                        '<td id="lb_date' + series + '" class="lb_date">' + $.format.date(date, "dd/MM/yyyy HH:mm") + '</td>' +
		                        '<td id="lb_series' + series + '" class="lb_series">' + series + '</td>' +
		                        '</tr>');
		                        // APPLY STYLE TO THE TABLE
		                        styleTable();
								$("#title_s"+series).html('Series '+ series + ': \"'+ description+ '\" saved ' + $.format.date(date, "ddd dd/MM/yyyy HH:mm"));

		                    } catch(err) {
		                        self.replace('Failed to load from the database');
		                        localStorage.clear();
		                    }
		                });
		                self.unblock();
		            });
		        }
		    });
	    });
	});
};

// LOAD & PARSE THE BASKET OBJECT, PREPARE STATS & DRAW THE TABLE
function loadBasket(series) {
	$(document).ready(function() {
		$('.series' + series).attr("disabled", true);
	    $('.series' + (series + 1)).attr("disabled", false);
	    var selectedSeries = getoSeries(series);
	    // console.log("Series " + series + " loaded already?: ", selectedSeries.loaded);
	    // console.log("Series " + series + " = ", selectedSeries);
	    // LOAD FROM CACHE
	    var oBasket = JSON.parse(localStorage.getItem('oBasket' + series));
		// save converstion factor details
		selectedSeries.conversion_factor = oBasket.conversion_factor;		
		selectedSeries.conversion_factor_unit = oBasket.conversion_factor_unit;
		$("#unit_s"+series).html(selectedSeries.conversion_factor_unit);
		
		// APPEND DETAILS
		if ($.cookie('user') && series == 1) {
			$('#audit_details').append(''+
			'<tr><td><b>Auditor:</b></td><td>'+ unescape($.cookie('user').replace(/\+/g, " ")) +'</td>'+
				'<td><b>Organisation:</b></td><td>'+ unescape($.cookie('org').replace(/\+/g, " ")) +'</td>'+
			'</tr>');
		}
		
	    // console.log('oBasket' + series, ' loaded , is now : var oBasket =', oBasket);
	    // LOOP THROUGH THE SELECTION
	    for (var i = 0; i < oBasket['aDeviceProfile'].length; i++) {
	        var oDeviceProfile = oBasket['aDeviceProfile'][i];

	        // PREPARE STATISTICS
	        var footprint = parseFloat(parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby) * selectedSeries.conversion_factor).toFixed(2);
			var kWh = parseFloat(parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby) * selectedSeries.conversion_factor).toFixed(2);
	        selectedSeries.totalFootprint = (selectedSeries.totalFootprint + parseFloat(footprint));
	        // put footprints in arrays for the chart
	        // for all equipment
	        selectedSeries.aAllEquipment.push(parseInt(footprint));
	        // by category
	        switch (oDeviceProfile.values.type) {
	        case 'Computing equipment':
	            selectedSeries.iComputingEquipment = selectedSeries.iComputingEquipment + (parseFloat(footprint));
	            selectedSeries.iQtyComputingEquipment = selectedSeries.iQtyComputingEquipment + (parseInt(oDeviceProfile.values.quantity));
	            selectedSeries.aComputingEquipment.push(parseFloat(footprint));
	            if (series == aSeries.length) {
	                $('#btn_all_computingequipment').attr("disabled", false);
	            };
	            break;
	        case 'Workstation':
	            selectedSeries.iWorkstation = selectedSeries.iWorkstation + (parseFloat(footprint));
	            selectedSeries.iQtyWorkstation = selectedSeries.iQtyWorkstation + (parseInt(oDeviceProfile.values.quantity));
	            selectedSeries.aWorkstation.push(parseFloat(footprint));
	            if (series == aSeries.length) {
	                $('#btn_all_workstation').attr("disabled", false);
	            };
	            break;
	        case 'Desktop':
	            selectedSeries.iDesktop = selectedSeries.iDesktop + (parseFloat(footprint));
	            selectedSeries.iQtyDesktop = selectedSeries.iQtyDesktop + (parseInt(oDeviceProfile.values.quantity));
	            selectedSeries.aDesktop.push(parseFloat(footprint));
	            if (series == aSeries.length) {
	                $('#btn_all_desktop').attr("disabled", false);
	            };
	            break;
	        case 'Integrated Computers':
	            selectedSeries.iIntergated = selectedSeries.iIntergated + (parseFloat(footprint));
	            selectedSeries.iQtyIntergated = selectedSeries.iQtyIntergated + (parseInt(oDeviceProfile.values.quantity));
	            selectedSeries.aIntergated.push(parseFloat(footprint));
	            if (series == aSeries.length) {
	                $('#btn_all_intergated').attr("disabled", false);
	            };
	            break;
	        case 'Notebook/Tablet':
	            selectedSeries.iNotebook = selectedSeries.iNotebook + (parseFloat(footprint));
	            selectedSeries.iQtyNotebook = selectedSeries.iQtyNotebook + (parseInt(oDeviceProfile.values.quantity));
	            selectedSeries.aNotebook.push(parseFloat(footprint));
	            if (series == aSeries.length) {
	                $('#btn_all_notebook').attr("disabled", false);
	                break;
	            };
	        };
	        // APPEND TO THE TABLE
	        appendToTable(oDeviceProfile, i, series);
	    };
	    // MARK SERIES AS LOADED
	    selectedSeries.loaded = true;
	    var nbLoaded = 0;
	    for (var i = aSeries.length - 1; i >= 0; i--) {
	        if (aSeries[i].loaded) {
	            nbLoaded++
	        };
	    };
	    if (nbLoaded == aSeries.length) {
			$('#middle_right').fadeOut();
	        $('#top_right').fadeIn('');
			$('#middle_right_alt').fadeIn();
	        $('#btn_by_category').attr("disabled", false);
	        $('#btn_all_equipment').attr("disabled", false);
			allEquipment();
	    }
	    // TOTAL
	    $('#ptotal_s' + series).html("The total power-usage of this selection is <b>" + parseFloat(selectedSeries.totalFootprint / selectedSeries.conversion_factor).toFixed(2) + " kWh per Year</b><br><br>"+
	"The total carbon footprint for this selection is <b>" + parseFloat(selectedSeries.totalFootprint).toFixed(2) + " "+ selectedSeries.conversion_factor_unit +" per Year</b><br><br>"+
	"<span style='font-size: 9pt;'><i>Conversion Factor : " + oConversion_factors[selectedSeries.conversion_factor]+"<span>");
	});
};

// LOAD & PARSE THE BASKET OBJECT, PREPARE STATS & DRAW THE TABLE FOR A SELECTED CATEGORY or ALL
function loadCategory(category) {
	$(document).ready(function() {
	    // CLEAN UP
	    cleanUpTables();
	    cleanUpCharts();
	    // LOAD FROM CACHE
	    var series = 1;
	    var selectedSeries = getoSeries(series);
	    for (var i = 0; i < aSeries.length; i++) {
	        var oBasket = JSON.parse(localStorage.getItem('oBasket' + series));
	        // LOOP THROUGH THE SELECTION
	        if (category) {
	            var j = 0;
	            for (var k = 0; k < oBasket['aDeviceProfile'].length; k++) {
	                var oDeviceProfile = oBasket['aDeviceProfile'][k];
	                if (oDeviceProfile.values.type == category) {
	                    appendToTable(oDeviceProfile, j, series);
	                    j++;
	                }
	            };
	            series++;
	        } else {
	            for (var k = 0; k < oBasket['aDeviceProfile'].length; k++) {
	                var oDeviceProfile = oBasket['aDeviceProfile'][k];
	                // APPEND TO THE TABLE
	                appendToTable(oDeviceProfile, k, series);
	            };
	            series++;
	        }
	        styleTable();
	    };
	});
}

// BUILD TABLE
function appendToTable(oDeviceProfile, i, series) {
    // APPEND TO THE TABLE
    // prepare the right output for the product source and standby
    if (oDeviceProfile.values.daysOnPerWeek) {
        var onStandby = '<a href="#time_used_info_s' + series + '_' + i + '" class="td_source">custom</a>';
        var time_used = '<b>Time used : </b>' + oDeviceProfile.values.weeksOnPerYear + ' weeks per year, ' + oDeviceProfile.values.daysOnPerWeek + ' days a week<br>' +
        '<b>On:</b> ' + oDeviceProfile.values.onPerDay + ' hours per day, <b>Off:</b> ' + oDeviceProfile.values.offPerDay + '  hours per day, on <b>Standby:</b> ' + oDeviceProfile.values.standbyPerDay + ' hours per day';
        var standby_details = 'based on a custom time use.<br>' + time_used + '<br>';
    } else if (oDeviceProfile.values.weeksOnPerYear == 0 && oDeviceProfile.values.daysOnPerWeek == 0) {
        var onStandby = '<a href="#time_used_info_s' + series + '_' + i + '" class="td_source">custom</a>';
        var time_used = '<b>Time used: </b>Never';
        var standby_details = 'based on a custom time use.<br>' + time_used + '<br>';
    } else {
        var onStandby = onStandbyOpts[oDeviceProfile.values.onStandby];
        var time_used = oDeviceProfile.values.weeksOnPerYear;
        var standby_details = 'based on ' + time_used + '<br>';
    }

    $("#results_table_s" + series).append(
    '<tr id="row_s' + series + '_' + i + '">' +
    '<td id="chart_cat_s' + series + '_' + i + '" class="centered chart_cat_text_s' + series + '">' + (i + 1) + '</td>' +
    '<td id="quantity_s' + series + '_' + i + '" class="centered">' + oDeviceProfile.values.quantity + '</td>' +
    '<td id="description_s' + series + '_' + i + '"><a href="#source_s' + series + '_' + i + '">' + oDeviceProfile.description + '</a><span id="time_used_info_s' + series + '_' + i + '" class="time_used_info"><b>Role:</b> ' + oDeviceProfile.values.role + ' <span class="location_info"><b>Location:</b> ' + oDeviceProfile.values.location + '</span><br>' + time_used + '</span></td>' +
    // hidden td for tooltips and print css
    '<td id="source_s' + series + '_' + i + '" style="display:none">' +
    '<b>Role:</b> <span id="role_s' + series + '_' + i + '">' + oDeviceProfile.values.role + '</span><br>' +
    '<b>Location:</b> <span id="location_s' + series + '_' + i + '">' + oDeviceProfile.values.location + '</span><br>' +
    '<b>Average for one unit:</b> ' + parseFloat(oDeviceProfile.values.kWhPerYear).toFixed(2) + ' kWh per year ' +
    standby_details +
    '<b>Source:</b> ' + oDeviceProfile.values.source + '<br>' +
    '<b>Date:</b> ' + oDeviceProfile.values.modified +
    '<\/td>' +
    '<td id="standby_s' + series + '_' + i + '" class="centered">' + onStandby + '</td>' +
    // hidden td for tooltips and print css
    '<td id="standby_details' + nBofDeviceProfile + '" style="display:none">' +
    standby_details +
    '<\/td>' +
    '<td id="totalkWh_s' + series + '_' + i + '" class="centered">' + parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby).toFixed(2) + '<\/td>' +
    '<td id="totalamout_s' + series + '_' + i + '" class="centered">' + parseFloat(parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby).toFixed(2) * getoSeries(series).conversion_factor).toFixed(2) + '</td>' +
    '<td id="perUnit_s' + series + '_' + i + '">' + oDeviceProfile.values.perUnit + '</td>' +
    '</tr>'
    );
};

// APPLY STYLE TO THE TABLE
function styleTable() {

    cleanUpCharts();
    $(".stripped tr").mouseover(function() {
        $(this).addClass("over");
    }).mouseout(function() {
        $(this).removeClass("over");
    });
    $(".stripped tr:even").addClass("alt");
};

// CLEAN UP TABLES
function cleanUpTables() {
    // CLEAN UP
    for (var i = 0; i < aSeries.length + 1; i++) {
        $('#results_table_s' + i + ' tr:not(:first)').remove();
    };
}

// CLEAN UP CHARTS
function cleanUpCharts() {
    // CLEAN UP
    $('#chartAll').empty().height(0);
    $('#chartAllIn').empty().height(0);
    $('#chartCategory').empty().height(0);
}

// BUILD CHART FOR ALL EQUIPMENT
function allEquipment() {
	$(document).ready(function() {
		loadCategory();
	    // CLEAN UP
	    cleanUpCharts();
		$('#results').empty();

	    // PREPARE DATA
	    var data = [];
	    for (var i = 0; i < aSeries.length; i++) {
			var series = i+1;
	        data.push(getoSeries(series).aAllEquipment);
	    };

	    // console.log('data = ', data);
	    // BUILT CHART USING jqplot : http://www.jqplot.com/
	    $(document).ready(function() {
	        $.jqplot('chartAll', data, {
	            title: "Comparison between Audits",
	            stackSeries: false,
	            captureRightClick: true,
	            seriesDefaults: {
	                renderer: $.jqplot.BarRenderer,
	                rendererOptions: {
	                    barMargin: 10,
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
	                    showTicks: false,
	                    showTickMarks: false
	                },
	                yaxis: {
	                    label: chart_conversion_factor_unit,
	                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer
	                }
	            },
	            legend: {
	                show: true
	            }
	        });
	        // Bind a listener to the "jqplotDataClick" event.
	        $('#chartAll').bind('jqplotDataClick',
	        function(ev, seriesIndex, pointIndex, data) {
				var series = seriesIndex+1;
				// console.log("Series " + series + " = ", getoSeries(series));
				$('#results').html("" + $('#quantity_s'+ series + '_' + pointIndex).html() + " " + $('#description_s' + series + '_' + pointIndex).html() + ". <b>Role:</b> " + $('#role_s' + series + '_' + pointIndex).html() + ", <b>Location:</b> " + $('#location_s' + series + '_' + pointIndex).html() + ", on <b>Standby:</b> "+$('#standby_s' + series + '_' + pointIndex).html()+"<br>" + $('#totalkWh_s' + series + '_' + pointIndex).html() + "kWh/" + $('#perUnit_s' + series + '_' + pointIndex).html() + " or " +$('#totalamout_s' + series + '_' + pointIndex).html() + getoSeries(series).conversion_factor_unit + "/" + $('#perUnit_s' + series + '_' + pointIndex).html() + " using selected conversion factor (" + getoSeries(series).conversion_factor + " " + getoSeries(series).conversion_factor_unit + "  per kWh)");
	        });
	    });
	});
};

// BUILD CHART FOR SELECT CATEGORY
function allIn(category) {
	
    // CLEAN UP
    cleanUpTables();
    cleanUpCharts();
	$('#results').empty();

    var title = '';
    var aSeriesData = [];

	// PREPARE DATA
    for (var i = 0; i < aSeries.length; i++) {
        series = (i + 1);
        selectedSeries = getoSeries(series);
        switch (category) {
        case 'aComputingEquipment':
            title = 'All Computing Equipment';
            aSeriesData.push(selectedSeries.aComputingEquipment);
            loadCategory(sComputingEquipment);
            break;
        case 'aWorkstation':
            title = 'All Workstations';
            aSeriesData.push(selectedSeries.aWorkstation);
            loadCategory(sWorkstation);
            break;
        case 'aDesktop':
            title = 'All Desktops';
            aSeriesData.push(selectedSeries.aDesktop);
            loadCategory(sDesktop);
            break;
        case 'aIntergated':
            title = 'All Intergated Computers';
            aSeriesData.push(selectedSeries.aIntergated);
            loadCategory(sIntergated);
            break;
        case 'aNotebook':
            aSeriesData.push(selectedSeries.aNotebook);
            title = 'All Notebooks & Tablets';
            loadCategory(sNotebook);
            break;
        };
    };

    // BUILT CHART USING jqplot : http://www.jqplot.com/
    $(document).ready(function() {
        $.jqplot('chartAllIn', aSeriesData, {
            title: title,
            stackSeries: false,
            captureRightClick: true,
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    barMargin: 10,
                    highlightMouseDown: true
                },
                pointLabels: {
                    show: true
                }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickOptions: {
                        showMark: true,
                        showGridline: true,
                        show: true,
                    },
                    showTicks: false,
                    showTickMarks: false,
					label: "Item",
					labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
					pad: 0
                },
                yaxis: {
                    label: chart_conversion_factor_unit,
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                }
            },
            legend: {
                show: true
            }
        });
        // Bind a listener to the "jqplotDataClick" event.
        $('#chartAllIn').bind('jqplotDataClick',
        function(ev, seriesIndex, pointIndex, data) {
			var series = seriesIndex+1;
            $('#results').html("" + $('#quantity_s'+ series + '_' + pointIndex).html() + " " + $('#description_s' + series + '_' + pointIndex).html() + ". <b>Role:</b> " + $('#role_s' + series + '_' + pointIndex).html() + ", <b>Location:</b> " + $('#location_s' + series + '_' + pointIndex).html() + ", on <b>Standby:</b> "+$('#standby_s' + series + '_' + pointIndex).html()+"<br>" + $('#totalkWh_s' + series + '_' + pointIndex).html() + "kWh/" + $('#perUnit_s' + series + '_' + pointIndex).html() + " or " +$('#totalamout_s' + series + '_' + pointIndex).html() + getoSeries(series).conversion_factor_unit + "/" + $('#perUnit_s' + series + '_' + pointIndex).html() + " using selected conversion factor (" + getoSeries(series).conversion_factor + " " + getoSeries(series).conversion_factor_unit + "  per kWh)");
        });
    });
};

// BUILD CHART OF ALL CATEGORIES
function byCategory() {

    // CLEAN UP
    cleanUpTables();
    cleanUpCharts();
	$('#results').empty();

    var series;
    var selectedSeries = [];
    var series1data = [];
    var series2data = [];
    var aSeriesData = [series1data, series2data];
    var ticks = [];

	// PREPARE DATA
    for (var i = 0; i < aSeries.length; i++) {
		var row = 0;
		series = (i + 1);
        selectedSeries = getoSeries(series);
        if (selectedSeries.aWorkstation.length > 0) {
            aSeriesData[i].push(selectedSeries.iWorkstation);
            appendCatToTable(series, selectedSeries.iQtyWorkstation, sWorkstation, selectedSeries.iWorkstation, row);
            if ($.inArray(sWorkstation, ticks) == -1) {
                ticks.push(sWorkstation);
            };
            row++;
        };
        if (selectedSeries.aDesktop.length > 0) {
            aSeriesData[i].push(selectedSeries.iDesktop);
            appendCatToTable(series, selectedSeries.iQtyDesktop, sDesktop, selectedSeries.iDesktop, row);
            if ($.inArray(sDesktop, ticks) == -1) {
                ticks.push(sDesktop);
            }
            row++;
        };
        if (selectedSeries.aIntergated.length > 0) {
            aSeriesData[i].push(selectedSeries.iIntergated);
            appendCatToTable(series, selectedSeries.iQtyIntergated, sIntergated, selectedSeries.iIntergated, row);
            if ($.inArray(sIntergated, ticks) == -1) {
                ticks.push(sIntergated);
            };
            row++;
        };
        if (selectedSeries.aNotebook.length > 0) {
            aSeriesData[i].push(selectedSeries.iNotebook);
            appendCatToTable(series, selectedSeries.iQtyNotebook, sNotebook, selectedSeries.iNotebook, row);
            if ($.inArray(sNotebook, ticks) == -1) {
                ticks.push(sNotebook);
            };
            row++;
        };
        if (selectedSeries.aComputingEquipment.length > 0) {
            aSeriesData[i].push(selectedSeries.iComputingEquipment);
            appendCatToTable(series, selectedSeries.iQtyComputingEquipment, sComputingEquipment, selectedSeries.iComputingEquipment, row);
            if ($.inArray(sComputingEquipment, ticks) == -1) {
                ticks.push(sComputingEquipment);
            };
            row++;
        };
        styleTable();
    };

    // BUILT CHART USING jqplot : http://www.jqplot.com/
    $(document).ready(function() {
        $.jqplot('chartCategory', aSeriesData, {
            title: "Comparison between Audits for each categories",
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
            axes: {
                xaxis: {
                    ticks: ticks,
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
                    label: chart_conversion_factor_unit,
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                }
            },
            legend: {
                show: true
            },
        });
		// Bind a listener to the "jqplotDataClick" event.
        $('#chartCategory').bind('jqplotDataClick',
        function(ev, seriesIndex, pointIndex, data) {
			var series = seriesIndex+1;
            $('#results').html("" +$('#quantity_s'+ series + '_' + pointIndex).html() + " units in the category \"" + $('#description_s' + series + '_' + pointIndex).html() + "\", accountable for " + $('#totalkWh_s' + series + '_' + pointIndex).html() + "kWh/" + $('#perUnit_s' + series + '_' + pointIndex).html() + " or<br>" +$('#totalamout_s' + series + '_' + pointIndex).html() + getoSeries(series).conversion_factor_unit + "/" + $('#perUnit_s' + series + '_' + pointIndex).html() + " using selected conversion factor (" + getoSeries(series).conversion_factor + " " + getoSeries(series).conversion_factor_unit + "  per kWh)");
        });
    });
};

// BUILD TABLE
function appendCatToTable(series, quantity, description, amount, i) {
    // APPEND TO THE TABLE
    $("#results_table_s" + series).append(
    '<tr id="row_s' + series + '_' + i + '">' +
    '<td id="quantity_s' + series + '_' + i + '" class="centered">' + quantity + '</td>' +
    '<td id="description_s'+ series + '_' + i + '">' + description + '</td>' +
	'<td id="standby_s' + series + '_' + i + '">N/A</td>' +
	'<td id="totalkWh_s' + series + '_' + i + '" class="centered">' + parseFloat(amount / getoSeries(series).conversion_factor).toFixed(2) + '<\/td>' +
    '<td id="totalamout_s' + series + '_' + i + '" class="centered">' + parseFloat(amount).toFixed(2) + '</td>' +
    '<td id="perUnit_s'+ series + '_' + i + '">year</td>' +
	'<td id="chart_cat_s' + series + '_' + i + '" class="centered chart_cat_text_s' + series+'">' + (i+1) + '</td>' +
    '</tr>'
    );
};