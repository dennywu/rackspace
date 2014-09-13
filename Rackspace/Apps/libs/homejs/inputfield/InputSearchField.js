define([
    'jquery',
    'underscore',
    'backbone',
    'namespace'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.InputSearchField = Backbone.View.extend({
        tagName: 'div',
        className: 'input-append homejs-search-field',
        initialize: function () {
            var placeholder = (this.options.placeholder) ? this.options.placeholder : "";
            var html = "<input type='search' class='span2 search-query' placeholder='" + placeholder + "'><button id='btn-search' class='btn btn-info'><i class='icon-search icon-white'></i></button>";
            this.$el.html(html);
            return this;
        },
        events: {
            'click button#btn-search': 'search',
            'keydown input[type=search]': 'onsearch'
        },
        onsearch: function (ev) {
            if (ev.keyCode == 13) {
                ev.preventDefault();
                this.search();
            }
        },
        search: function () {
            var key = $("input[type='search']", this.$el).val();
            this.options.action(key);
        }
    });
});