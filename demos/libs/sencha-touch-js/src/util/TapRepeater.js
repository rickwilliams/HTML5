/**
 * @class Ext.util.TapRepeater
 * @extends Ext.util.Observable
 *
 * A wrapper class which can be applied to any element. Fires a "tap" event while the
 * mouse is pressed. The interval between firings may be specified in the config but
 * defaults to 20 milliseconds.
 *
 * @constructor
 * @param {Mixed} el The element to listen on
 * @param {Object} config
 */
Ext.util.TapRepeater = Ext.extend(Ext.util.Observable, {

    constructor: function(el, config) {
        this.el = Ext.get(el);

        Ext.apply(this, config);

        this.addEvents(
        /**
         * @event mousedown
         * Fires when the mouse button is depressed.
         * @param {Ext.util.ClickRepeater} this
         * @param {Ext.EventObject} e
         */
        "touchstart",
        /**
         * @event click
         * Fires on a specified interval during the time the element is pressed.
         * @param {Ext.util.ClickRepeater} this
         * @param {Ext.EventObject} e
         */
        "tap",
        /**
         * @event mouseup
         * Fires when the mouse key is released.
         * @param {Ext.util.ClickRepeater} this
         * @param {Ext.EventObject} e
         */
        "touchend"
        );

        this.el.on({
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            scope: this
        });

        if (this.preventDefault || this.stopDefault) {
            this.el.on('tap', this.eventOptions, this);
        }

        Ext.util.TapRepeater.superclass.constructor.call(this);
    },

    interval: 10,
    delay: 250,
    preventDefault: true,
    stopDefault: false,
    timer: 0,

    // @private
    eventOptions: function(e) {
        if (this.preventDefault) {
            e.preventDefault();
        }
        if (this.stopDefault) {
            e.stopEvent();
        }
    },

    // @private
    destroy: function() {
        Ext.destroy(this.el);
        this.purgeListeners();
    },

    // @private
    onTouchStart: function(e) {
        clearTimeout(this.timer);
        if (this.pressClass) {
            this.el.addClass(this.pressClass);
        }
        this.tapStartTime = new Date();

        this.fireEvent("touchstart", this, e);
        this.fireEvent("tap", this, e);

        // Do not honor delay or interval if acceleration wanted.
        if (this.accelerate) {
            this.delay = 400;
        }
        this.timer = this.tap.defer(this.delay || this.interval, this, [e]);
    },

    // @private
    tap: function(e) {
        this.fireEvent("tap", this, e);
        this.timer = this.tap.defer(this.accelerate ? this.easeOutExpo(this.tapStartTime.getElapsed(),
            400,
            -390,
            12000) : this.interval, this, [e]);
    },

    // Easing calculation
    // @private
    easeOutExpo: function(t, b, c, d) {
        return (t == d) ? b + c : c * ( - Math.pow(2, -10 * t / d) + 1) + b;
    },

    // @private
    onTouchEnd: function(e) {
        clearTimeout(this.timer);
        this.el.removeClass(this.pressClass);
        this.fireEvent("touchend", this, e);
    }
});
