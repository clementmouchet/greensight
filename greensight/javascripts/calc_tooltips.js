// TOOLTIPS
$(document).ready(function() {
    $("#conversion_factors").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            return '<p class="tooltip margin" style="max-width:40em; text-align: justify;">Select a conversion factor.<br>' +
            'This figure represents electricity consumed, i.e. electricity used at the point of final consumption.<br>' +
            'Because the fuel mix consumed in UK power stations changes from year to year, ' +
            'the figure is presented as a five year rolling average.<br><br>' +
            '<i>Info: Carbon Trust is still using a 2010 factor for surveys and loan applications.</p>';
        }
    });

    $(".calc#listOfBaskets th").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            return '<p class="tooltip margin">Load or Delete an audit saved in the Database.<br>' +
            '<i>All audits for the current user are displayed here<br>' +
            'Tip: Use your saved audits and edit them to simulate changes, and or compare two audits</p>';
        }
    });

    $(".series#listOfBaskets th").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            return '<p class="tooltip margin">Load an audit saved in the Database as a series<br>' +
            '<i>All audits for the current user are displayed here<br>' +
            'Tip: It is better to compare audits with the same number of profile and the same unit</p>';
        }
    });

    $(".merger#listOfBaskets th").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            return '<p class="tooltip margin">Load an audit saved in the Database to merge it with other audits<br>' +
            '<i>All audits for the current user are displayed here<br>' +
            'Tip: You may have to scroll to see the entire list</p>';
        }
    });

    $("#reportBasket th").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            return '<p class="tooltip margin">Build a detailed report of the audit.<br>' +
            '<i>with charts and tables<br>' +
            '</p>';
        }
    });

    $("#compareBaskets th").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            return '<p class="tooltip margin">Compare two saved audits.<br>' +
            '<i>Note that it is better to compare audits<br>' +
            'with the <b>same number of profiles</b> and the <b>same unit</b><br>' +
            'Tip: Use your saved audits and edit them to compare them</p>';
        }
    });

    $(".standby").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            return '<p class="tooltip margin">Time on standby.<br><br>' +
            'A factor applied to the power consumption<br>'+
			'<br>' +
            'never: -0.05 (+5%)<br>'+
			'sometimes: 0 (unchanged)<br>'+
			'mostly: 0.05 (-5%)<br>'+
			'always: 0.08 (-8%)<br>'+
			'custom: a custom time use (hover on custom to see details)<br>'+
			'<br>'+
			'The factors are from <a href="http://discover.amee.com/categories/Computers_generic/">the MTP dataset</a>' +
			'<br>'+
            '</p>';
        }
    });

    $(".totalkWh").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            return '<p class="tooltip margin">Total kilowatt hour per time unit (year).<br>' +
            '<i>The initial value from AMEE source<br>is multiplied with the standby factor' +
            '</p>';
        }
    });

    $(".amount").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            $(".info_help").delay(0).hide().delay(0).fadeIn('fast');
            return '<p class="tooltip margin">Amount of ' + $("#unit").html() + ' per time unit (year).<br>' +
            '<i>The result of: quantity * kilowatt hour per year * standby factor' +
            '</p>';
        }
    });

    $("#results_table .perunit").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            $(".info_help").delay(100).hide().delay(0).fadeIn('fast');
            return '<p class="tooltip margin">Time unit of the kilowatt hour & ' + $("#unit").html() + '<br>' +
            '</p>';
        }
    });

    $("#results_table_s1 .perunit").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            $(".info_help").delay(100).hide().delay(0).fadeIn('fast');
            return '<p class="tooltip margin">Time unit of the kilowatt hour & ' + $("#unit_s1").html() + '<br>' +
            '</p>';
        }
    });

    $("#results_table_s2 .perunit").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            $(".info_help").delay(100).hide().delay(0).fadeIn('fast');
            return '<p class="tooltip margin">Time unit of the kilowatt hour & ' + $("#unit_s2").html() + '<br>' +
            '</p>';
        }
    });

    $("#unit_s1").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            $(".info_help").delay(0).hide().delay(0).fadeIn('fast');
            return '<p class="tooltip margin">Amount of ' + $("#unit_s1").html() + ' per time unit (year).<br>' +
            '<i>The result of: quantity * kilowatt hour per year * standby factor' +
            '</p>';
        }
    });

    $("#unit_s2").tooltip({
        delay: 500,
        bodyHandler: function() {
            $(this).addClass('mouse_help');
            $(".info_help").delay(0).hide().delay(0).fadeIn('fast');
            return '<p class="tooltip margin">Amount of ' + $("#unit_s2").html() + ' per time unit (year).<br>' +
            '<i>The result of: quantity * kilowatt hour per year * standby factor' +
            '</p>';
        }
    });

    // SOURCE INFO
    $("#results_table, #results_table_s1, #results_table_s2, #middle_right, #results").mouseover(function() {
        $("#results_table a,#results_table_s1 a,#results_table_s2 a, #middle_right a, #results a").tooltip({
            track: true,
            delay: 500,
            bodyHandler: function() {
                $(this).addClass('mouse_help');
                return '<p class="tooltip margin">' + $($(this).attr("href")).html() + '</p>';
            },
            showURL: false
        });
    });
	// CHARTS INFO
        $("#chartAllIn").tooltip({
			track: true,
            delay: 500,
            bodyHandler: function() {
                $(this).addClass('mouse_help');
                return '<p class="tooltip margin">Click on the bars to get details.<br>' +
	            '</p>';
            },
            showURL: false
        });
});