define([
    'jquery',
    'underscore',
    'backbone',
    'namespace',
    '../../highcharts/highcharts'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.Chart = Backbone.View.extend({
        initialize: function () {
            this.collection.on('reset', this.render, this);
            this.collection.on('showLoading', this.showLoading, this);
            this.collection.on('hideLoading', this.hideLoading, this);
        },
        render: function () {
            this.$el.html(this.createChart());
            this.options.attr.data(this);
            this.createChart();
            return this;
        },
        createChart: function () {
            var html = new Highcharts.Chart(this.options.attr.view);
            return html;
        }
        //        ,
        //        showLoading: function () {
        //            this.createChart().showLoading();
        //        },
        //        hideLoading: function () {
        //            this.createChart().hideLoading();
        //        }
    });
});