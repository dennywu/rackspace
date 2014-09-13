define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        'eventAggregator'],
    function ($, _, Backbone, ns) {
        ns.define('rs.servers.model');
        rs.servers.model.ListServer = Backbone.Model.extend();

        return rs;
    });