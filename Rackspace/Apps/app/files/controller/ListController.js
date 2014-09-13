define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        'eventAggregator',
        '../../../libs/homejs/List',
        '../../../libs/Date',
        'files/model/ListFileCollection'],
    function ($, _, Backbone, ns) {
        ns.define('rs.files.controller');
        rs.files.controller.ListController = function () {
            var listFileCollection = new rs.files.model.ListFileCollection();
            listFileCollection.fetch();

            var listFileView = new HomeJS.components.List({
                header: {
                    title: "Cloud Files",
                    description: "List of cloud files"
                },
                toolbar: [{
                    type: HomeJS.components.Button,
                    title: "Create Container",
                    typeButton: HomeJS.components.ButtonType.Success,
                    icon: "icon-plus-sign",
                    iconColor: HomeJS.components.ButtonColor.White,
                    events: {
                        'click': function () {
                            rs.eventAggregator.trigger("createFile");
                        }
                    }
                }],
                list: {
                    resizable: true,
                    collection: listFileCollection,
                    headers: [{
                        name: "Container Name",
                        dataIndex: "name",
                        //minwidth: "100px",
                        title: "Click for sorting by container name"
                    }, {
                        name: "Last Modified",
                        dataIndex: "last_modified",
                        width: "120px",
                        title: "Click for sorting by last modified"
                    }, {
                        name: "Bytes",
                        dataIndex: "bytes",
                        width: "120px",
                        title: "Click for sorting by bytes"
                    }],
                    items: [{
                        dataIndex: "name"
                    }, {
                        dataIndex: "last_modified",
                        onrender: function (data) {
                            return data.toDateFromStringDate();
                        }
                    }, {
                        dataIndex: "bytes"
                    }],
                    eventclick: function (data) {
                        //rs.eventAggregator.trigger('showDetail', data.id);
                    }
                }
            });


            //var listServerView = new rs.servers.views.ListServer({ collection: listServerCollection });

            var show = function () {
                $("#main-container").html(listFileView.render().el);
            }
            return {
                show: show
            }
        };
        return rs;
    }
);