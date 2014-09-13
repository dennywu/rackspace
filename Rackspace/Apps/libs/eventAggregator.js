/// <reference path="../../require.js" />
/// <reference path="../../backbone.js" />
/// <reference path="../../underscore.js" />

define(['jquery',
        'underscore',
        'backbone',
        'namespace'], function ($, _, Backbone, ns) {
            ns.define('rs');
            rs.eventAggregator = rs.eventAggregator || _.extend({}, Backbone.Events);

            return rs;
        });