define([
    'jquery',
    'underscore',
    'backbone',
    'namespace',
    '../../Date',
    '../../bootstrap/bootstrap-datepicker'
], function ($, _, Backbone, ns) {
    ns.define("HomeJS.components");
    HomeJS.components.SearchField = function (data) {
        var SearchModel = Backbone.Model.extend({})
        var SearchCollection = Backbone.Collection.extend({ url: data.url, model: SearchModel });
        var searchCollection = new SearchCollection();
        var searchView = new HomeJS.components.SearchFieldView({
            collection: searchCollection,
            model: data.model,
            attr: {
                name: data.name,
                setValue: data.setValue,
                title: data.title,
                inputSize: data.inputSize,
                dataIndex: data.dataIndex,
                required: data.required,
                placeholder: data.placeholder,
                dataSourceDataIndex: {
                    value1: data.dataSourceDataIndex.value1,
                    value2: data.dataSourceDataIndex.value2,
                    value3: data.dataSourceDataIndex.value3,
                    name: data.dataSourceDataIndex.name,
                    id: data.dataSourceDataIndex.id
                },
                setModel: data.setModel,
                getData: data.getData,
                resetModel: data.resetModel,
                additionalInfo: data.additionalInfo,
                additionalInfoDefaultData: data.additionalInfoDefaultData
            }
        });
        return searchView;
    };

    HomeJS.components.SearchFieldView = Backbone.View.extend({
        tagName: 'div',
        className: 'control-group',
        initialize: function () {
            this.$el.addClass('homejs-search-' + this.options.attr.dataIndex);
            this.options.attr.name = this.options.attr.name || this.options.attr.id;
            this.options.attr.dataIndex = this.options.attr.dataIndex || this.options.attr.id;
            this.options.attr.title = this.options.attr.title || this.options.attr.id.capitalize();
            this.searchFieldOptionContainer = new HomeJS.components.SearchFieldOptionContainer({
                id: 'search-result-section-' + this.options.attr.id,
                collection: this.collection,
                attr: this.options.attr,
                parentModel: this.model,
                setModel: this.setModel,
                setResultId: this.setResultId,
                setResultText: this.setResultText,
                setResultTextAdditionalInfo: this.setResultTextAdditionalInfo,
                idSearchFieldView: this.id,
                searchFieldView: this
            });
        },
        render: function () {
            var colorLabel = (this.options.attr.required === true) ? "#9C0000" : "";
            var inputSize = this.options.attr.inputSize || "input-xlarge";
            var setValue = this.options.attr.setValue || "";
            var placeholder = this.options.attr.placeholder || "";
            var addClassAdditionalInfo = this.options.attr.addClassAdditionalInfo || "muted";
            var html = "<label class='control-label' style='color:" + colorLabel + "'>" + this.options.attr.title + "</label>\
                        <div class='controls controls-row'>\
                            <input id='idsearched' type='hidden' value=''>\
                            <input type='text' class='search-input-field " + inputSize + "' id='" + this.options.attr.dataIndex + "' name='" + this.options.attr.name + "' autocomplete='off' value='" + setValue + "' placeholder='" + placeholder + "'/>\
                            <div class='loading-container'><img src='/Content/img/loader.gif' /></div>\
                            <div class='help-inline'></div>\
                            <div class='result-container'></div>\
                        </div>";

            if (this.options.attr.additionalInfo)
                html += "<div class='" + addClassAdditionalInfo + " search-input-field-additionalinfo'></div>";
            html += "</div>";

            this.$el.html(html);
            this.$el.find(".result-container").html(this.searchFieldOptionContainer.render().el);
            if (this.options.attr.additionalInfoDefaultData && this.options.attr.additionalInfo) {
                var data = this.options.attr.additionalInfoDefaultData;
                $.each(data, function (key, value) {
                    data[key] = data[key] || "";
                });
                this.setResultTextAdditionalInfo(data);
            }
            return this;
        },
        events: {
            'keyup input': 'actions',
            'keydown input': 'onTab',
            'focus input': 'showResultContainer',
            'blur input': 'hideResultContainer'
        },
        onTab: function (ev) {
            if (ev.keyCode == 9) {
                this.setModel(ev);
            }
            if (ev.keyCode == 13) {
                this.setModel(ev);
            }
        },
        actions: function (ev) {
            if (ev.keyCode == 27)
                this.removeResultContainer();
            else if (ev.keyCode == 38)
                this.searchFieldOptionContainer.keyup();
            else if (ev.keyCode == 40)
                this.searchFieldOptionContainer.keydown();
            else
                this.getData();
        },
        setModel: function (ev) {
            ev.preventDefault();
            var resultId = this.getResultId();
            if (resultId && resultId != "") {
                var itemModel = this.collection.get(resultId);
                if (this.options.attr.setModel)
                    this.options.attr.setModel(this.model, itemModel.toJSON());
                else
                    this.model.set(itemModel.toJSON());
                this.focusNextInputField();
            }
        },
        getData: function () {
            var self = this;
            if (this.options.attr.resetModel) this.options.attr.resetModel(this.model);
            this.setResultId("");
            this.searchFieldOptionContainer.hide();
            var key = $('input[type=text]', self.$el).val();
            window.clearTimeout($._delaySearching);
            if ($.trim(key) != "") {
                $._delaySearching = window.setTimeout(function () {
                    self.collection.fetch({
                        data: { key: key },
                        beforeSend: function () { $('.loading-container img', $('.homejs-search-' + self.options.attr.dataIndex)).show(); },
                        success: function (data) {
                            $('.loading-container img', $('.homejs-search-' + self.options.attr.dataIndex)).hide();
                            if (data.length == 0)
                                self.collection.trigger("noresult", this);
                        },
                        error: function () { $('.loading-container').hide(); }
                    });
                }, 700);
            }
        },
        hideResultContainer: function (ev) {
            var self = this;
            window.setTimeout(function () {
                self.searchFieldOptionContainer.hide();
                $('input[type=text]', self.$el).removeClass("error");
                $('.loading-container', self.$el).removeClass("error");
                if (self.getResultId() == "") {
                    $('input[type=text]', self.$el).addClass("error");
                    $('.loading-container', self.$el).addClass("error");
                    $('.search-input-field-additionalinfo', self.$el).empty();
                }
            }, 300);
        },
        showResultContainer: function (ev) {
            this.searchFieldOptionContainer.show();
        },
        removeResultContainer: function (ev) {
            this.searchFieldOptionContainer.remove();
        },
        setResultText: function (value) {
            $('input[type=text]', this.$el).val(value);
        },
        setResultTextAdditionalInfo: function (data) {
            if (this.options.attr.additionalInfo)
                $(this.$el).find('.search-input-field-additionalinfo').html(this.options.attr.additionalInfo(data));
        },
        setResultId: function (value) {
            $('input#idsearched', this.$el).val(value);
        },
        getResultText: function () {
            return $('input[type=text]', this.$el).val();
        },
        getResultId: function () {
            return $('input#idsearched', this.$el).val();
        },
        focusNextInputField: function () {
            if ($('.next', this.$el.next())[0])
                $('.next', this.$el.next()).focus();
            else if ($('textarea', this.$el.next())[0])
                $('textarea', this.$el.next()).focus();
            else if ($('input', this.$el.next())[0])
                $('input', this.$el.next()).focus();
            else
                $('input.search-input-field', this.$el).blur();
        }
    });



    HomeJS.components.SearchFieldOptionContainer = Backbone.View.extend({
        tagName: 'section',
        className: 'search-result-section',
        initialize: function () {
            this.collection.on('reset', this.setValue, this);
            this.collection.on('noresult', this.addNoResultView, this);
            this.$el.hide();
        },
        render: function () {
            this.$el.empty();
            this.$el.html("<ul></ul>");
            this.resizeSearchItem();
            return this;
        },
        setValue: function () {
            if ($("#" + this.options.idSearchFieldView)) {
                this.render();
                var index = 1;
                this.collection.forEach(this.addOne, this, index);
                index++;
            }
        },
        addOne: function (T, index) {
            var i = index + 1;
            var option = new HomeJS.components.SearchFieldResultOption({
                model: T,
                attr: this.options.attr.dataSourceDataIndex,
                tabindex: i,
                inputId: this.options.attr.id,
                parentModel: this.options.parentModel,
                dataIndex: this.options.attr.dataIndex,
                setModel: this.options.attr.setModel,
                setResultText: this.options.setResultText,
                setResultTextAdditionalInfo: this.options.setResultTextAdditionalInfo,
                setResultId: this.options.setResultId,
                searchFieldView: this.options.searchFieldView
            });
            option.render();
            this.$el.find('ul').append(option.el);
        },
        addNoResultView: function () {
            if ($("#" + this.options.idSearchFieldView)) {
                this.$el.find('ul').append("<li class='search-option-no-result'>Data tidak ditemukan.<li>");
            }
        },
        resizeSearchItem: function () {
            var tmpOffset = $("[name='" + this.options.attr.name + "']:last").offset();
            if (tmpOffset) {
                this.$el.show(); // prevents undesired result about setting offset position display
                this.$el.offset({
                    top: (tmpOffset.top + $("[name='" + this.options.attr.name + "']:last").outerHeight(true)) - 9
                });
            }
        },
        keyup: function () {
            var currPosition = $('.sort').attr('tabindex');
            var totalRow = $('ul li', this.$el).length;
            if (currPosition == undefined)
                currPosition = 0;
            if (currPosition <= 1)
                currPosition = totalRow + 1;
            currPosition--;
            this.selectItemSearched(currPosition);
        },
        keydown: function () {
            var currPosition = $('.sort').attr('tabindex');
            var totalRow = $('ul li', this.$el).length;
            if (currPosition == undefined)
                currPosition = 0;
            if (currPosition >= totalRow)
                currPosition = 0;
            currPosition++;
            this.selectItemSearched(currPosition);
        },
        selectItemSearched: function (index) {
            $('ul li', this.$el).removeClass('sort');
            $('ul li:nth-child(' + index + ')', this.$el).addClass('sort');
            var value = $('ul li:nth-child(' + index + ') strong', this.$el).text();
            var id = $('ul li:nth-child(' + index + ') strong', this.$el).attr('id');
            this.options.searchFieldView.setResultText(value);
            ////this.options.searchFieldView.setResultTextAdditionalInfo(value);
            this.options.searchFieldView.setResultId(id);
        },
        hide: function () {
            this.$el.hide();
        },
        show: function () {
            this.resizeSearchItem();
            this.$el.show();
        },
        remove: function () {
            this.$el.remove();
        }
    });



    HomeJS.components.SearchFieldResultOption = Backbone.View.extend({
        tagName: 'li',
        className: 'searchItem',
        initialize: function () {
            this.$el.attr('tabindex', this.options.tabindex);
        },
        render: function () {
            var val1 = ($.inArray(this.model.get(this.options.attr.value1), [null, undefined]) > -1) ? "" : this.model.get(this.options.attr.value1);
            var val2 = ($.inArray(this.model.get(this.options.attr.value2), [null, undefined]) > -1) ? "" : this.model.get(this.options.attr.value2);
            var val3 = ($.inArray(this.model.get(this.options.attr.value3), [null, undefined]) > -1) ? "" : this.model.get(this.options.attr.value3);
            var html = '<p><strong id="' + this.model.get(this.options.attr.id) + '">' + this.model.get(this.options.attr.name) + '</strong><br />';
            if (val1 != "")
                html += '<small>' + val1 + '</small><br />';
            if (val2 != "")
                html += '<small>' + val2 + '</small><br />';
            if (val3 != "")
                html += '<small>' + val3 + '</small>';
            html += '</p>';
            this.$el.html(html);
        },
        events: {
            'hover': 'hoverSearch',
            'click': 'SelectItemSearch'
        },
        hoverSearch: function (ev, el) {
            $('ul li', this.$el.closest('.search-result-section')).removeClass('sort');
            this.$el.addClass('sort');
        },
        SelectItemSearch: function () {
            var value = this.model.get(this.options.attr.name);
            var id = this.model.get(this.options.attr.id);
            this.options.searchFieldView.setResultText(value);
            this.options.searchFieldView.setResultTextAdditionalInfo(this.model.toJSON());
            this.options.searchFieldView.setResultId(id);
            this.options.setModel(this.options.parentModel, this.model.toJSON());
        }
    });
});