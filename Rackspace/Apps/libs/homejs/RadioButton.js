define(['jquery',
        'underscore',
        'backbone',
        'namespace', ],
    function ($, _, Backbone, ns) {
        ns.define("HomeJS.components");
        HomeJS.components.RadioButton = Backbone.View.extend({
            tagName: 'div',
            className: 'control-group clearfix',
            initialize: function () {
                this.model.on('change', this.render, this);
            },
            render: function () {
                var html = "<label class='control-label' style='padding-top:0px'>" + this.options.title + "</label>\
                            <div class='controls'>\
                            </div>";
                this.$el.html(html);
                this.id = this.options.id;
                this.collection.forEach(this.addItem, this);
                return this;
            },
            addItem: function (item) {
                var itemView = new HomeJS.components.ItemRadioButton({
                    model: item,
                    attr: {
                        parentModel: this.model,
                        dataIndex: this.options.dataIndex,
                        setModel: this.options.setModel,
                        name: this.options.name
                    }
                });
                $(".controls", this.$el).append(itemView.render().el);
            }
        });

        HomeJS.components.ItemRadioButton = Backbone.View.extend({
            initialize: function (spec) {
                var parentModel = spec.attr.parentModel;

                this.triggerEventChanged = function () {
                    var event = spec.attr.dataIndex + "Changed";
                    parentModel.trigger(event, parentModel);
                }
            },
            render: function () {
                var checked = '';
                if (this.options.attr.parentModel.get(this.options.attr.dataIndex) != null) {
                    if (this.options.attr.parentModel.get(this.options.attr.dataIndex) == this.model.get('value')) {
                        checked = 'checked';
                        this.triggerEventChanged();
                    }
                }
                else {
                    if (this.model.get('checked')) {
                        checked = 'checked';
                        this.setValue();
                    }
                }

                var html = "<label class='radio'><input type='radio' id='" + this.model.get('id') + "' name='" + this.options.name + "' " + checked + " style='margin-bottom: 5px'/>"
                    + this.model.get('title') + "</label>";
                this.$el.html(html);
                return this;
            },
            events: {
                'change input': 'setValue'
            },
            setValue: function () {
                if (this.options.attr.setModel) {
                    this.options.attr.setModel(this.options.attr.parentModel, this.model.toJSON());
                }
                else {
                    this.options.attr.parentModel.set(this.options.attr.dataIndex, this.model.toJSON());
                }
                this.triggerEventChanged();
            }
        });
    });