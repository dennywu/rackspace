define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        'eventAggregator',
        'files/model/server',
        'files/views/CreateServer',
        '../../../libs/homejs/dialog/erroralert',
        '../../../libs/homejs/dialog/confirm',
        '../../../libs/homejs/DetailPanel'],
    function ($, _, Backbone, ns, rs) {
        ns.define('rs.servers.controller');
        rs.servers.controller.CreateController = function () {
            var serverModel;
            var detailPanel;
            var createServerView;
            
            var show = function () {
                loadModel();
                createServerPanel();
                createToolbar();
                createDetailPanel();
                $("#main-container").html(detailPanel.render().el);
            };

            var createServerPanel = function () {
                createServerView = new rs.servers.views.CreateServer({ model: serverModel });
            };

            var loadModel = function () {
                 serverModel = new rs.servers.model.Server();
            };

            var createDetailPanel = function () {
                detailPanel = new HomeJS.components.DetailPanel({
                    leftSection: {
                        caption: {
                            title: 'Create Server',
                            action: function () { rs.eventAggregator.trigger("showListFile"); }
                        },
                        item: createServerView
                    },
                    rightSection: {
                        items: [toolbar]
                    }
                });
            };

            var createToolbar = function () {
                toolbar = new HomeJS.components.DetailPanel.Toolbar({
                    model: serverModel,
                    title: '',
                    buttons: [{
                        title: "Create",
                        tooltip: "Create server",
                        iconClass: 'icon-ok-sign',
                        id: "save",
                        action: function () {
                            alert("sending to api rackspace");
                        }
                    }, {
                        title: "Cancel",
                        tooltip: "Cancel create server",
                        iconClass: 'icon-remove-circle',
                        id: "cancel",
                        action: function () {
                            HomeJS.components.Confirm({
                                message: "Are you sure to cancel create server?",
                                action: function () {
                                    rs.eventAggregator.trigger("showListFile");
                                }
                            });
                        }
                    }]
                });
            };

            return {
                show: show
            }
        };
        return rs;
    });