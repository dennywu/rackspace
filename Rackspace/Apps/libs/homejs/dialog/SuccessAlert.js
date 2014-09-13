define([
    'jquery',
    'underscore',
    'backbone',
    'namespace'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.SuccessAlert = function (msg) {
        var html = "";
        html += "<div class='modal-dialog'>";
        html += "<div class='toolbar'><div class='logo'><img src='../../Content/img/homesoft-1.png'/></div><title>Pesan</title></div>";
        html += "<fieldset class='textbox'><section>" + msg + "</section>" +
                    "<button class='alert-success btn btn-success'>OK</button></fieldset>";
        html += "</div>";
        $('body').append(html);

        var box = $('.modal-dialog');
        $(box).fadeIn(200);
        var popMargTop = ($(box).height() + 24) / 2;
        var popMargLeft = ($(box).width() + 24) / 2;
        $(box).css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });
        $('body').append('<div id="mask"></div>');
        $('#mask').fadeIn(2000);
        $('button.alert-success').focus();
        $("#mask, button.alert-success").click(function () {
            $('#mask , .modal-dialog').fadeOut(300, function () {
                $('#mask').remove();
            });
        });
        $(".modal-dialog").show();
    }
});