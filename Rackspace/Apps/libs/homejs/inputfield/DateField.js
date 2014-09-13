define([
    'jquery',
    'underscore',
    'backbone',
    'namespace',
    '../../Date',
    '../../bootstrap/bootstrap-datepicker'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.DateField = Backbone.View.extend({
        tagName: 'div',
        className: 'control-group inline homejs-datefield',
        initialize: function () {
            this.model.on('change', this.changeDate, this);
        },
        render: function () {
            var currentDate;
            if (this.options.date) {
                currentDate = this.options.date;
            }
            else {
                if (this.options.dataIndex) {
                    currentDate = this.model.get(this.options.dataIndex);
                }
                else {
                    currentDate = getCurrentDate();
                    this.model.set(this.options.dataIndex, currentDate);
                }
            }
            var sizeForm = this.options.sizeForm || "input-medium";
            var html = "";
            if (this.options.title) {
                html += "<label class='control-label'>" + this.options.title + "</label>";
            }
            html += "<div class='controls-row input-append date' id='dp3' data-date='" + currentDate + "' data-date-format='dd-mm-yyyy' >\
                        <input type='text' size='16' class='" + sizeForm + "' value='" + currentDate + "' readonly/>\
                        <span class='add-on' title='pilih tanggal'><i class='icon-calendar'></i></span>\
                        </div>\
                    </div>";

            this.$el.html(html);

            var self = this;
            $('#dp3', this.$el).datepicker().on('changeDate', function (e) {
                jQuery('.datepicker', this.$el).hide();
                self.setValue();
            });
            return this;
        },
        setValue: function () {
            this.model.set(this.options.dataIndex, jQuery('input', this.$el).val());
        },
        changeDate: function () {
            jQuery('input', this.$el).val(this.model.get(this.options.dataIndex));
        }
    });
});