define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        'eventAggregator',
        'servers/model/ListServer'],
    function ($, _, Backbone, ns) {
        ns.define('rs.servers.model.List');

        rs.servers.model.ListServerCollection = Backbone.Collection.extend({
            initialize: function () {
                //_.bindAll(this, 'addCollection');
            },
            url: 'tests/sample-data/cloud-servers/list-servers.json',
            model: rs.servers.model.ListServer
            //fetch: function (options) {
            //    this.search = false;
            //    var options = options || {};
            //    options.data = { offset: this.offset++, search: this.search };
            //    this.query(options);
            //},
            //query: function (options) {
            //    typeof (options) != 'undefined' || (options = {});
            //    this.trigger("fetching");
            //    var self = this;

            //    var success = options.success;
            //    options.success = function (resp) {
            //        self.trigger("fetched");
            //        if (success) { success(self, resp); }
            //    };
            //    return Backbone.Collection.prototype.fetch.call(this, options);
            //}
        });

        return rs;
    });