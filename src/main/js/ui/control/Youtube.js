/**
 * JS-класс, расширяющий функциональность поля `Z8.form.field.Text`.
 * Добавляет элемент для ссылки на видео с youtube.
 * Данный класс используется для поля таблицы `Document`.
 *
 * @see `org/zenframework/z8/template/view/Documents.bl`
 */
Z8.define('org.zenframework.z8.template.controls.Youtube', {
    extend: 'Z8.form.field.Text',

    videoId: null,

    constructor: function (config) {
        config = config || {};
        config.colSpan = 4;
        config.cls = 'youtube';

        this.callParent(config);
    },

    initComponent: function () {
        this.triggers = {
            icon: 'fa-youtube-play',
            tooltip: 'Открыть плеер',
            handler: this._onOpenWindow,
            scope: this
        };

        this.callParent();
    },

    /**
     * @example https://www.youtube.com/watch?v=<id>&feature=youtu.be
     * @example https://youtu.be/<id>
     *
     * @override
     */
    validate: function () {
        var url = this.getValue();
        var validationRegex = /(http:\/\/|https:\/\/)?(www)?(youtube\.com|youtu\.be)?\/(watch\?v=)?(.{11})/;

        if (validationRegex.test(url)) {
            this.setValid(true);
            this.videoId = this._getVideoId(url);
        } else {
            this.setValid(false);
            this.videoId = null;
        }
    },

    /**
     * @param {string} url
     *
     * @returns {string}
     *
     * @private
     */
    _getVideoId: function (url) {
        var regex = /(.*)(youtube\.com|youtu\.be)?\/(watch\?v=)?(.{11})(&.+?)?/;

        return url.match(regex)[4];
    },

    /**
     * @private
     */
    _onOpenWindow: function () {
        if (!this.videoId) {
            return;
        }

        new Z8.window.Window({
            header: 'Youtube',
            icon: 'fa-youtube-play',
            controls: [this._getVideo(this.videoId)],
            closeButton: false,
            scope: this,
            handler: function (window) {
                window.close();
            }
        }).open();
    },

    /**
     * @param {string} id
     * @returns {object}
     *
     * @private
     */
    _getVideo: function (id) {
        return  {
            tag: 'iframe',
            width: '100%',
            height: '100%',
            src: 'https://www.youtube.com/embed/' + id,
            frameborder: '0',
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
            allowfullscreen: null,
        };
    },
});