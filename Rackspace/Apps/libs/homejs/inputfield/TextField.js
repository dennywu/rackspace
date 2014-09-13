define([
    'jquery',
    'underscore',
    'backbone',
    'namespace',
    '../../backbone/utils'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.TextField = Backbone.View.extend({
        tagName: 'div',
        className: 'control-group',
        initialize: function () {
            this.model.on("change:" + this.options.dataIndex, this.render, this);
        },
        render: function () {
            if (this.options.onshow) {
                if (!this.options.onshow(this.model)) {
                    return this;
                }
            }
            var value = this.model.get(this.options.dataIndex) || "";
            var required = (this.options.required === true) ? "required" : "";
            var colorLabel = (this.options.required === true) ? "#9C0000" : "";
            var readonly = (this.options.readonly === true) ? "readonly" : "";
            var placeholder = (this.options.placeholder) ? this.options.placeholder : "";
            this.id = this.options.dataIndex;

            var type = this.options.type || "text";
            type = (type.toLowerCase() == 'price') ? 'text' : type;
            var size = this.options.size || "input-large";
            var html = "";

            if (this.options.onrendervalue) {
                value = this.options.onrendervalue(this.model);
            }

            if (this.options.title && this.options.title != "") {
                html = "<label class='control-label' style='color:" + colorLabel + "'>" + this.options.title + "</label>\
                        <div class='controls controls-row'>\
                            <input type='" + type + "' id='" + this.options.dataIndex + "' name='" + this.options.dataIndex + "' class='" + size + "' placeholder='" + placeholder + "' value='" + value + "'  " + required + " " + readonly + " autocomplete='off'/>\
                            <div class='help-inline'></div>\
                        </div>";
            } else {
                html = "<input type='" + type + "' id='" + this.options.dataIndex + "' name='" + this.options.dataIndex + "' class='" + size + "' placeholder='" + placeholder + "' value='" + value + "'  " + required + " " + readonly + " autocomplete='off'/><div class='help-inline'></div>";
            }
            this.$el.html(html);

            var self = this;
            if (this.options.type && this.options.type.toLowerCase() == "price") {
                require([
                    '../../libs/numbering/autonumeric'
                ], function () {
                    var opt = { aPad: false };
                    self.$el.find('input').autoNumeric(opt).removeAttr('value').autoNumericSet(value);
                })

            }
            return this;
        },
        events: {
            'change input': 'setValue',
            'keypress input': 'keypress'
        },
        keypress: function (ev) {
            if (ev.keyCode == 13) {
                ev.preventDefault();
            }
        },
        setValue: function () {
            if (this.options.setValue) {
                this.options.setValue(this);
            }
            else {
                var val;
                if (this.options.type && this.options.type.toLowerCase() == "price")
                    val = $('input', this.$el).autoNumericGet();
                else
                    val = $('input', this.$el).val();
                this.model.set(this.options.dataIndex, val);
            }

            if (this.model.validateItem) {
                var check = this.model.validateItem(this.options.dataIndex);
                if (check.isValid === false) {
                    utils.addValidationError(this.options.dataIndex, check.message);
                } else {
                    utils.removeValidationError(this.options.dataIndex);
                }
            }
        }
    });
});