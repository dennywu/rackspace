define([
    'jquery',
    'underscore',
    'backbone',
    'namespace',
    'eventAggregator'
], function ($, _, Backbone, ns, rs) {
    ns.define('rs.servers.views');
    rs.servers.views.DetailServer = Backbone.View.extend({
        className: "detail-server",
        initialize: function () {
            this.model.on('change', this.render, this);
        },
        render: function () {
            var name = this.model.get("name");
            var accessIPv4 = this.model.get("accessIPv4");
            var accessIPv6 = this.model.get("accessIPv6");
            var diskConfig = this.model.get("OS-DCF:diskConfig");
            var tenant_id = this.model.get("tenant_id");
            var progress = this.model.get("progress");
            var updated = this.model.get("updated");
            var status = this.model.get("status");

            var html = "";
            html += "<div class='clearfix'><div>Server Name</div><div class='transaction-no'>" + name + "</div></div>";
            html += "<div class='clearfix'><div>Access IPv4</div><div>" + accessIPv4 + "</div></div>";
            html += "<div class='clearfix'><div>Access IPv6</div><div>" + accessIPv6 + "</div></div>";
            html += "<div class='clearfix'><div>OS-DCF:diskConfig</div><div>" + diskConfig + "</div></div>";
            html += "<div class='clearfix'><div>Tenant Id</div><div>" + tenant_id + "</div></div>";
            html += "<div class='clearfix'><div>Progress</div><div>" + progress + "</div></div>";
            html += "<div class='clearfix'><div>Updated</div><div>" + updated + "</div></div>";
            html += "<div class='clearfix'><div>Status</div><div>" + status + "</div></div>";
            this.$el.html(html);
            return this;
        }
    });
    return rs;
});