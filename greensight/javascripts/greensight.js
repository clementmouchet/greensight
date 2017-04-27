// CONVERSION FACTORS
var oConversion_factors = {
    "0.52114": "CO2 only emissions (0.52114 Kg CO2 per kWh) - 2011 - Defra / DECC's GHG Conversion Factors",
    "0.52462": "Total Direct GHG emissions (0.52462 Kg CO2e per kWh) - 2011 - Defra / DECC's GHG Conversion Factors",
    "0.59368": "Grand Total of Direct & Indirect GHG emissions (0.59368 Kg CO2e per kWh) - 2011 - Defra / DECC's GHG Conversion Factors",
    "0.54522": "Carbon Trust Conversion to CO2e (gross CV basis) (0.54522 Kg CO2e per kWh) - 2010 - Factor for Carbon Trust surveys and loan applications.",
}

// CONVERSION FACTORS UNIT
var oConversion_factors_units = {
    "0.52114": "Kg CO2",
    "0.52462": "Kg CO2e",
    "0.59368": "Kg CO2e",
    "0.54522": "Kg CO2e"
}

// ON STANDY FACTORS
var onStandbyOpts = {
    "1.05": "never",
    "1": "sometimes",
    "0.95": "mostly",
    "0.92": "always"
}

// LOGIN FOR VALIDATION, SUBMIT AND CALLBACK
$(document).ready(function() {
    $("#login").validate({
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
    $("#login").submit(function() {
        if ($("#login").valid() == true) {
            var email = $('#email').val();
            var password = $('#password').val();
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
        } else if ($("#login").valid() == false) {
            $('#login_menu').effect("shake", {
                times: 3
            },
            50);
        }
    });
});

// LOGIN FOR VALIDATION, SUBMIT AND CALLBACK
$(document).ready(function() {
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
});

function show_login_Response(responseText) {
    if (responseText == '<p style="color: green"><b>Logged in successfully<br></p>') {
        window.location.reload();
    } else {
        $('#Login_result').html(responseText).fadeIn('slow');
        $('#login_menu').effect("shake", {
            times: 3
        },
        50);
    }
};

// LOGOUT destroy cache, rest is done in php.
$(document).ready(function($) {
    $('a[href="php_scripts/logout.php"]').click(function() {
        localStorage.clear();
    });
});


// SIGNUP FORM VALIDATION, SUBMIT AND CALLBACK
// UK poscode validation
jQuery.validator.addMethod('postcode',
function(value, element) {
    // short regex test
    var validpostcode = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][ABD-HJLNP-UW-Z]{2}$/i;
    return this.optional(element) || validpostcode.test(value);
},
'Please enter a valid UK Postcode.'
);
// form validation rules and "live" validation
$(document).ready(function() {
    $("#joinup").validate({
        rules: {
            phone: {
                required: false,
                digits: true,
                minlength: 11,
                maxlength: 12

            },
            name: {
                required: true,
                minlength: 3,
                maxlength: 50

            },
            contact: {
                required: true,
                minlength: 3,
                maxlength: 30

            },
            address1: {
                required: false,
                minlength: 7,
                maxlength: 20

            },
            address2: {
                required: false,
                maxlength: 20

            },
            town: {
                required: false,
                minlength: 3,
                maxlength: 20

            },
            postcode: {
                required: false,
                postcode: true
            },

            useremail: {
                required: true,
                email: true,
                maxlength: 50

            },
            userpassword: {
                required: true,
                minlength: 7,
                maxlength: 20

            },
            password2: {
                required: true,
                minlength: 7,
                maxlength: 20,
                equalTo: "#userpassword"
            }
        }
    });

    // validation check and submit only when valid
    $("#joinup").submit(function() {
        if ($("#joinup").valid() == true) {
            var poststr = {
                name: $('#name').val(),
                contact: $('#contact').val(),
                address1: $('#address1').val(),
                address2: $('#address2').val(),
                town: $('#town').val(),
                postcode: $('#postcode').val(),
                phone: $('#phone').val(),
                email: $('#useremail').val(),
                password: $('#userpassword').val()
            }
            $.ajax({
                url: "php_scripts/members/signup.php",
                type: "POST",
                data: poststr,
                cache: false,
                //pass output to another function
                success: show_joinup_Response
            });
            //prevent the browser from refreshing the page
            return false;
        } else {
            $('#result').html('<p style="color: red"><b>Please enter all required fields</p>').fadeIn('fast').effect("shake", {
                times: 3
            },
            50).delay(10000).fadeOut('slow');
        }
    });
});

// post-submit callback output the result
function show_joinup_Response(responseText) {
    $('#joinup').hide();
    $('#result').html(responseText).fadeIn('slow');
};

// EDIT PROFILE
// form validation rules and "live" validation
$(document).ready(function() {
    $("#edit_profile").validate({
        rules: {
            phone: {
                required: false,
                digits: true,
                minlength: 11,
                maxlength: 12

            },
            name: {
                required: true,
                minlength: 3,
                maxlength: 50

            },
            contact: {
                required: true,
                minlength: 3,
                maxlength: 30

            },
            address1: {
                required: false,
                minlength: 7,
                maxlength: 20

            },
            address2: {
                required: false,
                maxlength: 20

            },
            town: {
                required: false,
                minlength: 3,
                maxlength: 20

            },
            postcode: {
                required: false,
                postcode: true
            },

            useremail: {
                required: true,
                email: true,
                maxlength: 50

            },
            userpassword: {
                required: true,
                minlength: 7,
                maxlength: 20

            },
            password2: {
                required: true,
                minlength: 7,
                maxlength: 20,
                equalTo: "#userpassword"
            }
        }
    });

    // validation check and submit only when valid
    $("#edit_profile").submit(function() {
        if ($("#edit_profile").valid() == true) {
            var poststr = {
                name: $('#name').val(),
                contact: $('#contact').val(),
                address1: $('#address1').val(),
                address2: $('#address2').val(),
                town: $('#town').val(),
                postcode: $('#postcode').val(),
                phone: $('#phone').val(),
                email: $('#useremail').val(),
                password: $('#userpassword').val()
            }
            $.ajax({
                url: "php_scripts/members/edit_profile.php",
                type: "POST",
                data: poststr,
                cache: false,
                //pass output to another function
                success: show_profile_Response
            });
            //prevent the browser from refreshing the page
            return false;
        } else {
            $('#result').html('<p style="color: red"><b>Please enter all required fields</p>').fadeIn('fast').effect("shake", {
                times: 3
            },
            50).delay(10000).fadeOut('slow');
        }
    });
});

// post-submit callback output the result
function show_profile_Response(responseText) {
    $('#edit_profile').hide();
    $('#result').html(responseText).fadeIn('slow');
};

// DATABASE ALERT ( IF DB IS DOWN )
function databaseAlert() {
    $(document).ready(function() {
        $.msg({
            bgPath: 'images/',
            autoUnblock: false,
            content: '<p class="centered" style="color:red;"><b>WHOOPS, IT SEEMS THE DATABASE SEVER IS DOWN</b><br><br><i>Sorry for any inconvenience this may cause you. Please try again later.</p>',
            beforeUnblock: function() {
                window.location = "home.php";
            }
        });
    });
}

// EXPORT TO XML
function exportToXML() {
    if (!localStorage.getItem('oBasket')) {
        checkout();
    };
    var oBasket = JSON.parse(localStorage.getItem('oBasket'));
    var options = {
        formatOutput: true,
        rootTagName: 'audit',
        replace: [{
            'aDeviceProfile': 'profile'
        },
        {
            'timestamp': 'date'
        },
        {
            'aDeviceProfile.values.onStandby': 'standby_factor'
        },
        {
            'aDeviceProfile.values.modified': 'source_date'
        }],
        nodes: ['aDeviceProfile.description', 'aDeviceProfile.values', 'timestamp', 'conversion_factor', 'conversion_factor_unit', 'aDeviceProfile.values.type', 'aDeviceProfile.values.quantity', 'aDeviceProfile.values.role', 'aDeviceProfile.values.location', 'aDeviceProfile.values.kWhPerYear', 'aDeviceProfile.values.weeksOnPerYear', 'aDeviceProfile.values.daysOnPerWeek', 'aDeviceProfile.values.onPerDay', 'aDeviceProfile.values.offPerDay', 'aDeviceProfile.values.standbyPerDay', 'aDeviceProfile.values.onStandby', 'aDeviceProfile.values.unit', 'aDeviceProfile.values.perUnit', 'aDeviceProfile.values.source', 'aDeviceProfile.values.source', 'aDeviceProfile.values.modified'],
        ignore: ['aDeviceProfile.values.path']
        // since our root tag will be 'course' now, having attribute
        // with same name might be missleading - let's change it too
    };
    var doctype = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<!DOCTYPE audit [' +
    '<!ELEMENT audit (profile+ , date , conversion_factor , conversion_factor_unit)>' +
    '<!ELEMENT profile (description , values)>' +
    '<!ELEMENT description (#PCDATA)>' +
    '<!ELEMENT values (type , quantity , role, location, kWhPerYear , weeksOnPerYear, daysOnPerWeek, onPerDay , offPerDay, standbyPerDay , standby_factor , unit , perUnit , source , source_date)>' +
    '<!ELEMENT type (#PCDATA)>' +
    '<!ELEMENT quantity (#PCDATA)>' +
	'<!ELEMENT role (#PCDATA)>' +
	'<!ELEMENT location (#PCDATA)>' +
    '<!ELEMENT kWhPerYear (#PCDATA)>' +
	'<!ELEMENT weeksOnPerYear (#PCDATA)>' +
	'<!ELEMENT daysOnPerWeek (#PCDATA)>' +
	'<!ELEMENT onPerDay (#PCDATA)>' +
	'<!ELEMENT offPerDay (#PCDATA)>' +
	'<!ELEMENT standbyPerDay (#PCDATA)>' +
    '<!ELEMENT standby_factor (#PCDATA)>' +
    '<!ELEMENT unit (#PCDATA)>' +
    '<!ELEMENT perUnit (#PCDATA)>' +
    '<!ELEMENT source (#PCDATA)>' +
    '<!ELEMENT source_date (#PCDATA)>' +
    '<!ELEMENT date (#PCDATA)>' +
    '<!ELEMENT conversion_factor (#PCDATA)>' +
    '<!ELEMENT conversion_factor_unit (#PCDATA)>' +
    ']>';
    var xml = $.json2xml(oBasket, options);
    // console.log(doctype+xml);
    var xmlfile = doctype + xml;
    if ($.cookie('user')) {
        var filename = $.cookie('user') + '_audit_' + $.format.date(new Date(oBasket.timestamp.toString()), "dd.MM.yy-HH.mm");
    } else {
        var filename = 'guest_audit_' + $.format.date(new Date(oBasket.timestamp.toString()), "dd.MM.yy-HH.mm");
    }
    $.ajax({
        url: 'php_scripts/calculator/download_audit.php?filename=mySpreadsheet&format=xml&content=attachment',
        type: 'POST',
        dataType: 'html',
        data: {
            xml: xmlfile,
            filename: filename
        },
        complete: function(xhr, textStatus) {
            //called when complete
            },
        success: function(echo, textStatus, xhr) {
            //called when successful
            $.msg({
                bgPath: 'images/',
                autoUnblock: false,
                clickUnblock: false,
                content: '<p class="centered">To download the XML file, click download or righ click on the link to save the file</p>' +
                '<p class="btn-wrap centered">' +
                '<input type="button" name="download_xml" value="Download" id="download_xml"><br><br>' +
                '<a href="' + echo + '">' + echo + '</a><br><br>' +
                '<input type="button" name="close" value="Close" id="close">' +
                '</p>',
                afterBlock: function() {
                    // store 'this' for other scope to use
                    var self = this;
                    $('#download_xml').bind('click',
                    function() {
                        window.open(echo, 'Download');
                    });
                    $('#close').bind('click',
                    function() {
                        self.unblock();
                    });
                }
            });
        },
        error: function(xhr, textStatus, errorThrown) {
            //called when there is an error
            alert(errorThrown);
        }
    });
}

