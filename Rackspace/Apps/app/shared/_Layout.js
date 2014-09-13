/// <reference path="RoleName.js" />

define([
    'jquery',
    'underscore',
    'backbone',
    'namespace'
], function ($, _, Backbone, ns) {
    ns.define('rs');
    rs.Navigation = function (activeElement) {
        var headerHtml = "<div id='header'><h1>API Rackspace<a href='#'>API Rackspace</a></h1</div>";
        $(document.body).append(headerHtml);
        $(document.body).append(new rs.NavBar().render().el);
        $(document.body).append(new rs.SideBar({ activeElement: activeElement }).render().el);
        $(document.body).append("<div id='content'><div id='btn-fullscreen' title='Full Screen'><i class='icon-fullscreen'/></div><div id='main-container'></div></div>");
        $("#btn-fullscreen").click(fullscreen);
    };

    var fullscreen = function () {
        if ($("#sidebar").attr('class') && $("#sidebar").attr('class').indexOf("hideSidebar") >= 0) {
            $("#btn-fullscreen").attr('title', 'Full Screen');
            $("#btn-fullscreen").html("<i class='icon-fullscreen'/>");
            $("#content").css("margin-left", "220px");
            $("#content").css("margin-top", "-30px");
            window.setTimeout(function () {
                $("#sidebar").removeClass("hideSidebar");
            }, 200);
        }
        else {
            $("#btn-fullscreen").attr('title', 'Small Screen');
            $("#btn-fullscreen").html("<i class='icon-resize-small'/>");
            $("#sidebar").addClass("hideSidebar");
            $("#content").css("margin-left", "0px");
            $("#content").css("margin-top", "-13px");
        }
    };

    rs.SideBar = Backbone.View.extend({
        tagName: 'div',
        className: '',
        id: 'sidebar',
        initialize: function () {
        },
        render: function () {
            var sidebarHtml = "<ul style='display: block;'>" +
			                    "<li id='dashboard'>" +
                                    "<a href='/'>" +
                                        "<i class='icon icon-home'></i>" +
                                        "<span>Dashboard</span>" +
                                    "</a>" +
                                "</li>";
            sidebarHtml += "<li id='servers'>" +
				                "<a href='/Apps/index.html#servers'>" +
                                    "<i class='icon icon-book'></i>" +
                                    "<span>Cloud Servers</span>" +
                                "</a>" +
			                "</li>";
            sidebarHtml += "<li id='files'>" +
				                "<a href='/Apps/index.html#files'>" +
                                    "<i class='icon icon-book'></i>" +
                                    "<span>Cloud Files</span>" +
                                "</a>" +
			                "</li>";

            sidebarHtml += "</ul>";

            this.$el.html(sidebarHtml);
            return this;
        }
    });

    rs.NavBar = Backbone.View.extend({
        tagName: 'div',
        className: 'navbar navbar-inverse',
        id: 'user-nav',
        initialize: function () {
        },
        render: function () {
            var username = "User Test";
            var navBarHtml = "<ul class='nav btn-group pull-right'>" +
                                    "<li class='btn btn-inverse'>" +
                                        "<a title='' href='/setting'>" +
                                            "<i class='icon icon-cog'></i>" +
                                            "<span class='text'>Setting</span>" +
                                        "</a>" +
                                    "</li>" +
                                    "<li class='btn btn-inverse dropdown'>" +
                                        "<a href='#' class='dropdown-toggle' data-toggle='dropdown' id='username'>" +
                                            "<i class='icon-user icon-white'></i>" +
                                            "&nbsp;" +
                                            "<span>" + username + "</span>" +
                                            "&nbsp;" +
                                            "<b class='caret'></b>" +
                                        "</a>" +
                                        "<ul class='dropdown-menu'>" +
                                            "<li>" +
                                                "<a href='/Account/LogOff'>" +
                                                    "<i class='icon-off'></i>" +
                                                    "&nbsp;" +
                                                    "Log out" +
                                                    "&nbsp;" +
                                                "</a>" +
                                            "</li>" +
                                        "</ul>" +
                                    "</li>" +
                                "</ul>";
            this.$el.html(navBarHtml);
            return this;
        }
    });
    return rs;
});