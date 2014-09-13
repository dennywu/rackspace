define([
    'jquery',
    'underscore',
    'backbone',
    'namespace',
    '../../libs/Currency'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.ButtonField = Backbone.View.extend({
        className: "controls-group",
        initialize: function () {
            this.model.on("change", this.render, this);
        },
        render: function () {
            var iconCls = "icon-pencil icon-white";
            if (this.options.iconCls)
                iconCls = this.options.iconCls;
            var title = "";
            if (this.options.title)
                title = this.options.title;

            var value = this.parseData(this.model.get(this.options.dataIndex));
            if (this.options.renderer) {
                value = this.options.renderer(value);
            }

            var styles = "float:left;margin-right:65px;";
            if (this.options.style)
                styles = this.options.style;
            var html = "";
            if (this.options.labelname)
                html += "<label class='control-label' style='" + styles + "'>" + this.options.labelname + "</label>";
            html += "<small>" + value + "</small> <button class='btn btn-mini btn-success btn-change' style='visibility: hidden' title='" + title + "' ><i class='" + iconCls + "'></i></button>";
            this.$el.html(html);
            return this;
        },
        events: {
            'click .btn-change': 'edit',
            'hover': 'showEditButton',
            'mouseleave': 'hideEditButton'
        },
        showEditButton: function () {
            $(".btn-change", this.$el).css("visibility", "visible");
        },
        hideEditButton: function () {
            $(".btn-change", this.$el).css("visibility", "hidden");
        },
        edit: function (e) {
            e.preventDefault();
            this.options.action.execute();
        },
        parseData: function (data) {
            return data ? data : 0;
        }
    });
});