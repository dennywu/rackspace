define([
    'jquery',
    'underscore',
    'backbone',
    'namespace'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.ComboField = Backbone.View.extend({
        tagName: 'div',
        className: 'control-group',
        initialize: function () {
            this.collection.on('reset', this.render, this);
            //this.model.on("change:" + this.options.dataIndex, this.render, this);
        },
        render: function () {
            var value = this.model.get(this.options.dataIndex) || "";
            this.id = this.options.dataIndex;
            var size = this.options.size || "input-xlargeComboField";
            var html = "";
            if (this.options.title && this.options.title != "") {
                html = "<label class='control-label'>" + this.options.title + "</label>\
                        <div class='controls controls-row'>\
                            <select class='" + size + "'></select>\
                            <div class='help-inline'></div>\
                        </div>";
            } else {
                html = "<select class='" + size + "'></select>";
            }
            this.$el.html(html);
            this.firstChild = true;
            this.collection.forEach(this.addOption, this);
            return this;
        },
        addOption: function (item) {
            var value = item.get(this.options.displayItemField.value);
            var name = item.get(this.options.displayItemField.name);
            var selected = "";
            if (this.options.selectedItem) {
                selected = (item.get(this.options.selectedItem.field) == this.model.get(this.options.selectedItem.value)) ? "selected" : "";
            }
            else {
                if (this.firstChild == true) {
                    selected = "selected";
                    this.setValue(item);
                    this.firstChild = false;
                }
            }
            var html = "<option value='" + value + "' " + selected + ">" + name + "</option>";
            $("select", this.$el).append(html);
        },
        events: {
            'change select': 'valueChanged'
        },
        valueChanged: function () {
            var itemSelected = $('select option:selected', this.$el).val();
            var propValue = this.options.displayItemField.value;
            var item = _.find(this.collection.toJSON(), function (a) { return a[propValue] == itemSelected });
            this.setValue(item);
        },
        setValue: function (item) {
            if (this.options.setModel)
                this.options.setModel(this.model, item);
            else
                this.model.set(this.options.dataIndex, item);
        }
    });
    return HomeJS.components.ComboField;
});