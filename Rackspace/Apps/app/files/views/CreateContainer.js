define(['jquery',
        'underscore',
        'backbone',
        'namespace',
        'eventAggregator',
        '../../../libs/Date',
        '../../../libs/homejs/formpanel',
        '../../../libs/homejs/inputfield/textfield',
        '../../../libs/homejs/inputfield/datefield',
        '../../../libs/homejs/inputfield/searchfield',
        '../../../libs/homejs/inputfield/combofield',
        '../../../libs/homejs/label',
        '../../../libs/homejs/radiobutton'
], function ($, _, Backbone, ns) {
    ns.define('rs.servers.views');
    rs.servers.views.CreateServer = Backbone.View.extend({
        tagName: 'div',
        className: 'create-server',
        initialize: function () {
            this.createTextboxName();
            this.createDropDownImage();
            this.createDropDownFlavour();
            this.createRadioButtonDiskConfig();
        },
        render: function () {
            var formPanel = new HomeJS.components.FormPanel({
                formLayout: HomeJS.components.FormLayout.VERTICAL,
                class: 'create-server-container',
                items: [this.nameView, this.imageDropdownImage, this.flavourDropdownImage, this.diskConfig]
            });
            this.$el.html(formPanel.render().el);
            return this;
        },
        createTextboxName: function () {
            this.nameView = new HomeJS.components.TextField({
                model: this.model,
                title: 'Server Name',
                type: 'text',
                placeholder: 'Server Name',
                dataIndex: "name"
            });
        },
        createDropDownImage: function () {
            var imageModel = Backbone.Model.extend();
            var imageCollection = Backbone.Collection.extend({
                url: "tests/sample-data/cloud-servers/images.json",
                model: imageModel
            });
            var imageColl = new imageCollection();
            imageColl.fetch();
            this.imageDropdownImage = new HomeJS.components.ComboField({
                model: this.model,
                title: 'Image',
                dataIndex: "ImageId",
                collection: imageColl,
                displayItemField: {
                    value: 'id',
                    name: 'name'
                },
                setModel: function (model, data) {
                    model.set("ImageId", data.id);
                }
            });
        },
        createDropDownFlavour: function () {
            var flavourModel = Backbone.Model.extend();
            var flavourCollection = Backbone.Collection.extend({
                url: "tests/sample-data/cloud-servers/flavours.json",
                model: flavourModel
            });
            var flavourColl = new flavourCollection();
            flavourColl.fetch();
            this.flavourDropdownImage = new HomeJS.components.ComboField({
                model: this.model,
                title: 'Flavour',
                dataIndex: "FlavourId",
                collection: flavourColl,
                displayItemField: {
                    value: 'id',
                    name: 'name'
                },
                setModel: function (model, data) {
                    model.set("FlavourId", data.id);
                }
            });
        },
        createRadioButtonDiskConfig: function () {
            var RadioButtonCollection = Backbone.Collection.extend();
            var radioButtonCollection = new RadioButtonCollection();
            radioButtonCollection.reset([
                           { id: "AUTO", title: "Auto", value: "AUTO", checked: true },
                           { id: "MANUAL", title: "Manual", value: "MANUAL" }
            ]);

            this.diskConfig = new HomeJS.components.RadioButton({
                collection: radioButtonCollection,
                model: this.model,
                id: "diskConfig",
                name: "diskConfig",
                title: "OS-DCF:diskConfig",
                dataIndex: "OS-DCF:diskConfig",
                setModel: function (model, data) {
                    model.set("OS-DCF:diskConfig", data.value);
                }
            });
        }
    });

    return rs;
}
);