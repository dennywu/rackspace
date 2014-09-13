define([
    'jquery',
    'underscore',
    'backbone',
    'namespace'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.Confirm = function (spec) {
        var html = "";
        html += "<div class='popup confirm'>";
        html += "<div class='toolbar'><div class='logo'></div><title>Confirmation</title></div>";
        html += "<fieldset class='textbox'><section>" + spec.message + "</section>" +
                    "<div class='toolbar-footer'>"+
                    "<button class='alert-confirm btn btn-success'>Yes</button>" +
                    "<button class='alert-cancel btn btn-danger'>No</button>" +
                    "</div>"+
                    "</fieldset>";
        html += "</div>";
        $('body').append(html);

        var box = $('.popup.confirm');
        $(box).fadeIn(200);
        var popMargTop = ($(box).height() + 24) / 2;
        var popMargLeft = ($(box).width() + 24) / 2;
        $(box).css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });
        $('body').append('<div id="mask"></div>');
        $('#mask').fadeIn(2000);
        $('button.alert-confirm').focus();
        $("#mask, button.alert-cancel").click(function () {
            $('#mask , .popup').fadeOut(300, function () {
                $('#mask').remove();
            });
        });

        $("button.alert-confirm").click(function () {
            $('#mask , .popup').fadeOut(300, function () {
                $('#mask').remove();
            });
            spec.action();
        });
        $(".popup.confirm").show();
    }
    return HomeJS.components.Confirm;
});