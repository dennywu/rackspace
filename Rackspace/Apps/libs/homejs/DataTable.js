define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        '../../libs/resizable-tables'],
    function ($, _, Backbone, ns) {
        ns.define("HomeJS.components");
        HomeJS.components.DataTable = Backbone.View.extend({
            tagName: 'table',
            className: "homejs-datatable table table-striped table-hover  table-bordered",
            initialize: function () {
                this.$el.attr('id', 'test');
                if (!this.collection)
                    throw ("Must any collection");
                this.collection.on("reset", this.addItems, this);
                this.collection.on("add", this.addItem, this);
                if (this.options.resizable) this.$el.addClass("resizable");
                this.createHeader();
                this.addItems();
                this.addFooter();
            },
            render: function () {
                return this;
            },
            createHeader: function () {
                if (this.options.headers) {
                    this.$el.append("<thead></thead>");
                    if (this.options.headers[0].constructor == Array)
                        this.options.headers.forEach(this.addHeader, this);
                    else
                        this.addHeader(this.options.headers);
                }
            },
            addHeader: function (headers) {
                var className = Math.floor((Math.random() * 100) + 1);
                this.$el.find("thead").append("<tr class='" + className + "'></tr>");
                headers.forEach(function (header) {
                    this.$el.find("thead tr." + className, this.$el).append(new HomeJS.components.DataTable.TableHead({
                        collection: this.collection,
                        container: this,
                        spec: header
                    }).el);
                }, this);
            },
            addItems: function () {
                if (this.options.items) {
                    this.$el.find("tbody").remove();
                    this.$el.append("<tbody></tbody>");
                    if (this.collection.length > 0) {
                        this.collection.forEach(this.addItem, this);
                    }
                    else {
                        var cellLength = this.options.items.length;
                        var html = "<tr><td style='text-align:center;color:DarkRed;' colspan='" + cellLength + "'>No data</td></tr>";
                        this.$el.find("tbody").html(html);
                    }
                }
                this.addFooter();
            },
            addItem: function (item) {
                this.$el.find("tbody").append(new HomeJS.components.DataTable.Row({
                    model: item,
                    cells: this.options.items,
                    onrenderItem: this.options.onrenderItem,
                    eventclick: this.options.eventclick
                }).el);
            },
            addFooter: function () {
                if (this.options.footer) {
                    var grandTotalDebit = this.collection.SumTotalDebit();
                    var grandTotalKredit = this.collection.SumTotalKredit();
                    if (this.collection.length > 0) {
                        var cellLength = this.options.items.length;
                        var html = "<tr class='footer'>";
                        var e = 0;
                        for (var i = 0; i < cellLength; i++) {
                            var value = "";
                            var style = "";
                            if ((cellLength - i) <= this.options.footer.length) {
                                value = this.options.footer[e].onrender();
                                style = this.options.footer[e].align ? 'text-align:' + this.options.footer[e].align : "";
                                e++;
                            }
                            html += "<td style='" + style + "'>" + value + "</td>";
                        }
                        html += "</tr>";
                        this.$el.find("tbody").append(html);
                    }
                }
            }
        });

        HomeJS.components.DataTable.TableHead = Backbone.View.extend({
            tagName: "th",
            initialize: function () {
                var header = this.options.spec;
                if (typeof header === "object") {
                    var resizable = (header.resizable || header.resizable === undefined) ? "" : "fixed";
                    var width = (header.width) ? "width:" + header.width : "";
                    var align = (header.align) ? "text-align:" + header.align : "";
                    var minwidth = (header.minwidth) ? "min-width:" + header.minwidth : "";
                    var maxwidth = (header.maxwidth) ? "max-width:" + header.maxwidth : "";
                    //var verticalalign = "vertical-align:middle";
                    var styles = width + ";" + align + ";" + minwidth + ";" + maxwidth + ";";
                    var title = (header.title) ? header.title : "";
                    var rowspan = (header.rowspan) ? header.rowspan : 1;
                    var colspan = (header.colspan) ? header.colspan : 1;

                    this.$el.addClass(resizable);
                    this.$el.attr('title', title);
                    this.$el.attr('style', styles);
                    this.$el.attr('rowspan', rowspan);
                    this.$el.attr('colspan', colspan);
                    this.$el.html(header.name);
                }
                else {
                    this.$el.append(header);
                }
            },
            events: {
                'click': 'sortData'
            },
            sortData: function () {
                var dataIndex = this.options.spec.dataIndex;
                if (dataIndex) {
                    this.orderBy = (this.orderBy && this.orderBy === "-") ? "" : "-";
                    if (this.orderBy === "-") {
                        this.collection.comparator = function (item) {
                            var value = item.get(dataIndex);
                            if (typeof value === "string") {
                                value = value.toLowerCase();
                                value = value.split("");
                                value = _.map(value, function (letter) {
                                    return String.fromCharCode(-(letter.charCodeAt(0)));
                                });
                                return value;
                            }
                            else {
                                return -item.get(dataIndex);
                            }
                        }
                    } else {
                        this.collection.comparator = function (item) {
                            var value = item.get(dataIndex);
                            if (typeof value === "string") {
                                value = value.toLowerCase();
                                value = value.split("");
                                value = _.map(value, function (letter) {
                                    return String.fromCharCode((letter.charCodeAt(0)));
                                });
                                return value;
                            }
                            else {
                                return item.get(dataIndex);
                            }
                        }
                    }
                    this.collection.sort();
                    this.setCurrentSortedField();
                }
            },
            setCurrentSortedField: function () {
                $("span.currentSortedArrow", this.options.container.el).remove();
                if (this.orderBy === "-")
                    this.$el.children().append("<span class='currentSortedArrow'><img src='/Apps/styles/img/asc.gif'/></span>");
                else
                    this.$el.children().append("<span class='currentSortedArrow'><img src='/Apps/styles/img/desc.gif'/></span>");
            }
        });

        HomeJS.components.DataTable.Row = Backbone.View.extend({
            tagName: "tr",
            initialize: function () {
                if (this.options.onrenderItem)
                    this.$el.addClass(this.options.onrenderItem(this.model));
                this.options.cells.forEach(this.addCell, this);
            },
            addCell: function (cell) {
                var self = this;
                if (typeof cell === "object") {
                    var align = (cell.align) ? "text-align:" + cell.align : "";
                    var styles = align;
                    var value = this.model.get(cell.dataIndex);
                    if (cell.onrender) {
                        value = cell.onrender(value, this.model);
                    }
                    value = (value == null) ? '-' : value;
                    //value = typeof value == "number" ? value.toCurrency() : value;
                    if (typeof value == "object") {
                        var html = $("<td class='" + cell.dataIndex + "'>");
                        this.$el.append(html.append(value, this.model));
                    } else
                        this.$el.append("<td style='" + styles + "' class='" + cell.dataIndex + "'>" + value + "</td>");

                    if (cell.actionclick)
                        $("td." + cell.dataIndex, this.$el).click(function (ev) {
                            ev.preventDefault();
                            cell.actionclick(self.model);
                        });
                }
            },
            events: {
                'click': 'trclicked'
            },
            trclicked: function () {
                console.log(this.model.toJSON());
                this.options.eventclick(this.model.toJSON());
            }
        });
    });