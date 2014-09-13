define([
    'jquery',
    'underscore',
    'backbone',
    'namespace',
    '../homejs/FormLayout'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.FormPanel = Backbone.View.extend({
        tagName: 'form',
        className: 'homejs-formpanel',
        initialize: function () {
            var formLayout = this.options.formLayout || HomeJS.components.FormLayout.HORIZONTAL;
            this.$el.addClass(formLayout);
            if (this.options.class)
                this.$el.addClass(this.options.class);
        },
        render: function () {
            var html = "";
            if (this.options.legend) {
                html += "<fieldset>" +
                            "<legend>" + this.options.legend + "</legend>" +
                        "</fieldset>";
            }
            this.$el.html(html);
            this.options.items.forEach(this.addItem, this);
            if (this.options.vertical == true) {
                this.$el.addClass("clearfix");
            }
            return this;
        },
        addItem: function (item) {
            item.render();
            if (this.options.vertical == true)
                item.$el.addClass("vertical");

            if (this.options.legend) {
                this.$el.find("fieldset").append(item.render().el);
            }
            else {
                this.$el.append(item.el);
            }
        }
    });
});