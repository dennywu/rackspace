define(['underscore'], function () {
    return {
        define: function (nsString) {
            var nsArr = nsString.split('.'),
                ns = window;

            _(nsArr).each(function (item) {
                ns[item] = ns[item] || {};
                ns = ns[item];
            });

            return window[nsArr[0]];
        }
    }
});