define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        '/scripts/libs/webcam/jquery.webcam.js',
        '/scripts/libs/homejs/dialog/erroralert.js'],
    function ($, _, Backbone, ns) {
        ns.define("HomeJS.components");
        HomeJS.components.WebCamera = Backbone.View.extend({
            tagName: 'div',
            className: 'modal-dialog',
            initialize: function () {
                var title = this.options.title || "HomeJS Web Camera";
                var html = "<div class='toolbar'><title>" + title + "</title></div>" +
                       "<fieldset class='textbox'>" +
                       "<section class='modal-dialog-body webcam'>" +
                       "</section>" +
                       "</fieldset>" +
                       "<div style='text-align:center;padding-bottom:10px;'>" +
                       "<button class='btn btn-success' id='take-photo'>Capture</button>" +
                       "<button class='btn btn-danger' id='cancel' style='margin-left:3px;'>Cancel</button>" +
                       "</div>";
                this.$el.html(html);
                $(document.body).append(this.$el);
            },
            render: function () {
                var self = this;
                var pos = 0, ctx = null, saveCB, image = [];
                var canvas = document.createElement('canvas');
                canvas.setAttribute('width', 320);
                canvas.setAttribute('height', 240);
                ctx = canvas.getContext('2d');
                image = ctx.getImageData(0, 0, 320, 240);

                var saveCB = function (data) {
                    var col = data.split(';');
                    var img = image;
                    for (var i = 0; i < 320; i++) {
                        var tmp = parseInt(col[i]);
                        img.data[pos + 0] = (tmp >> 16) & 0xff;
                        img.data[pos + 1] = (tmp >> 8) & 0xff;
                        img.data[pos + 2] = tmp & 0xff;
                        img.data[pos + 3] = 0xff;
                        pos += 4;
                    }

                    if (pos >= 4 * 320 * 240) {
                        ctx.putImageData(img, 0, 0);
                        $.ajax({
                            type: "POST",
                            url: self.options.url,
                            data: {
                                type: 'data',
                                id: self.options.data,
                                image: canvas.toDataURL("image/png")
                            },
                            success: function (result) {
                                if (result.error) {
                                    HomeJS.components.ErrorAlert(result.message);
                                }
                                else {
                                    self.destroy();
                                    self.options.success();
                                }
                            },
                            error: function (a, b, c, d) {
                                console.log(b.responseText);
                            }
                        });
                        pos = 0;
                    }
                };

                $("section.modal-dialog-body").webcam({
                    width: 320,
                    height: 240,
                    mode: "callback",
                    swffile: "/scripts/libs/webcam/jscam_canvas_only.swf",
                    onSave: saveCB,
                    onCapture: function () {
                        webcam.save();
                    },
                    debug: function (type, string) { console.log("debug: " + type + "; " + string); },
                    onLoad: function () { console.log("load"); }
                });
                return this;
            },
            events: {
                'click #take-photo': 'captureImage',
                'click #cancel': 'cancel'
            },
            captureImage: function () {
                webcam.capture();
                return false;
            },
            cancel: function () {
                this.destroy();
            },
            show: function () {
                var box = this.$el;
                $(box).fadeIn(200);
                var popMargTop = ($(box).height() + 24) / 2;
                var popMargLeft = ($(box).width() + 24) / 2;
                $(box).css({
                    'margin-top': -popMargTop,
                    'margin-left': -popMargLeft
                });
                $('body').append('<div id="mask"></div>');
                $('#mask').fadeIn(2000);
                this.$el.show();
                var self = this;
                $("#mask").click(function () {
                    self.destroy();
                });
            },
            destroy: function () {
                $('#mask , .modal-dialog').fadeOut(300, function () {
                    $('#mask').remove();
                });
            }
        });

        return HomeJS.components.WebCamera;
    });