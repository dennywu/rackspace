define([
    'jquery',
    'underscore',
    'backbone',
    'namespace'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.ModalDialog = Backbone.View.extend({
        tagName: 'div',
        id: "homejs-modal-dialog",
        className: 'modal-dialog homejs-modal-dialog',
        initialize: function () {
            var title = this.options.title || "HomeJS Modal Dialog";
            var html = "<div class='toolbar'><div class='logo'><img src='../../Content/img/homesoft-1.png'/></div><title>" + title + "</title></div>" +
                       "<fieldset class='textbox'>" +
                       "<section class='modal-dialog-body'>" +
                       "</section>" +
                       "</fieldset>";

            this.$el.html(html);
            $("section.modal-dialog-body", this.$el).html(this.options.view.render().el);

            if ($(".homejs-modal-dialog").length > 0) {
                $(".homejs-modal-dialog").remove();
            }
            $(document.body).append(this.$el);
        },
        render: function () {
        },
        show: function () {
            var box = this.$el;
            $(box).fadeIn(200);
            var popMargTop = ($(box).height() + 24) / 2;
            var popMargLeft = ($(box).width() + 24) / 2;
            $(box).css({
                'margin-top': -popMargTop,
                'margin-left': -popMargLeft
            });
            $('body').append('<div id="mask"></div>');
            $('#mask').fadeIn(2000);
            this.$el.show();
            var self = this;
            $("#mask").click(function () {
                self.destroy();
            });
        },
        destroy: function () {
            $('#mask , .modal-dialog').fadeOut(300, function () {
                $('#mask').remove();
                $('#homejs-modal-dialog').remove();
            });
        }
    });
});