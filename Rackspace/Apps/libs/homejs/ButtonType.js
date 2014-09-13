define(['jquery',
        'underscore',
        'backbone',
        'namespace', ],
    function ($, _, Backbone, ns) {
        ns.define("HomeJS.components");
        HomeJS.components.ButtonType = {
            Primary: "btn-primary",
            Info: "btn-info",
            Success: "btn-success",
            Warning: "btn-warning",
            Danger: "btn-danger",
            Inverse: "btn-inverse",
            Link: "btn-link"
        };

        HomeJS.components.ButtonColor = {
            Black: "",
            White: "icon-white"
        };
        HomeJS.components.ButtonSize = {
            Mini: "btn-mini",
            Small: "btn-small",
            Large: "btn-large",
            XLarge: "btn-xlarge"
        };
    });