define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        'eventAggregator',
        'servers/model/server',
        'servers/views/DetailServer',
        '../../../libs/homejs/dialog/erroralert',
        '../../../libs/homejs/dialog/confirm',
        '../../../libs/homejs/DetailPanel'],
    function ($, _, Backbone, ns, rs) {
        ns.define('rs.servers.controller');
        rs.servers.controller.DetailController = function (id) {
            var serverModel;
            var detailServerView;
            var detailPanel;
            var toolbar;

            var show = function () {
                loadModel();
                createDetailServerView();
                createToolbar();
                createDetailPanel();
                $("#main-container").html(detailPanel.render().el);
            };

            var loadModel = function () {
                serverModel = new rs.servers.model.Server();
                serverModel.fetch({ data: { id: id } });
            };

            var createDetailServerView = function () {
                detailServerView = new rs.servers.views.DetailServer({ model: serverModel });
            };

            var createToolbar = function () {
                toolbar = new HomeJS.components.DetailPanel.Toolbar({
                    model: serverModel,
                    title: 'Actions',
                    buttons: [{
                        title: "Delete Server",
                        tooltip: "Delete this server",
                        iconClass: 'icon-remove',
                        id: "deleteServer",
                        action: function () {
                            HomeJS.components.Confirm({
                                message: "Are you sure to delete this server?",
                                action: function () {
                                    alert("Call API Rackspace");
                                }
                            });
                        }
                    }]
                });
            };

            var createDetailPanel = function () {
                detailPanel = new HomeJS.components.DetailPanel({
                    leftSection: {
                        caption: {
                            title: 'Detail Server',
                            action: function () { rs.eventAggregator.trigger("showListServer"); }
                        },
                        headers: [detailServerView]
                    },
                    rightSection: {
                        items: [toolbar]
                    }
                });
            };

            return {
                show: show
            }
        };
        return rs;
    });