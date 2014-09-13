define([
    'jquery',
    'underscore',
    'backbone',
    'namespace'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.TextArea = Backbone.View.extend({
        tagName: 'div',
        className: 'control-group',
        initialize: function () {
            this.model.on("change:" + this.options.dataIndex, this.render, this);
        },
        render: function () {
            var value = this.model.get(this.options.dataIndex) || "";
            var required = (this.options.required === true) ? "required" : "";
            var colorLabel = (this.options.required === true) ? "#9C0000" : "";
            var placeholder = (this.options.placeholder) ? this.options.placeholder : "";

            var size = this.options.size || "input-large";
            var html = "";

            if (this.options.title && this.options.title != "") {
                html = "<label class='control-label' style='color:" + colorLabel + "'>" + this.options.title + "</label>\
                        <div class='controls controls-row'>\
                            <textarea id='" + this.options.dataIndex + "' name='" + this.options.dataIndex + "' class='" + size + "' placeholder='" + placeholder + "' " + required + ">" + value + "</textarea>\
                        </div>";
            } else {
                html = "<textarea id='" + this.options.dataIndex + "' name='" + this.options.dataIndex + "' class='" + size + "' placeholder='" + placeholder + "' " + required + ">" + value + "</textarea>";
            }
            this.$el.html(html);
            return this;
        },
        events: {
            'change textarea': 'setValue'
        },
        setValue: function () {
            if (this.options.setValue)
                this.options.setValue(this);
            else
                this.model.set(this.options.dataIndex, $('textarea', this.$el).val());

            if ($('textarea', this.$el.next())[0])
                $('textarea', this.$el.next()).focus();
            else if ($('input', this.$el.next())[0])
                $('input', this.$el.next()).focus();
        }
    });
});