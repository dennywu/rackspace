define(['jquery',
'underscore',
'backbone',
'namespace'],
    function ($, _, Backbone, ns) {
        ns.define('rs.router');

        rs.router.Router = Backbone.Router.extend({
            initialize: function () {
            },
            routes: {
                '': 'index',
                'servers': 'listServer',
                'servers/detail/:id': 'detailServer',
                'servers/create': 'createServer',
                'files': 'listFile',
                'files/create': 'createFile'
            },
            listServer: function () {
                require([
                    'servers/controller/ListController'
                ], function () {
                    this.listController = new rs.servers.controller.ListController();
                    this.listController.show();
                });
            },
            detailServer: function (id) {
                require([
                    'servers/controller/DetailController'
                ], function () {
                    this.detailController = new rs.servers.controller.DetailController(id);
                    this.detailController.show();
                });
            },
            createServer: function () {
                require([
                    'servers/controller/CreateController'
                ], function () {
                    this.createController = new rs.servers.controller.CreateController();
                    this.createController.show();
                });
            },
            listFile: function () {
                require([
                    'files/controller/ListController'
                ], function () {
                    this.listController = new rs.files.controller.ListController();
                    this.listController.show();
                });
            },
            createFile: function () {
                alert("not implemented");
                //require([
                //    'files/controller/CreateController'
                //], function () {
                //    this.createController = new rs.files.controller.CreateController();
                //    this.createController.show();
                //});
            }
        });
        return rs;
    }
);