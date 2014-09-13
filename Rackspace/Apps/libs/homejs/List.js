define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        '../../libs/homejs/Button',
        '../../libs/homejs/ButtonType',
        '../../libs/homejs/DataTable',
        '../../libs/homejs/inputfield/InputSearchField'],
    function ($, _, Backbone, ns) {
        ns.define("HomeJS.components");
        HomeJS.components.List = Backbone.View.extend({
            className: "homejs-list",
            initialize: function () {
                if (this.collection)
                    this.collection.on("reset", this.render, this);
                this.$el.id = (this.options.id) ? this.options.id : "ListView";
                this.createHeader();
                this.createToolbar();
                this.createTable();
                this.createShowMore();
            },
            render: function () {
                return this;
            },
            createHeader: function () {
                if (this.options.header) {
                    this.$el.append(new HomeJS.components.List.Header(this.options.header).el);
                }
            },
            createToolbar: function () {
                if (this.options.toolbar && this.options.toolbar.length > 0)
                    this.$el.append(new HomeJS.components.List.Toolbar(this.options).el);
            },
            createTable: function () {
                if (this.options.list) {
                    this.$el.append(new HomeJS.components.DataTable(this.options.list).render().el);
                }
            },
            createShowMore: function () {
                if (this.options.showmore) {
                    this.$el.append(new HomeJS.components.List.ShowMore({
                        model: this.options.showmore,
                        collectionList: this.options.list.collection
                    }).render().el);
                }
            }
        });

        HomeJS.components.List.Header = HomeJS.components.List.extend({
            tagName: 'div',
            className: "homejs-list-header",
            initialize: function () {
                if (this.options.title)
                    this.$el.append("<span class='title'>" + this.options.title + "</span>");
                if (this.options.description)
                    this.$el.append("<span class='description'> (" + this.options.description + ")</span>");
            }
        });

        HomeJS.components.List.Toolbar = HomeJS.components.List.extend({
            tagName: 'div',
            className: "homejs-list-toolbar",
            initialize: function () {
                this.options.toolbar.forEach(this.addToolbar, this);
            },
            addToolbar: function (toolbar) {
                if (toolbar.type) {
                    var toolbar = new toolbar.type(toolbar);
                    this.$el.append(toolbar.render().el);
                }
            }
        });

        HomeJS.components.List.ShowMore = Backbone.View.extend({
            tagName: 'div',
            className: "homejs-list-showmore",
            initialize: function () {
                this.model.on('change', this.render, this);
                this.options.collectionList.on('all', this.render, this);
            },
            render: function () {
                if (this.model.get("Total")) {
                    if (this.options.collectionList.length < this.model.get("Total"))
                        this.$el.html("<button class='btn btn-small btn-success' style='margin-top:10px;float:left;'>Selanjutnya</button>"+
                        "<div style='float:left;margin-top:15px;margin-left:10px;'>Total : " + this.model.get("Total") + "</div>");
                    else
                        this.$el.remove();
                }
                return this;
            },
            events: {
                'click button': 'showmore'
            },
            showmore: function () {
                this.options.collectionList.showMore();
                $("button", this.$el).html("selanjutnya...");
            }
        });
    });