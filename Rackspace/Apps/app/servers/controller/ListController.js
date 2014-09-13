define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        'eventAggregator',
        '../../../libs/homejs/List',
        '../../../libs/Date',
        'servers/model/ListServerCollection'],
    function ($, _, Backbone, ns) {
        ns.define('rs.servers.controller');
        rs.servers.controller.ListController = function () {
            var listServerCollection = new rs.servers.model.ListServerCollection();
            listServerCollection.fetch();

            var listServerView = new HomeJS.components.List({
                header: {
                    title: "Cloud Servers",
                    description: "List of cloud servers"
                },
                toolbar: [{
                    type: HomeJS.components.Button,
                    title: "Create Server",
                    typeButton: HomeJS.components.ButtonType.Success,
                    icon: "icon-plus-sign",
                    iconColor: HomeJS.components.ButtonColor.White,
                    events: {
                        'click': function () {
                            rs.eventAggregator.trigger("createServer");
                        }
                    }
                }],
                list: {
                    resizable: true,
                    collection: listServerCollection,
                    headers: [{
                        name: "Server Name",
                        dataIndex: "name",
                        minwidth: "100px",
                        title: "Click for sorting by server name"
                    }, {
                        name: "Access IPv4",
                        dataIndex: "accessIPv4",
                        width: "120px",
                        title: "Click for sorting by Access IPv4"
                    }, {
                        name: "Tenant Id",
                        dataIndex: "tenant_id",
                        width: "120px",
                        title: "Click for sorting by Tenant Id"
                    }, {
                        name: "Progress",
                        dataIndex: "progress",
                        width: "100px",
                        title: "Click for sorting by Progress"
                    }, {
                        name: "Updated",
                        dataIndex: "updated",
                        width: "150px",
                        title: "Click for sorting by Updated"
                    }, {
                        name: "Status",
                        dataIndex: "status",
                        width: "150px",
                        align: "right",
                        title: "Click for sorting by Status"
                    }],
                    items: [{
                        dataIndex: "name"
                    }, {
                        dataIndex: "accessIPv4"
                    }, {
                        dataIndex: "tenant_id"
                    }, {
                        dataIndex: "progress"
                    }, {
                        dataIndex: "updated",
                        onrender: function (data) {
                            return data.toDateFromStringDate();
                        }
                    }, {
                        dataIndex: "status",
                        align: 'right'
                    }],
                    eventclick: function (data) {
                        rs.eventAggregator.trigger('showDetailServer', data.id);
                    }
                }
            });


            //var listServerView = new rs.servers.views.ListServer({ collection: listServerCollection });

            var show = function () {
                $("#main-container").html(listServerView.render().el);
            }
            return {
                show: show
            }
        };
        return rs;
    }
);