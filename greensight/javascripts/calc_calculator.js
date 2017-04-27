// The code makes extensive use of jQuery http://jquery.com/ to perform ajax requests and interact with te page while maintaining minimum exchange between the server and the client.
// The selects are dynamically changin thanks to TexoTela jQuery plugin: http://www.texotela.co.uk/code/jquery/select/
// It performs the Ajax request to the php script oDataItemOptions.php and append the options Object returned in JSON to the select
// FLAGS
var modelNumberSelected = false;
// COUNTERS
var nBofDeviceProfile = 0;
// SELECTED FACTOR & UNIT
var conversion_factor = 0;
var conversion_factor_unit = "N/A";

// SET THE DATA CATEGORIES AVAILABLE
// the list is not retreive from the server because path are not supposed to change and they require special treatments, so only the usefull path are available.
var oProfileCategories = {
    "/home/appliances/energystar/office/computers/desktopsAndIntegrated": "Desktops & Integrated Computers (Energy Star US appliances)",
    "/home/appliances/energystar/office/computers/workstations": "Workstations (Energy Star US appliances)",
    "/home/appliances/energystar/office/computers/notebooksAndTablets": "Notebooks & Tablets (Energy Star US appliances)",
    "/home/appliances/computers/generic": "Computing Equipment (MTP/DEFRA UK)"
}

// PC Roles
var oRoles = {
    "Desktop PC": "Desktop PC",
    "Shared PC": "Shared PC",
    "Server": "Server",
    "Laptop": "Laptop",
    "Printer": "Printer",
    "Shared Printer": "Shared Printer",
    "Other": "Other"
}

// SELECT CONVERSION FACTOR
function useFactor(selected_factor) {
    if (selected_factor != conversion_factor) {
        conversion_factor = parseFloat(selected_factor);
        conversion_factor_unit = oConversion_factors_units[selected_factor];
        $("#unit").html(conversion_factor_unit);
        // update table total amouts
        for (var i = 0; i < nBofDeviceProfile; i++) {
            $('#totalamout' + i).html(parseFloat(parseFloat($('#totalkWh' + i).html()) * conversion_factor).toFixed(2));
        };
    };
    $("#conversion_factors").attr("disabled", false);
    $("#sProfileCategory").attr("disabled", false);
    $("#data_src_details").fadeOut().html("Select a category." +
    "<br>The data is is sourced from <a href='http://www.amee.com/'>AMEE</a> database. The source and conversion factor from your selections will be displayed here.<br><b>Do not to mix UK and US appliances").fadeIn();
}

// CHOOSE THE RIGHT FUNCTION DEPENDING ON THE "drillOption" RETURNED FROM AMEE
function pickSelect(sProfileCategory, productType, brand, modelName, modelNumber, category, device, rating) {
    $('#submit').parent().append('<img  class="loading" src="images/loading.gif"/>');
    // jQuery .get() performs the ajax request (GET) with the specified parameters. {sProfileCategory: sProfileCategory, etc} and returns the callback (a string) to a function
    // console.log("oDataItemOptions.php?sProfileCategory=" + sProfileCategory + "&productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    $.get('php_scripts/calculator/drillOption.php', {
        sProfileCategory: sProfileCategory,
        productType: productType,
        brand: brand,
        modelName: modelName,
        modelNumber: modelNumber,
        device: device,
        rating: rating,
        category: category
    },
    // the callback is an AMEE "drillOption". It stands before the options oject and helps to determine what function to call.
    function(sdrillOption) {
        //console.log(sdrillOption);
        switch (sdrillOption)
        {
        case "productType":
            getType(sProfileCategory, productType, brand, modelName, modelNumber, category);
            break;
        case "brand":
            getBrands(sProfileCategory, productType, brand, modelName, modelNumber, category);
            break;
        case "modelName":
            getModels(sProfileCategory, productType, brand, modelName, modelNumber, category);
            break;
        case "modelNumber":
            getModelNumb(sProfileCategory, productType, brand, modelName, modelNumber, category);
            break;
        case "category":
            getCategory(sProfileCategory, productType, brand, modelName, modelNumber, category);
            break;
        case "device":
            getDevice(sProfileCategory, device, rating);
            break;
        case "rating":
            getRating(sProfileCategory, device, rating);
            break;
        default:
            setStandby(sProfileCategory, productType, brand, modelName, modelNumber, category, device, rating);
            break;
        };
        $('.loading').remove();
    });
};

// GET LIST OF PRODUCT TYPE FOR SELECTED CATEGORY
function getType(sProfileCategory, productType, brand, modelName, modelNumber, category) {
    $('#submit').parent().append('<img  class="loading" src="images/loading.gif"/>');
    // If the "drillOption" is "productType" this function is called to dynamically load the select with the right options,
    // thanks to TexoTela jQuery plugin: http://www.texotela.co.uk/code/jquery/select/
    // it performs the Ajax request to the php script oDataItemOptions.php in the same way than the (GET) described above and append the "options Object" returned in JSON to the select
    // all the getXxxxx() function work the same way.
    if (sProfileCategory != "" & productType == "") {
        $("#data_src_details").html("Source: <a href='http://discover.amee.com/categories/Office_Computers'>Energy Star website</a> <b>(US appliances)</b><br>Carbon emissions: Energy usage of appliance per year * Selected conversion factor (" + conversion_factor + ") * quantity");
        $.get('php_scripts/calculator/oDataItemOptions.php', {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        function(options) {
            // add options
            $("#productType").addOption(options, false);
        });
        $('#sProfileCategory').attr("disabled", true);
        $('#reset').attr("disabled", false);
        $('#productType').fadeIn('');
        $('.loading').remove();

    }
};

// GET LIST OF BRAND FOR SELECTED PARAMETERS
function getBrands(sProfileCategory, productType, brand, modelName, modelNumber, category) {
    $('#submit').parent().append('<img  class="loading" src="images/loading.gif"/>');
    if ((productType != "" & brand == "") || (productType == "" & brand == "")) {
        $("#data_src_details").html("Source: <a href='http://discover.amee.com/categories/Office_Computers'>Energy Star website</a><b> (US appliances)</b><br>Carbon emissions: Energy usage of appliance per year * selected conversion factor (" + conversion_factor + ") * quantity");
        $.get('php_scripts/calculator/oDataItemOptions.php', {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        function(options) {
            // add options
            $("#brand").addOption(options, false);
        });
        $('#sProfileCategory').attr("disabled", true);
        $('#productType').attr("disabled", true);
        $('#reset').attr("disabled", false);
        $('#brand').fadeIn('');
        $('.loading').remove();
    }
};

// GET LIST OF MODEL_NAME FOR SELECTED PARAMETERS
function getModels(sProfileCategory, productType, brand, modelName, modelNumber, category) {
    $('#submit').parent().append('<img  class="loading" src="images/loading.gif"/>');
    //console.log("oDataItemOptions.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    if ((productType != "" & brand != "") || (productType == "" & brand != "")) {
        $.get('php_scripts/calculator/oDataItemOptions.php', {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        function(options) {
            // add options
            $("#modelName").addOption(options, false);
        });
        $('#brand').attr("disabled", true);
        $('#modelName').fadeIn('');
        modelNumberSelected = true;
        $('.loading').remove();
    }
};

// GET LIST OF MODEL_NUMBER FOR SELECTED PARAMETERS
function getModelNumb(sProfileCategory, productType, brand, modelName, modelNumber, category) {
    $('#submit').parent().append('<img  class="loading" src="images/loading.gif"/>');
    //console.log("oDataItemOptions.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    if ((productType != "" & brand != "") || (productType == "" & brand != "")) {
        $.get('php_scripts/calculator/oDataItemOptions.php', {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        function(options) {
            // add options
            $("#modelNumber").addOption(options, false);
        });
        $('#modelName').attr("disabled", true);
        $('#modelNumber').fadeIn('');
        $('.loading').remove();
    }
};

// GET LIST OF MODEL FOR SELECTED PARAMETERS
function getCategory(sProfileCategory, productType, brand, modelName, modelNumber, category) {
    $('#submit').parent().append('<img  class="loading" src="images/loading.gif"/>');
    //console.log("oDataItemOptions.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    if ((productType != "" & brand != "") || (productType == "" & brand != "")) {
        if (modelNumberSelected == false) {
            modelNumber = modelName;
        }
        $.get('php_scripts/calculator/oDataItemOptions.php', {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        function(options) {
            // add options
            $("#category").addOption(options, false);
        });
        if (productType != '') {
            $("#data_src_details").append("<br>Category A: <= 148.0 kWh<br>Category B: <= 175.0 kWh<br>Category C: <= 209.0 kWh<br>Category D: <= 234.0 kWh");
        } else {
            $("#data_src_details").append("<br>Category A: <= 40.0 kWh<br>Category B: <= 53.0 kWh<br>Category C: <= 88.5");
        }
        $('#modelNumber').attr("disabled", true);
        $('#category').fadeIn('');
        $('.loading').remove();
    }
};

// GET LIST OF DEVICES
function getDevice(sProfileCategory, device, rating) {
    $('#submit').parent().append('<img  class="loading" src="images/loading.gif"/>');
    //console.log("oDataItemOptions.php?sProfileCategory=" + sProfileCategory + "&device=" + device + "&rating=" + rating);
    if (sProfileCategory != "") {
        $("#data_src_details").html("Source: <a href='http://discover.amee.com/categories/Computers_generic'>Market Transformation Programme dataset</a><br>Carbon emissions: Energy usage of appliance per year * Selected conversion factor (" + conversion_factor + ") * quantity");
        // normal get to be able to remove unwanted options
        $.get('php_scripts/calculator/oDataItemOptions.php', {
            sProfileCategory: sProfileCategory,
            device: device,
            rating: rating
        },
        function(options) {
            // add options
            $("#device").addOption(options, false);
            // remove unwanted options
            $("#device").removeOption(["Other", "standby"]);
        });
        $('#sProfileCategory').attr("disabled", true);
        $('#reset').attr("disabled", false);
        $('#device').fadeIn('');
        $('.loading').remove();
    }
};

// GET LIST OF RATINGS FOR SELECTED DEVICE
function getRating(sProfileCategory, device, rating) {
    $('#submit').parent().append('<img  class="loading" src="images/loading.gif"/>');
    //console.log("oDataItemOptions.php?sProfileCategory=" + sProfileCategory + "&device=" + device + "&rating=" + rating);
    if (sProfileCategory != "") {
        $.get('php_scripts/calculator/oDataItemOptions.php', {
            sProfileCategory: sProfileCategory,
            device: device,
            rating: rating
        },
        function(options) {
            // add options
            $("#rating").addOption(options, false);
        });
        $('#reset').attr("disabled", false);
        $('#rating').fadeIn('');
        $('.loading').remove();
    }
};

// SET STANDBY FACTOR or ENABLE PRECISE TIME USE INPUT
function setStandby(sProfileCategory, productType, brand, modelName, modelNumber, category, device, rating, quantity) {
    // Performing a drilldown to make sure there is no "drillOption" left then proceeed
    $('#submit').parent().append('<img  class="loading" src="images/loading.gif"/>');
    $.get('php_scripts/calculator/drillOption.php', {
        sProfileCategory: sProfileCategory,
        productType: productType,
        brand: brand,
        modelName: modelName,
        modelNumber: modelNumber,
        device: device,
        rating: rating,
        category: category
    },
    function(drillOption) {
        if (sProfileCategory != '' & drillOption == '') {
            $('#device').attr("disabled", true);
            $('#rating').attr("disabled", true);
            $('#brand').attr("disabled", true);
            $('#modelName').attr("disabled", true);
            $('#modelNumber').attr("disabled", true);
            $('#category').attr("disabled", true);
            // if the equipment data comes from Energy Star, use the standby factor
            if (device != 'Personal Computers' && device != 'Printer' && device != 'Monitor') {
                $("#data_src_details").html('The contribution due to standby can be calculated by selecting one of the following factors from <a href="http://discover.amee.com/categories/Computers_generic/">the MTP dataset</a>:<br>' +
                'never: -0.05 (+5%)<br>sometimes: 0 (unchanged)<br>mostly: 0.05 (-5%)<br>always: 0.08 (-8%)');
                $('#onStandby').fadeIn('');
                $('#role').fadeIn('');
                $('#span_location').fadeIn('');
                $('#location').fadeIn('fast');
                $('.loading').remove();
                // else set the time on
            } else {
                $('#role').fadeIn('');
                $('#span_location').fadeIn('');
                $('#location').fadeIn('fast');
                $('.loading').remove();
            }
        } else {
            $.msg({
                bgPath: 'images/',
                content: 'AMEE database failed to complete the request, please try again'
            });
            resetCalc();
            $('.loading').remove();
        }
    });
}

function setRole(mode, device) {
    if (device != 'Personal Computers' && device != 'Printer' && device != 'Monitor') {
        $('#role').attr("disabled", true);
    } else {
        $('#role').attr("disabled", true);
        setTimeUse(mode);
    }
}

// SET PRECISE TIME USE
function setTimeUse(mode, onPerDay, offPerDay, standbyPerDay, sProfileCategory, productType, brand, modelName, modelNumber, category, device, rating, quantity, onStandby) {
    var totalHours = (parseInt(onPerDay) + parseInt(offPerDay) + parseInt(standbyPerDay));
    switch (mode) {
    case 'weeks':
        $('#role').attr("disabled", true);
        $("#data_src_details").html('Set the time use:<br>' +
        'Input the number of <b>weeks per year</b>, <b>days per week</b>, and hours (<b>on, off</b>, and on <b>standby</b>) of use to get a more accurate measure of the power usage');
        $('#weeksOnPerYear').val('52');
        $('#span_weeksOnPerYear').fadeIn('');
        $('#weeksOnPerYear_btn').fadeIn('fast');
        break;
    case 'days':
        if ($('#weeksOnPerYear').val() > 0) {
            if ($("#weeksOnPerYear").valid()) {
                $("#weeksOnPerYear").attr("disabled", true);
                $('#weeksOnPerYear_btn').fadeOut('fast');
                $("#daysOnPerWeek").val(6);
                $('#span_daysOnPerWeek').fadeIn('');
                $('#daysOnPerWeek_btn').fadeIn('fast');
            } else {
                $.msg({
                    bgPath:
                    'images/',
                    timeOut: 5000,
                    content: '<p class="centered">Please set a valid number of week in a year (between 1 and 52 weeks)</p>'
                });
            }
        } else {
			$('#weeksOnPerYear_btn').fadeOut('fast');
			// skip the rest of the questions
            $("#daysOnPerWeek").val(7);
            $("#onPerDay").val(0);
            $("#offPerDay").val(24);
            $("#standbyPerDay").val(0);
            // enable Set Quantity and Submit button
            $('#span_quantity').fadeIn('');
            $('#submit').attr("disabled", false);
        }

        break;
    case 'on':
        if ($("#daysOnPerWeek").valid()) {
            $("#daysOnPerWeek").attr("disabled", true);
            $('#daysOnPerWeek_btn').fadeOut('fast');
            $("#onPerDay").val(24);
            $('#span_onPerDay').fadeIn('');
            $('#onPerDay_btn').fadeIn('fast');
        } else {
            $.msg({
                bgPath:
                'images/',
                timeOut: 5000,
                content: '<p class="centered">Please set a valid number of days of use in a week (between 1 and 7)</p>'
            });
        };
        break;
    case 'off':
        if ($("#onPerDay").valid() && (parseInt(totalHours) <= 24) && (parseInt(totalHours) >= 0)) {
            $("#onPerDay").attr("disabled", true);
            $('#onPerDay_btn').fadeOut('fast');
            $("#offPerDay").val(24 - parseInt(onPerDay));
            $('#span_offPerDay').fadeIn('');
            $('#offPerDay_btn').fadeIn('fast');
        } else {
            $.msg({
                bgPath:
                'images/',
                timeOut: 5000,
                content: '<p class="centered">The number of "hours on" set (' + parseInt(totalHours) + ') is not valid</p>'
            });
            resetTimeUse();
        };
        break;
    case 'standby':
        if ($("#offPerDay").valid() && (parseInt(totalHours) <= 24) && (parseInt(totalHours) > 0)) {
            $("#offPerDay").attr("disabled", true);
            $('#offPerDay_btn').fadeOut('fast');
            $("#standbyPerDay").val(24 - (parseInt(onPerDay) + parseInt(offPerDay)));
            $('#span_standbyPerDay').fadeIn('');
            $('#standbyPerDay_btn').fadeIn('fast');
        } else {
            $.msg({
                bgPath:
                'images/',
                timeOut: 5000,
                content: '<p class="centered">The total number of "hours on" & "hours off" set (' + parseInt(totalHours) + ') is not valid</p>'
            });
            resetTimeUse();
        };
        break;
    case 'continue':
        $('#standbyPerDay_btn').fadeOut('fast');
        if ($("#standbyPerDay").valid() && (parseInt(totalHours) == 24)) {
            $("#standbyPerDay").attr("disabled", true);
            $('#standbyPerDay_btn').fadeOut('fast');
            // enable Set Quantity and Submit button
            $('#span_quantity').fadeIn('');
            $('#submit').attr("disabled", false);
        } else {
            $.msg({
                bgPath:
                'images/',
                timeOut: 5000,
                content: '<p class="centered">The total number of hours set (' + parseInt(totalHours) + ') is not equal to 24 hours</p>'
            });
            resetTimeUse();
        };
        break;
    default:
        $.msg({
            bgPath:
            'images/',
            content: 'Unexpected error, please try again'
        });
        resetCalc();
        break;
    };
};

// RESET TIME USE SELECTION IN CASE OF MISTAKE
function resetTimeUse() {
    // rest on
    $("#onPerDay").attr("disabled", false);
    $('#onPerDay_btn').fadeIn('fast');
    // reset off
    $('#span_offPerDay').fadeOut('fast');
    $('#offPerDay').attr("disabled", false).val('0');
    // reset standby
    $('#span_standbyPerDay').fadeOut('fast');
    $('#standbyPerDay').attr("disabled", false).val('0');
}

// SET QUANTITY FOR SELECTED PODUCT
function setQuantity() {
    $('#onStandby').attr("disabled", true);
    $('#span_quantity').fadeIn('');
    $('#submit').attr("disabled", false);
    $('.loading').remove();
};

// REQUEST FOOTPRINT TO AMEE FOR SELECTED PARAMETERS
function getFooprint(sProfileCategory, productType, brand, modelName, modelNumber, category, device, rating, onStandby, role, location, weeksOnPerYear, daysOnPerWeek, onPerDay, offPerDay, standbyPerDay, quantity) {
    // using a get to perfom the request with all the valid parameters.
    console.log(sProfileCategory + " " + productType + " " + brand + " " + modelName + " " + modelNumber + " " + category +  " " + device + " " + rating + " " + onStandby + " " + role + " " + weeksOnPerYear + " " + daysOnPerWeek + " " + onPerDay + " " + offPerDay + " " + standbyPerDay + " " + quantity);
    $('#quantity').attr("disabled", true);
    $('#submit').val('Submited').attr("disabled", true).parent().append('<img class="loading" src="images/loading.gif"/>');
    $("body").addClass('mouse_wait');
    if (device == '') {
        if (productType == '') {
            if (sProfileCategory == "/home/appliances/energystar/office/computers/workstations") {
                productType = "Workstation";
            } else if (sProfileCategory == "/home/appliances/energystar/office/computers/notebooksAndTablets") {
                productType = "Notebook/Tablet";
            }
        }
    }
    $.getJSON('php_scripts/calculator/oProfile.php', {
        sProfileCategory: sProfileCategory,
        productType: productType,
        brand: brand,
        modelName: modelName,
        modelNumber: modelNumber,
        category: category,
        device: device,
        rating: rating,
        onStandby: onStandby,
        role: role,
        location: location,
        weeksOnPerYear: weeksOnPerYear,
        daysOnPerWeek: daysOnPerWeek,
        onPerDay: onPerDay,
        offPerDay: offPerDay,
        standbyPerDay: standbyPerDay,
        quantity: quantity,
    },
    function(oDeviceProfile, textStatus) {
        // Put the object into localStorage
        localStorage.setItem('oDeviceProfile' + nBofDeviceProfile, JSON.stringify(oDeviceProfile));
        // Display results in the table
        appendToTable(nBofDeviceProfile, oDeviceProfile);
        $('.checkout').attr("disabled", false);
        $('#saveBasket').attr("disabled", false);
        $('#clearBasket').attr("disabled", false);
        $('#export_xml').attr("disabled", false);
        nBofDeviceProfile++;
        resetCalc();
        styleTable();
        $('.loading').remove();
        $("body").removeClass('mouse_wait');
    });
};

// BUILD TABLE
function appendToTable(nBofDeviceProfile, oDeviceProfile) {
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
    $("#results_table").append(
    '<tr id="row' + nBofDeviceProfile + '">' +
    '<td id="quantity' + nBofDeviceProfile + '" class="centered">' + oDeviceProfile.values.quantity + '<\/td>' +
    '<td id="description' + nBofDeviceProfile + '" class="td_dsc"><a href="#source' + nBofDeviceProfile + '" class="td_source">' + oDeviceProfile.description + '</a><span id="time_used_info' + nBofDeviceProfile + '" class="time_used_info" style="display:none"><b>Role:</b> ' + oDeviceProfile.values.role + '<br>' + time_used + '</span><\/td>' +
    '<td id="source' + nBofDeviceProfile + '" style="display:none">' +
    '<b>Description:</b> ' + oDeviceProfile.description + '<br>' +
    '<b>Role:</b> ' + oDeviceProfile.values.role + '<br>' +
    '<b>Location:</b> ' + oDeviceProfile.values.location + '<br>' +
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
    '<td id="tdedit' + nBofDeviceProfile + '"><input type="button" value="Edit" id="edit' + nBofDeviceProfile + '" onclick="editDeviceProfile(' + nBofDeviceProfile + ')"><\/td>' +
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
    for (var i = 0; i < nBofDeviceProfile; i++) {
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
    //     console.log('timestamp: ', Date(oBasket.timestamp).toString());
};

// RESET CALCULATOR
function resetCalc(clean) {
    // attr("disabled", false) re-enables selects for later use
    // fadeOut('') hide them to avoid issues & confusion
    // removeOption(/./) clean select options
    // .addOption("value", "text") revert to default values
    $('#submit').parent().append('<img  class="loading" src="images/loading.gif"/>');
    $('#productType').fadeOut('fast').attr("disabled", false).removeOption(/./).addOption("", "Select a product type");
    $('#brand').fadeOut('fast').attr("disabled", false).removeOption(/./).addOption("", "Select a brand");
    $('#modelName').fadeOut('fast').attr("disabled", false).removeOption(/./).addOption("", "Select a model name");
    $('#modelNumber').fadeOut('fast').attr("disabled", false).removeOption(/./).addOption("", "Select a model number");
    $('#category').fadeOut('fast').attr("disabled", false).removeOption(/./).addOption("", "Select a category");
    $('#device').fadeOut('fast').attr("disabled", false).removeOption(/./).addOption("", "Select a device");
    $('#rating').fadeOut('fast').attr("disabled", false).removeOption(/./).addOption("", "Select a rating");
    $('#onStandby').fadeOut('fast').attr("disabled", false).addOption(onStandbyOpts, false);
    $('#role').fadeOut('fast').attr("disabled", false).addOption(oRoles, false);
    // hide spans
    $('#span_location').fadeOut('fast');
    $('#span_weeksOnPerYear').fadeOut('fast');
    $('#span_daysOnPerWeek').fadeOut('fast');
    $('#span_onPerDay').fadeOut('fast');
    $('#span_offPerDay').fadeOut('fast');
    $('#span_standbyPerDay').fadeOut('fast');
    $('#span_quantity').fadeOut('fast');
    // reset inputs
    $('#location').attr("disabled", false).fadeOut('fast').val('');
    $('#weeksOnPerYear').attr("disabled", false).val('');
    $('#daysOnPerWeek').attr("disabled", false).val('');
    $('#onPerDay').attr("disabled", false).val('0');
    $('#offPerDay').attr("disabled", false).val('0');
    $('#standbyPerDay').attr("disabled", false).val('0');
    $('#quantity').attr("disabled", false).val('1');
    // disable the submit button
    $('#submit').attr("disabled", true).val('Submit');
    $('#reset').attr("disabled", true);
    if (clean) {
        $("#conversion_factors").addOption(oConversion_factors, false).attr("disabled", false);
        $("#sProfileCategory").selectOptions("", true).attr("disabled", true);
        $("#data_src_details").fadeOut('fast').html("Please select a conversion factor.<br>The conversions factors come from the <a href='http://archive.defra.gov.uk/environment/business/reporting/pdf/110707-guidelines-ghg-conversion-factors.pdf'>\"2011 Guidelines to Defra / DECC's GHG Conversion Factors for Company Reporting\"</a> report.<br>The source and conversion factor from your selections will be displayed here.").fadeIn();
    } else {
        $("#data_src_details").fadeOut('fast').html("Select a category.<br>The data is is sourced from <a href='http://www.amee.com/'>AMEE</a> database. The source and conversion factor from your selections will be displayed here.").fadeIn();
        $("#sProfileCategory").selectOptions("", true).attr("disabled", false);
    }
    $('.loading').remove();
};

// CHECKOUT AND SHOW RESULTS
function toResultsPage() {
    checkout(true);
    window.location = 'amee_calc_results.php';
};

// LOAD EXISTING BASKET
function loadCache() {
    if (localStorage.getItem("oBasket") !== null) {
        if (JSON.parse(localStorage.getItem('oBasket')).aDeviceProfile.length > 0) {
            $.msg({
                bgPath: 'images/',
                autoUnblock: false,
                clickUnblock: false,
                content: '<p class="centered">A previous selection has been found in cache,<br>would you like to load it?</p>' +
                '<p class="btn-wrap centered">' +
                '<input type="button" name="yesLoad" value="Yes" id="yesLoad">&nbsp;' +
                '<input type="button" name="noLoad" value="No" id="noLoad">' +
                '</p>',
                afterBlock: function() {
                    // store 'this' for other scope to use
                    var self = this;
                    $('#yesLoad').bind('click',
                    function() {
                        try {
                            self.replace('Loading...');
                            var oBasket = JSON.parse(localStorage.getItem('oBasket'));
                            conversion_factor = oBasket.conversion_factor;
                            conversion_factor_unit = oConversion_factors_units[conversion_factor];
                            $("#unit").html(conversion_factor_unit);
                            // LOOP THROUGH THE SELECTION
                            for (var i = 0; i < oBasket['aDeviceProfile'].length; i++) {
                                var oDeviceProfile = oBasket['aDeviceProfile'][i];
                                localStorage.setItem('oDeviceProfile' + nBofDeviceProfile, JSON.stringify(oDeviceProfile));
                                // APPEND TO THE TABLE
                                appendToTable(nBofDeviceProfile, oDeviceProfile);
                                $('.checkout').attr("disabled", false);
                                $('#saveBasket').attr("disabled", false);
                                $('#clearBasket').attr("disabled", false);
                                $('#export_xml').attr("disabled", false);
                                $("#sProfileCategory").attr("disabled", false);
                                nBofDeviceProfile++;
                            };
                            styleTable();
                            $("#conversion_factors").selectOptions(conversion_factor.toString(), true);
                            $("#data_src_details").fadeOut().html("Change conversion factor, or <br>Select a data category.<br>The data is is sourced from <a href='http://www.amee.com/'>AMEE</a> database.<br>The source and conversion factor from your selections will be displayed here.<br><b>Do not to mix UK and US appliances").fadeIn();
                            self.unblock();
                        } catch(err) {
                            self.replace('Failed to load previous selection');
                            localStorage.clear();
                            self.unblock(3000);
                        }
                    });
                    $('#noLoad').bind('click',
                    function() {
                        self.replace('Previous selection cleared');
                        localStorage.clear();
                        self.unblock(500);
                    });
                }
            });
        } else {
            localStorage.clear();
        };
    };
};

// EDIT SELECTED DEVICE PROFILE
function editDeviceProfile(nBofDeviceProfile) {
    var oDeviceProfile = JSON.parse(localStorage.getItem('oDeviceProfile' + nBofDeviceProfile));
    var prev_role = oDeviceProfile.values.role;
    var prev_loc = oDeviceProfile.values.location;
    var prev_desc = oDeviceProfile.description;

    if (oDeviceProfile.values.daysOnPerWeek) {
        var content = '<p class="centered">Edit "' + oDeviceProfile.description + '"</p>' +
        '<div class="btn-wrap centered">' +
        '<label for="editdesc">Description:&nbsp;</label><input type="text" name="editdesc" value="' + oDeviceProfile.description + '" id="editdesc" class="editdesc" size="40" style="text-left: right; display: inline;"><br><br>' +
        '<label for="edit_role">Role:&nbsp;</label><select name="edit_role" id="edit_role" size="1" style="width: 50%; margin-right: auto; margin-left: auto; display: inline;" ></select><br><br>' +
        '<label for="edit_location">Location:&nbsp;</label><input type="text" name="edit_location" value="' + oDeviceProfile.values.location + '" id="edit_location" class="" size="20" style="text-align: right;"><br><br>' +
        '<label for="editqty">Quantity:&nbsp;</label><input type="text" name="editqty" value="' + oDeviceProfile.values.quantity + '" id="editqty" class="qty" size="12" style="text-align: right;"><br><br>' +
        '<input type="button" name="cancelEdit" value="Cancel" id="cancelEdit">&nbsp;' +
        '<input type="button" name="removeEdit" value="Remove" id="removeEdit">&nbsp;' +
        '<input type="button" name="saveEdit" value=" Save "id="saveEdit">' +
        '</div>';
    } else {
        var content = '<p class="centered">Edit "' + oDeviceProfile.description + '"</p>' +
        '<div class="btn-wrap centered">' +
        '<label for="editdesc">Description:&nbsp;</label><input type="text" name="editdesc" value="' + oDeviceProfile.description + '" id="editdesc" class="editdesc" size="40" style="text-left: right; display: inline;"><br><br>' +
        '<label for="edit_role">Role:&nbsp;</label><select name="edit_role" id="edit_role" size="1" style="width: 50%; margin-right: auto; margin-left: auto; display: inline;" ></select><br><br>' +
        '<label for="edit_location">Location:&nbsp;</label><input type="text" name="edit_location" value="' + oDeviceProfile.values.location + '" id="edit_location" class="" size="20" style="text-align: right;"><br><br>' +
        '<label for="edit_onStandby">Standby:&nbsp;</label><select name="edit_onStandby" id="edit_onStandby" size="1" style="width: 50%; margin-right: auto; margin-left: auto; display: inline;" ></select><br><br>' +
        '<label for="editqty">Quantity:&nbsp;</label><input type="text" name="editqty" value="' + oDeviceProfile.values.quantity + '" id="editqty" class="qty" size="12" style="text-align: right;"><br><br>' +
        '<input type="button" name="cancelEdit" value="Cancel" id="cancelEdit">&nbsp;' +
        '<input type="button" name="removeEdit" value="Remove" id="removeEdit">&nbsp;' +
        '<input type="button" name="saveEdit" value=" Save "id="saveEdit">' +
        '</div>';
    }

    $.msg({
        bgPath: 'images/',
        autoUnblock: false,
        clickUnblock: false,
        content: content,
        afterBlock: function() {
            $('#edit_role').addOption(oRoles, false).selectOptions(oDeviceProfile.values.role.toString(), true);
            // store 'this' for other scope to use
            var self = this;
            var desc = $('#editdesc').val();
            var qty = $('#editqty').val();

            if (oDeviceProfile.values.daysOnPerWeek == '' || oDeviceProfile.values.daysOnPerWeek == null) {
                $('#edit_onStandby').addOption(onStandbyOpts, false).selectOptions(oDeviceProfile.values.onStandby.toString(), true);
                var onStandby = $('#edit_onStandby').val();
            }
            // qty rule
            $("#editqty").numeric({
                decimal: false,
                negative: false
            });
            // cancel
            $('#cancelEdit').bind('click',
            function() {
                self.unblock();
            });
            // remove
            $('#removeEdit').bind('click',
            function() {
                self.replace('Removing...');
                localStorage.removeItem('oDeviceProfile' + nBofDeviceProfile);
                $('#row' + nBofDeviceProfile).remove();
                self.unblock();
            });
            // save
            $('#saveEdit').bind('click',
            function() {
                desc = $('#editdesc').val();
                role = $('#edit_role').val();
                loc = $('#edit_location').val();
                onStandby = $('#edit_onStandby').val();
                qty = $('#editqty').val();

                // msg
                self.replace('Saving...');
                // apply changes to the profile
                oDeviceProfile.description = desc;
                oDeviceProfile.values.role = role;
                oDeviceProfile.values.location = loc;
                if (oDeviceProfile.values.daysOnPerWeek == '' || oDeviceProfile.values.daysOnPerWeek == null) {
                    oDeviceProfile.values.onStandby = parseFloat(onStandby);
                }
                oDeviceProfile.values.quantity = parseInt(qty);

                // save profile to cache
                localStorage.setItem('oDeviceProfile' + nBofDeviceProfile, JSON.stringify(oDeviceProfile));
				
				console.log("prev_desc= ",prev_desc)
				console.log("oDeviceProfile.description= ",oDeviceProfile.description)
                // apply changes to the interface
                $('#description' + nBofDeviceProfile + " a").replaceText(prev_desc, oDeviceProfile.description);
                $('#time_used_info' + nBofDeviceProfile).replaceText(prev_role, oDeviceProfile.values.role)
                $('#source' + nBofDeviceProfile).replaceText(prev_role, oDeviceProfile.values.role).replaceText(prev_loc, oDeviceProfile.values.location);
                if (oDeviceProfile.values.daysOnPerWeek == '' || oDeviceProfile.values.daysOnPerWeek == null) {
                    $('#standby' + nBofDeviceProfile).html(onStandbyOpts[onStandby]);
                }
                $('#totalkWh' + nBofDeviceProfile).html(parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby).toFixed(2));
                $('#totalamout' + nBofDeviceProfile).html(parseFloat(parseFloat(oDeviceProfile.values.quantity * oDeviceProfile.values.kWhPerYear * oDeviceProfile.values.onStandby) * conversion_factor).toFixed(2));
                $('#quantity' + nBofDeviceProfile).html(qty);

                self.unblock();
            });
        }
    });
}

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
                        $("#listOfBaskets").append('<tr id="basket' + id + '"><td id="basketId' + id + '" style="display:none">' + id + '</td><td id="basketDesc' + id + '" class="basketDesc">' + dsc + '</td><td><input type="button" name="loadBasket' + id + '" value="Load" id="loadBasket' + id + '" class="basket_list_btns" onclick="loadBasket(' + id + ')"></td><td><input type="button" name="removeBasket' + id + '" value="Del" id="removeBasket' + id + '" class="basket_list_btns" onclick="removeBasket(' + id + ')"></td></tr>');
                        styleTable();
                    }
                });
                self.unblock(500);
            });
        }
    });
};

// LOAD LIST OF BASKETS OF THE CURRENT USER
function loadListOfBaskets() {
    if ($.cookie('email')) {
        var user = $.cookie('email');
        $.getJSON('php_scripts/calculator/loadListOfBaskets.php', {
            user: user
        },
        function(listOfBaskets, textStatus) {
            if (listOfBaskets != null) {
                $.each(listOfBaskets.baskets,
                function(i, basket) {
                    $("#listOfBaskets").append('<tr id="basket' + basket.id + '"><td id="basketId' + basket.id + '" style="display:none">' + basket.id + '</td><td id="basketDesc' + basket.id + '" class="basketDesc">' + basket.description + '</td><td><input type="button" name="loadBasket' + basket.id + '" value="Load" id="loadBasket' + basket.id + '" class="basket_list_btns" onclick="loadBasket(' + basket.id + ')"></td><td><input type="button" name="removeBasket' + basket.id + '" value="Del" id="removeBasket' + basket.id + '" class="basket_list_btns" onclick="removeBasket(' + basket.id + ')"></td></tr>'
                    )
                });
                styleTable();
            } else {
                $("#top_left").append('<p id="none_saved" class="centered">No saved audits</p>');

            }
        });
    }
}

// LOAD SELECTED BASKET
function loadBasket(id) {
    var description = $('#basketDesc' + id).html();
    $.getJSON('php_scripts/calculator/loadBasket.php', {
        id: id
    },
    function(basket, textStatus) {
        var oBasket = JSON.parse(basket);
        var date = $.format.date(new Date(oBasket.timestamp.toString()), "ddd dd MMM yyyy, HH:mm");

        $.msg({
            bgPath: 'images/',
            autoUnblock: false,
            clickUnblock: false,
            content: '<p class="centered">This will clear all current selection and load the selection named:<br><br><b>"' + description + '"</b><br><br>created on:<br><br>' + date + '</p>' +
            '<p class="btn-wrap centered">' +
            '<input type="button" name="cancelLoadDb" value="Cancel" id="cancelLoadDb">&nbsp;' +
            '<input type="button" name="loadDb" value=" Load "id="loadDb">' +
            '</p>',
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
                    localStorage.clear();
                    $('#results_table tr:not(:first)').remove();
                    $.getJSON('php_scripts/calculator/loadBasket.php', {
                        id: id
                    },
                    function(oBasket, textStatus) {
                        localStorage.setItem('oBasket', oBasket);
                        try {
                            var oBasket = JSON.parse(localStorage.getItem('oBasket'));
                            conversion_factor = oBasket.conversion_factor;
                            conversion_factor_unit = oConversion_factors_units[conversion_factor];
                            $("#unit").html(conversion_factor_unit);
                            // LOOP THROUGH THE SELECTION
                            for (var i = 0; i < oBasket['aDeviceProfile'].length; i++) {
                                var oDeviceProfile = oBasket['aDeviceProfile'][i];
                                localStorage.setItem('oDeviceProfile' + nBofDeviceProfile, JSON.stringify(oDeviceProfile));
                                // APPEND TO THE TABLE
                                appendToTable(nBofDeviceProfile, oDeviceProfile);
                                $('.checkout').attr("disabled", false);
                                nBofDeviceProfile++;
                            };
                            $('#saveBasket').attr("disabled", false);
                            $('#clearBasket').attr("disabled", false);
                            $('#export_xml').attr("disabled", false);
                            $("#sProfileCategory").attr("disabled", false);
                            $("#conversion_factors").selectOptions(conversion_factor.toString(), true);
                            $("#data_src_details").fadeOut().html("Change conversion factor, or <br>Select a data category.<br>The data is is sourced from <a href='http://www.amee.com/'>AMEE</a> database.<br>The source and conversion factor from your selections will be displayed here.").fadeIn();
                            styleTable();
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
};

// REMOVE SELECTED BASKET FROM DATABSE
function removeBasket(id) {
    var description = $('#basketDesc' + id).html();
    $.msg({
        bgPath: 'images/',
        autoUnblock: false,
        content: '<p class="centered">This will remove  the audit:<br><br><b>"' + description + '"</b><br><br>from the database</p>' +
        '<p class="btn-wrap centered">' +
        '<input type="button" name="cancelRemove" value="Cancel" id="cancelRemove">&nbsp;' +
        '<input type="button" name="remove" value=" Delete "id="remove">' +
        '</p>',
        afterBlock: function() {
            // store 'this' for other scope to use
            var self = this;
            $('#cancelRemove').bind('click',
            function() {
                self.unblock();
            });
            $('#remove').bind('click',
            function() {
                $.get('php_scripts/calculator/removeBasket.php', {
                    id: id
                },
                function(echo) {
                    if (echo == 9) {
                        self.replace('<p style="color: red" class="centered"><b>Unexpected Error,</b><br>Failed to delete</p>');
                    } else if (echo == 1) {
                        self.replace('<p style="color: green" class="centered"><b>Audit deleted</p>');
                        $('#basket' + id).remove();
                    }
                });
                self.unblock(1000);
            });
        }
    });

};

// CLEAR CURRENT BASKET from table and cache
function clearBasket() {
    // found in the databse, would you like to delete it? // won't work, no uid...
    // clear aBasket, oDeviceProfile if exists
    // empty table
    $.msg({
        bgPath: 'images/',
        autoUnblock: false,
        clickUnblock: false,
        content: '<p class="centered">This will clear the entire selection,<br>continue?</p>' +
        '<p class="btn-wrap centered">' +
        '<input type="button" name="yesClear" value="Yes" id="yesClear">&nbsp;' +
        '<input type="button" name="noClear" value="No" id="noClear">' +
        '</p>',
        afterBlock: function() {
            // store 'this' for other scope to use
            var self = this;
            $('#yesClear').bind('click',
            function() {
                self.replace('Clearing...');
                localStorage.clear();
                $('#results_table tr:not(:first)').remove();
                $('#saveBasket').attr("disabled", true);
                $('#clearBasket').attr("disabled", true);
                $('#export_xml').attr("disabled", true);
                $("#conversion_factors").addOption(oConversion_factors, false).attr("disabled", false);
                resetCalc();
                $('.checkout').attr("disabled", true);
                self.unblock();
            });
            $('#noClear').bind('click',
            function() {
                self.replace('Canceled');
                self.unblock(500);
            });
        }
    });
};

// COMPARE SEVERAL BASKETS
function toComparePage(num) {
    checkout();
    window.location = 'amee_calc_compare.php';
}

function toMergerPage() {
	window.location = 'amee_calc_results_load.php';
}
