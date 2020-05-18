/**
 * JS-класс, расширяющий функциональность поля `Z8.form.field.TextArea`.
 * Добавляет элемент для xml-контента с подсветкой синтаксиса.
 * Данный класс используется для поля таблицы `Document`.
 *
 * @see `org/zenframework/z8/template/view/Documents.bl`
 */
Z8.define('org.zenframework.z8.template.controls.Xml', {
    extend: 'Z8.form.field.TextArea',

    inputCls: 'xml-editor__input',
    tooltip: '',
    editorOutputBlock: null,

    constructor: function (config) {
        config = config || {};
        config.colSpan = 4;
        config.flex = 1;
        config.cls = 'xml-editor';

        this.callParent(config);
    },

    /**
     * @override
     */
    onDestroy: function () {
        this._removeEditorOutputBlock();
        this.callParent();
    },

    /**
     * @override
     */
    completeRender: function () {
        this._createEditorOutputBlock();
        this.callParent();

        DOM.on(this.input, 'scroll', this._onScroll, this);
    },

    /**
     * Для инициализации данных.
     * Не смог понять, как правильно вклиниться в этап добавления данных в элемент,
     * чтобы иметь возможность их обрабатывать «посередине».
     *
     * @param {string} value
     * @param {string} displayValue
     *
     * @override
     */
    setValue: function (value, displayValue) {
        if (value) {
            this._setFormattedValueToEditorOutput(value);
        }

        this.callParent(value, displayValue);
    },

    /**
     * «Нечто» вызывает этот метод каждый раз, когда вносятся изменения в поле.
     * Поэтому он переопределён за неимением более подходящего варианта.
     *
     * @param {string} value
     *
     * @returns {string}
     *
     * @override
     */
    rawToValue: function (value) {
        this._setFormattedValueToEditorOutput(value);

        return value;
    },

    /**
     * Переопределён, чтобы убрать добавление атрибута `title`.
     *
     * @param {string} value
     *
     * @see `Z8.form.field.Text.setRawValue`
     * @override
     */
    setRawValue: function (value) {
        value = this.isEmptyValue(value) ? '' : value;
        DOM.setValue(this.input, value);
    },

    /**
     * @param {Event} event
     * @param {HTMLTextAreaElement} target
     *
     * @override
     */
    onInput: function(event, target) {
        var value = this.rawToValue(
            this.getRawValue()
        );

        this._setFormattedValueToEditorOutput(value);

        this.callParent(event, target);
    },

    /**
     * Синхронизирует прокрутку текста в элементах .xml-editor__input и .xml-editor__output
     * @param {Event} event
     * @param {HTMLTextAreaElement} target
     *
     * @private
     */
    _onScroll: function (event, target) {
        this.editorOutputBlock.scrollTop = target.scrollTop;
    },

    /**
     * @private
     */
    _removeEditorOutputBlock: function () {
        this.editorOutputBlock = null;
        DOM.remove(this.selectNode('.xml-editor__output'));
    },

    /**
     * @private
     */
    _createEditorOutputBlock: function () {
        this.editorOutputBlock = DOM.append(this, {
            tag: 'pre',
            cls: 'xml-editor__output'
        });
    },

    /**
     * @param {string} value
     *
     * @private
     */
    _setFormattedValueToEditorOutput: function (value) {
        DOM.setInnerHtml(
            this.editorOutputBlock,
            this._getFormattedValue(value)
        );
    },

    /**
     * @param {string} value
     *
     * @returns {string}
     *
     * @private
     */
    _getFormattedValue: function (value) {
        return value
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br/>')
            .replace(
                /"(.*?)"/g,
                '<span class="xml-editor__highlighting-attr">"$1"</span>'
            )
            .replace(
                /&lt;(.*?)&gt;/g,
                '<span class="xml-editor__highlighting-tag">&lt;$1&gt;</span>'
            );
    }
});