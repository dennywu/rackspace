define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        'eventAggregator'],
    function ($, _, Backbone, ns) {
        ns.define('rs.files.model');
        rs.files.model.File = Backbone.Model.extend();

        return rs;
    });