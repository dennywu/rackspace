define([
    'jquery',
    'underscore',
    'backbone',
    'namespace',
    '../../backbone/utils',
    '../../bootstrap/bootstrap-typeahead'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.Typeahead = Backbone.View.extend({
        tagName: 'div',
        className: 'control-group',
        initialize: function () {
            this.model.on("change:" + this.options.dataIndex, this.render, this);
            this.collection.on('reset', this.render, this);
        },
        render: function () {
            var self = this;
            var value = this.model.get(this.options.dataIndex) || "";
            var required = (this.options.required === true) ? "required" : "";
            var colorLabel = (this.options.required === true) ? "#9C0000" : "";
            var placeholder = (this.options.placeholder) ? this.options.placeholder : "";
            this.id = this.options.dataIndex;

            var type = this.options.type || "text";
            var size = this.options.size || "input-large";
            var html = "";

            if (this.options.title && this.options.title != "") {
                html = "<label class='control-label' style='color:" + colorLabel + "'>" + this.options.title + "</label>\
                        <div class='controls controls-row'>\
                            <input type='" + type + "' id='" + this.options.dataIndex + "' name='" + this.options.dataIndex + "' class='typeahead " + size + "' placeholder='" + placeholder + "' value='" + value + "'  " + required + " data-provide='typeahead' autocomplete='off'/>\
                            <div class='help-inline'></div>\
                        </div>";
            } else {
                html = "<input type='" + type + "' id='" + this.options.dataIndex + "' name='" + this.options.dataIndex + "' class='typeahead " + size + "' placeholder='" + placeholder + "' value='" + value + "'  " + required + " data-provide='typeahead' autocomplete='off'/><div class='help-inline'></div>";
            }
            this.$el.html(html);
            
            var source = [];
            this.collection.forEach(function (t) {
                source.push(t.get(self.options.dataIndexTypeAhead));
            });
            $("input.typeahead", this.$el).typeahead({
                source: source
                //source: this.collection.toJSON()
            });
            return this;
        },
        events: {
            'change input': 'setValue'
        },
        setValue: function () {
            if (this.options.setValue) {
                this.options.setValue(this);
            }
            else {
                var val = $('input', this.$el).val();
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