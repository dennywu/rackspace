define([
    'jquery',
    'underscore',
    'backbone',
    'namespace'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.ErrorAlert = function (msg) {
        var html = "";
        html += "<div class='popup error'>";
        html += "<div class='toolbar'><div class='logo'><img src='../../Content/img/error.png'/></div><title>Pesan Kesalahan</title></div>";
        html += "<fieldset class='textbox'><section>" + msg + "</section>" +
                    "<button class='alert-error btn btn-danger'>OK</button></fieldset>";
        html += "</div>";
        $('body').append(html);

        var box = $('.popup.error');
        $(box).fadeIn(200);
        var popMargTop = ($(box).height() + 24) / 2;
        var popMargLeft = ($(box).width() + 24) / 2;
        $(box).css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });
        $('body').append('<div id="mask"></div>');
        $('#mask').fadeIn(2000);
        $('button.alert-error').focus();
        $("#mask, button.alert-error").click(function () {
            $('#mask , .popup').fadeOut(300, function () {
                $('#mask').remove();
            });
        });
        $(".popup.error").show();
    }
});