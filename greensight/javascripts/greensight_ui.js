// HOME FEATURED SLIDER BEHAVIOR
$(document).ready(function(){
	$("#featured").tabs({fx:{opacity: "toggle"}}).tabs("rotate", 7000, true);
});

// DROPDOWN MENUS BEHAVIOR
$(document).ready(function() {
    $(function() {
        $('.dropdown').each(function() {
            $(this).parent().eq(0).hover(function() {
                $('.dropdown:eq(0)', this).fadeIn();
            },
            function() {
                $('.dropdown:eq(0)', this).fadeOut();
            });

        });
    });
});

// LOGIN DROPDOWN MENU BEHAVIOR
$(document).ready(function() {
    $('.login').click(function(e) {
        e.preventDefault();
        $("#login_menu").toggle();
        $(".login").toggleClass("menu-open");
    });

	$('a[href=#login]').click(function() {
        $("#login_menu").toggle();
        $(".login").toggleClass("menu-open");
	});
	
    $("#login_menu").mouseup(function() {
        return false;
    });
    $(document).mouseup(function(e) {
        if ($(e.target).parent("a.login").length == 0) {
            $(".login").removeClass("menu-open");
            $("#login_menu").fadeOut();
        }
    });
});

// SIDEBAR BEHAVIOR
$(document).ready(function() {
    $(function() {
        var offset = $("#left").offset();
        var topPadding = 15;
        $(window).scroll(function() {
            if ($(window).delay(400).scrollTop() > offset.top) {
                $("#left").stop().delay(400).animate({
                    marginTop: $(window).delay(400).scrollTop() - offset.top + topPadding
                },
                'slow');
                $("#top").fadeIn();
            } else {
                $("#left").stop().delay(400).animate({
                    marginTop: 0
                });
                $("#top").fadeOut();
            };
        });
    });
});

// SIDEBAR ACCORDION BEHAVIOR
$(document).ready(function() {
    $(function() {
		$("#accordion").accordion({ event: 'click', active: true, collapsible: true });
	});
});

// TOP BUTTON ONLY DISPLAYED WHEN NEEDED
$(document).ready(function($) {
    $('a[href=#top]').click(function() {
        $('html, body').animate({
            scrollTop: 0
        },
        'slow');
        return false;
    });
});

// APPLY STYLE TO THE TABLE
function styleTable(rows) {
    $(".stripped tr").mouseover(function() {
        $(this).addClass("over");
    }).mouseout(function() {
        $(this).removeClass("over");
    });
	if (rows != 'not_alt') {
		$(".stripped tr:even").addClass("alt");
		$(".stripped tr:odd").removeClass("alt");
	};
};

// INFORMED CONSENT POPUP
function openMe(title, content) {
    var popup = window.open('','Informed_Consent','height=570,width=700,left=350,top=50,resizable=yes,scrollbars=yes');
    popup.document.write("<h4 style='font: bold 20pt Cambria, Georgia, Verdana; text-align:center;text-transform:uppercase;'>" + title + "</h4>" + "<p style='font: 110% Cambria, Georgia, Verdana;text-align:justify; margin:1em;'>" + content + "</p>");
};