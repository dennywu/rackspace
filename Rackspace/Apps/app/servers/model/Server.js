define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        'eventAggregator'],
    function ($, _, Backbone, ns) {
        ns.define('rs.servers.model');
        rs.servers.model.Server = Backbone.Model.extend({
            url: "tests/sample-data/cloud-servers/server.json"
        });

        return rs;
    });