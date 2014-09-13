define([
    'jquery',
    'underscore',
    'backbone',
    'namespace'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.DetailPanel = Backbone.View.extend({
        className: 'container-fluid',
        initialize: function () {
            this.$el.html("<div class='row-fluid'></div>");
        },
        render: function () {
            if (this.options.leftSection) {
                var leftDetailPanel = new HomeJS.components.LeftDetailPanel({ attr: this.options.leftSection });
                $(".row-fluid", this.$el).html(leftDetailPanel.render().el);
            }
            if (this.options.rightSection) {
                var rightDetailPanel = new HomeJS.components.RightDetailPanel({ attr: this.options.rightSection });
                $(".row-fluid", this.$el).append(rightDetailPanel.render().el);
            }
            return this;
        }
    });

    HomeJS.components.LeftDetailPanel = Backbone.View.extend({
        className: 'span10 left-detail-panel',
        initialize: function () {
            //this.classHeader = "span" + 12 / this.options.attr.headers.length;
            //this.classFooter = "span" + 12 / this.options.attr.footers.length;
        },
        render: function () {
            this.createCaption();
            this.createHeader();
            this.createBody();
            this.createFooter();
            return this;
        },
        createCaption: function () {
            var captionDetailPanel = new HomeJS.components.DetailPanel.Caption({
                attr: {
                    title: this.options.attr.caption.title,
                    action: this.options.attr.caption.action
                }
            });
            this.$el.prepend(captionDetailPanel.render().el);
        },
        createHeader: function () {
            var html = "<div class='row' id='header-detail-container'></div>";
            this.$el.append(html);
            if (this.options.attr.headers)
                this.options.attr.headers.forEach(this.addHeader, this);
        },
        addHeader: function (headerView) {
            $("div#header-detail-container", this.$el).append(
            headerView.render({ class: this.classHeader }).el
         );
        },
        createBody: function () {
            var html = "<div class='row' id='item-detail-container'></div>";
            this.$el.append(html);
            if (this.options.attr.item)
                $("#item-detail-container", this.$el).html(this.options.attr.item.render().el);
        },
        createFooter: function () {
            if (this.options.attr.footers) {
                var html = "<div class='row' id='footer-detail-container'></div>";
                this.$el.append(html);
                this.options.attr.footers.forEach(this.addFooter, this);
            }
        },
        addFooter: function (footerView) {
            $("div#footer-detail-container", this.$el).append(
            footerView.render({ class: this.classFooter }).el
         );
        }
    });

    HomeJS.components.RightDetailPanel = Backbone.View.extend({
        className: 'span2 right-detail-panel',
        render: function () {
            if (this.options.attr.items)
                this.options.attr.items.forEach(this.addItem, this);
            return this;
        },
        addItem: function (view) {
            this.$el.append(view.render().el);
        }
    });

    HomeJS.components.DetailPanel.Caption = Backbone.View.extend({
        className: 'row caption-detail-panel headercolor',
        render: function () {
            var html = "<span class='title'>" + this.options.attr.title + "</span>" +
                       "<div class='floatright menu-caption-detail-panel'>" +
                       "<button class='btn btn-mini btn-warning'><i class='icon-hand-left icon-white'></i>Back</button>" +
                       "</div>";
            this.$el.html(html);
            return this;
        },
        events: {
            'click button': 'back'
        },
        back: function () {
            if (this.options.attr.action) {
                this.options.attr.action();
            } else {
                window.history.back();
            }
        }
    });

    HomeJS.components.DetailPanel.Toolbar = Backbone.View.extend({
        className: 'toolbar-form-detail-panel',
        initialize: function () {
            this.model.on('change', this.render, this);
            this.defaultIconCls = "icon-fire";
        },
        render: function () {
            var html = "<ul class='nav nav-tabs nav-stacked'></ul>";
            this.$el.html(html);
            //this.createTitle(this.options.title);
            this.options.buttons.forEach(this.addButton, this);

            return this;
        },
        createTitle: function (title) {
            $("ul", this.$el).append("<li><a class='active'>" + title + "</a></li>");
        },
        addButton: function (spec) {
            var iconCls = (spec.iconClass === undefined) ? this.defaultIconCls : spec.iconClass;
            var tooltip = (spec.tooltip == undefined) ? "" : spec.tooltip;
            if (spec.renderer) {
                if (spec.renderer(this.model)) {
                    $("ul", this.$el).append("<li id='" + spec.id + "' title='" + tooltip + "'><a><i class='" + iconCls + "'></i>" + spec.title + "</a></li>");
                }
            } else {
                $("ul", this.$el).append("<li id='" + spec.id + "' title='" + tooltip + "'><a><i class='" + iconCls + "'></i>" + spec.title + "</a></li>");
            }
            $("#" + spec.id, this.$el).click(spec.action);
            $("#" + spec.id, this.$el).hover(function () {
                $("#" + spec.id + " i", this.$el).addClass('icon-white');
            });
            $("#" + spec.id, this.$el).mouseleave(function () {
                $("#" + spec.id + " i", this.$el).removeClass('icon-white');
            });
        }
    });
});