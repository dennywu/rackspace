define(['jquery',
        'underscore',
        'backbone',
        'namespace'],
    function ($, _, Backbone, ns) {
        ns.define("HomeJS.components");
        HomeJS.components.SideBar = Backbone.View.extend({
            className: "homejs-sidebar nav-collapse sidebar-nav",
            initialize: function () {
                this.$el.id = (this.options.id) ? this.options.id : "SideBar";
                var html = "<ul class='nav nav-tabs nav-stacked main-menu'>";
                if (this.options.title)
                    html += "<li class='nav-header hidden-tablet'>" + this.options.title + "</li>";
                html += "</ul";
                this.$el.html(html);
                this.options.items.forEach(this.addItem, this);
            },
            render: function () {
                return this;
            },
            addItem: function (item) {
                var i = new HomeJS.components.SideBar.Item(item);
                $("ul.main-menu", this.$el).append(i.render().el);
            }
        });

        HomeJS.components.SideBar.Item = Backbone.View.extend({
            tagName: 'li',
            initialize: function () {
                this.$el.attr('id', this.options.id);
            },
            render: function () {
                var classname = this.options.class ? "class = '" + this.options.class + "'" : "";
                var html = "<a href='#'><i " + classname + "></i><span class='hidden-tablet'>" + this.options.title + "</span></a>";
                this.$el.html(html);
                return this;
            },
            events: {
                'click': 'clicked',
                'hover': 'hovered',
                'mouseleave': 'mouseleaved'
            },
            clicked: function () {
                $('.active a i', $(".homejs-sidebar")).removeClass('icon-white');
                $(".active", $(".homejs-sidebar")).removeClass('active');
                this.$el.addClass('active');
                $('i', this.$el).addClass('icon-white');
                this.action();
            },
            hovered: function () {
                if (this.$el.attr('class') != "active")
                    $('i', this.$el).addClass('icon-white');
            },
            mouseleaved: function () {
                if (this.$el.attr('class') != "active")
                    $('i', this.$el).removeClass('icon-white');
            },
            action: function () {
                this.options.action();
            }
        });
    });