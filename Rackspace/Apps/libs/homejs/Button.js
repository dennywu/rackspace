define(['jquery',
        'underscore',
        'backbone',
        'namespace', 
        'libs/homejs/buttontype.js'],
    function ($, _, Backbone, ns) {
        ns.define("HomeJS.components");
        HomeJS.components.Button = Backbone.View.extend({
            tagName: "button",
            className: "homejs-btn btn btn-small",
            initialize: function () {
                this.$el.addClass("floatleft");
                if (this.options.typeButton)
                    this.$el.addClass(this.options.typeButton); 
                if (this.options.size)
                    this.$el.addClass(this.options.size);
                if (this.options.float) {
                    if (this.options.float.toLowerCase() === "right")
                        this.$el.addClass("floatright");
                }
                var title = (this.options.title === undefined) ? "Button" : this.options.title;
                var iconColor = (this.options.iconColor) ? this.options.iconColor : "";
                var icon = (this.options.icon) ? "<i class='" + this.options.icon + " " + iconColor + "'></i>" : "";
                var html = (title === "") ? title : "<span>" + title + "</span";
                this.$el.html(icon + html);
                this.events = this.options.events;
            }
        });
    });