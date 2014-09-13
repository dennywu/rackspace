define(['jquery',
        'underscore',
        'backbone',
        'namespace'],
    function ($, _, Backbone, ns) {
        ns.define("HomeJS.components");
        HomeJS.components.Breadcrumb = Backbone.View.extend({
            className: "homejs-breadcrumb",
            initialize: function () {
                this.$el.id = (this.options.id) ? this.options.id : "breadcrumb";
            },
            render: function () {
                var classname = (this.options.icon) ? "class='" + this.options.icon + "'" : "";
                var html = "<ul class='breadcrumb'><li><a href='#'><i " + classname + "></i>" + this.options.title + "</a></li>";
                this.$el.html(html);
                return this;
            }
        });
        return HomeJS.components.Breadcrumb;
    });