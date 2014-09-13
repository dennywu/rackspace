"use strict";
define.amd.jQuery = true;
requirejs.config({
    paths: {
        jquery: '../libs/jquery/jquery-1.7.2.min',
        underscore: '../libs/underscore/underscore.min',
        backbone: '../libs/backbone/backbone.min',
        namespace: '../libs/namespace',
        eventAggregator: '../libs/eventAggregator',
        bootstrap: '../libs/bootstrap.min',
        bootstrapdatepicker: '../libs/bootstrap-datepicker'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        marionette: {
            deps: ['backbone']
        }
    }
});

define([
  'jquery',
  'underscore',
  'backbone',
  'eventAggregator',
  'Router',
  '../libs/bootstrap/bootstrap-dropdown',
  'config',
  'auth',
  'shared/_layout'
], function ($, _, Backbone, rs) {
    $(function () {
        rs.Navigation('');
        var router = new rs.router.Router();
        Backbone.history.start();
        router.navigate("", true);

        //event aggregator for cloud servers
        rs.eventAggregator.on('showDetailServer', function (id) {
            router.navigate("/servers/detail/" + id, true);
        });
        rs.eventAggregator.on('createServer', function () {
            router.navigate("/servers/create", true);
        });
        rs.eventAggregator.on('showListServer', function (data) {
            router.navigate("/servers", true);
        });

        //event aggregator for cloud files
        rs.eventAggregator.on('showListFile', function (data) {
            router.navigate("/files", true);
        });
        rs.eventAggregator.on('createFile', function () {
            router.navigate("/files/create", true);
        });
    });
});
