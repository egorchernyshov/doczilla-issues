/**
 * JS-класс, расширяющий функциональность поля `Z8.form.field.Text`.
 * Добавляет элемент для аудио-файла.
 * Данный класс используется для поля таблицы `Document`.
 *
 * @see `org/zenframework/z8/template/view/Documents.bl`
 */
Z8.define('org.zenframework.z8.template.controls.Audio', {
    extend: 'Z8.form.field.Text',

    isFile: true,
    editor: false,
    player: null,

    constructor: function (config) {
        config = config || {};
        config.colSpan = 4;
        config.cls = 'audio';

        this.callParent(config);
    },

    /**
     * @override
     */
    validate: function() {
        if (!this.getValue()) {
            this._removePlayer();
        }
    },

    /**
     * @returns {*}
     *
     * @override
     */
    htmlMarkup: function () {
        this.triggers.push({
            icon: 'fa-upload',
            tooltip: 'Загрузить mp3-файл',
            handler: this._onUploadFile,
            scope: this
        });

        return this.callParent();
    },

    /**
     * @override
     */
    completeRender: function () {
        this.callParent();

        this.fileInput = DOM.append(this, {
            tag: 'input',
            type: 'file',
            accept: '.mp3'
        });

        DOM.on(this.fileInput, 'change', this._onFileInputChange, this);
    },

    /**
     * @override
     */
    onDestroy: function () {
        DOM.un(this.fileInput, 'change', this._onFileInputChange, this);
        DOM.remove(this.fileInput);
        this.fileInput = null;
        this._removePlayer();

        this.callParent();
    },

    /**
     * @param {string} value
     *
     * @override
     */
    setRawValue: function (value) {
        if (value) {
            this._removePlayer();
            this._addPlayer();
        }

        this.callParent(value);
    },

    /**
     * @param {object[]} value
     *
     * @returns {string}
     *
     * @override
     */
    valueToRaw: function (value) {
        return Z8.isEmpty(value) ? '' : value[0].name;
    },

    /**
     * @private
     */
    _onUploadFile: function () {
        this.fileInput.value = null;
        this.fileInput.click();
    },

    /**
     * @private
     */
    _onFileInputChange: function () {
        var me = this;

        if (0 === this.fileInput.files.length) {
            return;
        }

        me.triggers[0].setBusy(true);
        var callbackConfig = {
            scope: me,
            fn: function () {
                me.triggers[0].setBusy(false);
            }
        };

        me.getRecord().attach(
            me.name,
            this.fileInput.files,
            callbackConfig
        );
    },

    /**
     * @private
     */
    _removePlayer: function () {
        DOM.remove(this.selectNode('.audio-player'));
    },

    /**
     * @private
     */
    _addPlayer: function () {
        var me = this;
        var files = this.getValue();

        if (Z8.isEmpty(files)) {
            return;
        }

        me.player = DOM.append(me, {
            tag: 'audio',
            cls: 'audio-player',
            controls: null,
            style: 'width: 95%',
            cn: [
                {tag: 'source', src: me._getUrl(files[0]), type: 'audio/mpeg'}
            ]
        });
    },

    /**
     * @param {{path: string, id:string}} file
     * @returns {string}
     *
     * @private
     */
    _getUrl: function (file) {
        return encodeURI(file.path)
            + '?&session=' + Application.session
            + (file.id != null ? '&id=' + file.id : '')
    }
});