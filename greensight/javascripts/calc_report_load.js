// THIS SCRIPT MAKES USE OF JQPLOT : http://www.jqplot.com/ A JQUERY PLOTTING AND CHARTING PLUGIN

var totalFootprint = 0;
var totalkWhPerYear = 0;

var subTotalFootprint = 0;
var subTotalkWhPerYear = 0;

var conversion_factor = 0;
var conversion_factor_unit = "N/A";

var nbOfRow = 0;

// ACTIONS ON LOAD
$(document).ready(function() {
    $(window).load(function() {
		$('#top_right').hide();		
		$('#btn_editBasket').attr("disabled", true);        
		$('#btn_saveBasket').attr("disabled", true);        
		$('#btn_toResultsPage').attr("disabled", true);        
		$('#btn_print_series').attr("disabled", true);        
		$('#btn_export_series').attr("disabled", true);        
		
		localStorage.clear();
        loadListOfBaskets();
    });
});

// LOAD LIST OF BASKETS OF THE CURRENT USER
function loadListOfBaskets() {
    if ($.cookie('email')) {
        var user = $.cookie('email');
        $.getJSON('php_scripts/calculator/loadListOfBaskets.php', {
            user: user
        },
        function(listOfBaskets, textStatus) {
			if (listOfBaskets != null) {
				if (listOfBaskets.baskets.length > 0) {
					$.each(listOfBaskets.baskets,
		            function(i, basket) {
		                $("#listOfBaskets").append('<tr id="basket' + basket.id + '">'+
		'<td id="basketId' + basket.id + '" style="display:none">' + basket.id + '</td>'+
		'<td id="basketDesc' + basket.id + '" class="lob_description">' + basket.description + '</td>'+
		'<td><input type="button" name="add_basket' + basket.id + '" value="Add this audit" id="add_basket' + basket.id + '" onclick="loadSelectedBasket(' + basket.id +')"></td>'+
		'</tr>'
		                )
		            });
		            styleTable();
				} else {
					$("#middle_right_left").append('<p class="centered" style="color:red">Not enough saved audits, please save at least 1 audit to use this feature</p>');
				}
			} else {
				$("#middle_right_left").append('<p class="centered" style="color:red">No saved audit, please save at least 1 audit to use this feature</p>');
			}
        });
    }
}

// LOAD SELECTED BASKET
function loadSelectedBasket(id) {
	$(document).ready(function() {
		var description = $('#basketDesc' + id).html();
	    $.getJSON('php_scripts/calculator/loadBasket.php', {
	        id: id
	    },
	    function(basket, textStatus) {
	        var oBasket = JSON.parse(basket);
	        var date = new Date(oBasket.timestamp.toString());
				var content = '<p class="centered">This add the audit named:<br><br><b>"' + description + '"</b><br><br>'+
				'('+oBasket.aDeviceProfile.length+' profiles)<br>'+
				'Unit: '+oBasket.conversion_factor_unit+'<br><br>'+
				'created on:<br>' + $.format.date(date, "ddd dd MMM yyyy, HH:mm") + '<br>'+
				'</p>' +
		        '<p class="btn-wrap centered">' +
		        '<input type="button" name="cancelLoadDb" value="Cancel" id="cancelLoadDb">&nbsp;' +
		        '<input type="button" name="loadDb" value=" Load "id="loadDb">' +
		        '</p>'
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
						$('#add_basket'+id).attr("disabled", true).val('Audit added');
		                $.getJSON('php_scripts/calculator/loadBasket.php', {
		                    id: id
		                },
		                function(oBasket, textStatus) {
		                    // console.log("loadBasket.php returned: ", JSON.parse(oBasket));
		                    localStorage.setItem('oBasket', oBasket);
		                    // console.log("oBasket saved as: ", 'oBasket' + series, ' > ', JSON.parse(localStorage.getItem('oBasket' + series)));
		                    try {
								$("#results_table").append(
							    '<tr class="alt">' +
							    '<td><\/td>' +
							    '<td id="audit_description' + id + '" class="td_dsc"><b>' + description + '</b><\/td>' +
							    '<td><\/td>' +							   
							    '<td id="totalkWh_'+ id + '" class="centered"><\/td>' +
							    '<td id="totalamout_'+ id + '" class="centered"><\/td>' +
							    '<td id="perUnit_'+ id + '"></td>' +
							    '<\/tr>'
							    );
		                        loadBasket(id);
		                        $("#listOfLoadedBaskets").append(
		                        '<tr id="lb_row' + id + '">' +
		                        '<td id="lb_description' + id + '" class="lb_description">' + description + '</td>' +
		                        '<td id="lb_date' + id + '" class="lb_date">' + $.format.date(date, "dd/MM/yyyy HH:mm") + '</td>' +
		                        '</tr>');
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
function loadBasket(audit) {
	subTotalFootprint = 0;
	subTotalkWhPerYear = 0;
    // LOAD FROM CACHE
    var oBasket = JSON.parse(localStorage.getItem('oBasket'));
    conversion_factor = oBasket.conversion_factor;
    conversion_factor_unit = oBasket.conversion_factor_unit;
    $("#unit").html(conversion_factor_unit);

    // APPEND DETAILS
    if ($.cookie('user')) {
		if ($('#audit_details tr').length < 1) {
			$('#audit_details').append('' +
	        '<tr><td><b>Auditor:</b></td><td>' + unescape($.cookie('user').replace(/\+/g, " ")) + '</td>' +
	        '<td><b>Organisation:</b></td><td>' + unescape($.cookie('org').replace(/\+/g, " ")) + '</td>' +
	        '<td><b>Date:</b></td><td>' + $.format.date(new Date(oBasket.timestamp.toString()), "ddd, dd MMMM yyyy @ HH:mm") + '</td></tr>' +
	        '<td><b>Conversion Factor:</b></td><td colspan="5">' + oConversion_factors[conversion_factor] + '</td>' +
	        '</tr>');
		};
    } else {
        $('#audit_details').append('<tr><td><b>Audit Date:</b></td><td>' + $.format.date(new Date(oBasket.timestamp.toString()), "ddd, dd MMMM yyyy @ HH:mm") + '</td></tr>');
    }

    // LOOP THROUGH THE SELECTION
    for (var i = 0; i < oBasket['aDeviceProfile'].length; i++) {
        var oDeviceProfile = oBasket['aDeviceProfile'][i];
		localStorage.setItem('oDeviceProfile' + nbOfRow, JSON.stringify(oDeviceProfile));

        // PREPARE STATISTICS
        var footprint = parseFloat(parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby) * conversion_factor).toFixed(2);
        totalFootprint = (totalFootprint + parseFloat(footprint));
		subTotalFootprint = (subTotalFootprint + parseFloat(footprint));
        
		var kWhPerYear = parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby).toFixed(2);
		totalkWhPerYear = (totalkWhPerYear + parseFloat(kWhPerYear));
        subTotalkWhPerYear = (subTotalkWhPerYear + parseFloat(kWhPerYear));
		
		// DISPLAY STATS
		$('#totalkWh_'+audit).html('<b>'+ parseFloat(subTotalkWhPerYear).toFixed(2) +'</b>');
		$('#totalamout_'+audit).html('<b>'+ parseFloat(subTotalFootprint).toFixed(2) +'</b>');
		$('#perUnit_'+audit).html('<b>'+ oDeviceProfile.values.perUnit +'</b>');

        // APPEND TO THE TABLE
        appendToTable(oDeviceProfile, i, audit);
    };
    // APPLY STYLE TO THE TABLE
    styleTable('not_alt');

    // TOTAL
    $('#head_ptotal').html("Total: <b>" + parseFloat(totalFootprint).toFixed(2) + " " + conversion_factor_unit + " / Year</b>");
    $('#ptotal').html("<tr><td>Total power-usage:</td><td><b>" + parseFloat(totalFootprint / conversion_factor).toFixed(2) + " kWh per Year</b></td><tr>" +
    "<tr><td>Total Carbon footprint:</td><td><b>" + parseFloat(totalFootprint).toFixed(2) + " " + conversion_factor_unit + " per Year</b></td><tr>");
	checkout();
	
	$('#btn_editBasket').attr("disabled", false);        
	$('#btn_saveBasket').attr("disabled", false);        
	$('#btn_toResultsPage').attr("disabled", false);        
	$('#btn_print_series').attr("disabled", false);        
	$('#btn_export_series').attr("disabled", false);
}

// BUILD TABLE
function appendToTable(oDeviceProfile, nBofDeviceProfile, audit) {
	nbOfRow ++;
    // APPEND TO THE TABLE
    // prepare the right output for the product source and standby
    if (oDeviceProfile.values.daysOnPerWeek) {
        var onStandby = '<a href="#time_used_info_'+ audit + '_' + nBofDeviceProfile + '" class="td_source">custom</a>';
        var time_used = '<b>Time used: </b>' + oDeviceProfile.values.weeksOnPerYear + ' weeks per year, ' + oDeviceProfile.values.daysOnPerWeek + ' days a week<br>' +
        '<b>On:</b> ' + oDeviceProfile.values.onPerDay + ' hours per day, <b>Off:</b> ' + oDeviceProfile.values.offPerDay + '  hours per day, on <b>Standby:</b> ' + oDeviceProfile.values.standbyPerDay + ' hours per day';
        var standby_details = 'based on a custom time use.<br>' + time_used + '<br>';
    } else if (oDeviceProfile.values.weeksOnPerYear == 0 && oDeviceProfile.values.daysOnPerWeek == 0) {
		var onStandby = '<a href="#time_used_info_'+ audit + '_' + nBofDeviceProfile + '" class="td_source">custom</a>';
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
    '<tr id="row_'+ audit + '_' + nBofDeviceProfile + '">' +
    '<td id="quantity_'+ audit + '_' + nBofDeviceProfile + '" class="centered">' + oDeviceProfile.values.quantity + '<\/td>' +
    '<td id="description_'+ audit + '_' + nBofDeviceProfile + '" class="td_dsc"><a href="#source_'+ audit + '_' + nBofDeviceProfile + '" class="td_source">' + oDeviceProfile.description + '</a><span id="time_used_info_'+ audit + '_' + nBofDeviceProfile + '" class="time_used_info"><b>Role:</b> ' + oDeviceProfile.values.role + ' <span class="location_info"><b>Location:</b> ' + oDeviceProfile.values.location + '</span><br>' + time_used + '</span><\/td>' +
    // hidden td for tooltips and print css
    '<td id="source_'+ audit + '_' + nBofDeviceProfile + '" style="display:none">' +
    '<b>Description:</b> ' + oDeviceProfile.description + '<br>' +
    '<b>Role:</b> <span id="role_'+ audit + '_' + nBofDeviceProfile + '">' + oDeviceProfile.values.role + '</span><br>' +
    '<b>Location:</b> <span id="location_'+ audit + '_' + nBofDeviceProfile + '">' + oDeviceProfile.values.location + '</span><br>' +
    '<b>Average for one unit:</b> ' + parseFloat(oDeviceProfile.values.kWhPerYear).toFixed(2) + ' kWh per year ' +
    standby_details +
    '<b>Source:</b> ' + oDeviceProfile.values.source + '<br>' +
    '<b>Date:</b> ' + oDeviceProfile.values.modified +
    '<\/td>' +
    '<td id="standby_'+ audit + '_' + nBofDeviceProfile + '" class="centered">' + onStandby + '<\/td>' +
    // hidden td for tooltips and print css
    '<td id="standby_details_'+ audit + '_' + nBofDeviceProfile + '" style="display:none">' +
    standby_details +
    '<\/td>' +
    '<td id="totalkWh_'+ audit + '_' + nBofDeviceProfile + '" class="centered">' + parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby).toFixed(2) + '<\/td>' +
    '<td id="totalamout_'+ audit + '_' + nBofDeviceProfile + '" class="centered">' + parseFloat(parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby) * conversion_factor).toFixed(2) + '<\/td>' +
    '<td id="perUnit_'+ audit + '_' + nBofDeviceProfile + '">' + oDeviceProfile.values.perUnit + '<\/td>' +
    '<\/tr>'
    );
};

// CHECKOUT
function checkout(clean) {
    // bug > Load, go to results, edit, checkout
    var aBasket = {
        aDeviceProfile: [],
        timestamp: new Date().toString(),
        conversion_factor: conversion_factor,
        conversion_factor_unit: conversion_factor_unit,
    };
    // Retreive existing objects stored, pack into an array and put it into localStorage
    for (var i = 0; i < nbOfRow; i++) {
        if (localStorage.getItem('oDeviceProfile' + i)) {
            aBasket.aDeviceProfile.push(JSON.parse(localStorage.getItem('oDeviceProfile' + i)));
            if (clean) {
                localStorage.removeItem('oDeviceProfile' + i);
            };
        }
    };

    localStorage.setItem('oBasket', JSON.stringify(aBasket));
    // var oBasket = JSON.parse(localStorage.getItem('oBasket'));
    // console.log('oBasket: ', JSON.parse(localStorage.getItem('oBasket')));
};

// SAVE CURRENT BASKET
function saveBasket() {
    checkout();
    $.msg({
        bgPath: 'images/',
        autoUnblock: false,
        clickUnblock: false,
        content: '<p class="centered">Save to your account<br></p>' +
        '<p class="btn-wrap centered">' +
        '<label for="description">Description:&nbsp;</label><input type="text" name="description" value="" id="description" size="18"><br><br>' +
        '<input type="button" name="cancelSave" value="Cancel" id="cancelSave">&nbsp;' +
        '<input type="button" name="saveSave" value=" Save "id="saveSave">' +
        '</p>',
        afterBlock: function() {
            // store 'this' for other scope to use
            var self = this;
            $('#cancelSave').bind('click',
            function() {
                self.unblock();
            });
            $('#saveSave').bind('click',
            function() {
                var dsc = $('#description').val();
                var oBasket = localStorage.getItem('oBasket');
                var user = $.cookie('email');
                self.replace('Saving...');
                $.post('php_scripts/calculator/saveBasket.php', {
                    oBasket: localStorage.getItem('oBasket'),
                    description: dsc,
                    user: $.cookie('email')
                },
                function(id, textStatus, xhr) {
                    if (id == null) {
                        self.replace('<p style="color: red" class="centered"><b>Unexpected Error,</b><br>Failed to save</p>');
                    } else {
                        self.replace('<p style="color: green" class="centered"><b>Audit saved</p>');
                        $('#none_saved').remove();
                        $("#listOfBaskets").append('<tr id="basket' + id + '">'+
		'<td id="basketId' + id + '" style="display:none">' + id + '</td>'+
		'<td id="basketDesc' + id + '" class="lob_description">' + dsc + '</td>'+
		'<td><input type="button" name="add_basket' + id + '" value="Add this audit" id="add_basket' + id + '" onclick="loadSelectedBasket(' + id +')"></td>'+
		'</tr>');
                        styleTable();
                    }
                });
                self.unblock(500);
            });
        }
    });
};

// CHECKOUT AND REDIRECT TO CALC
function editBasket() {
    checkout(true);
    window.location = 'amee_calc.php';
};

// CHECKOUT AND SHOW RESULTS
function toResultsPage() {
    checkout(true);
    window.location = 'amee_calc_results.php';
};

