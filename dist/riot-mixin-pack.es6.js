var parentScope = {
  /**
   * Inject properties from parents
   */
  init: function init() {
    var _this = this;

    this.one('update', function () {
      _this._ownPropKeys = Object.getOwnPropertyNames(_this);
      _this._ownOptsKeys = Object.getOwnPropertyNames(_this.opts);
    });
    this.on('update', function () {
      Object.getOwnPropertyNames(_this.parent).filter(function (key) {
        return ! ~_this._ownPropKeys.indexOf(key);
      }).forEach(function (key) {
        _this[key] = _this.parent[key];
      });
      Object.getOwnPropertyNames(_this.parent.opts).filter(function (key) {
        return ! ~_this._ownOptsKeys.indexOf(key);
      }).forEach(function (key) {
        _this.opts[key] = _this.parent.opts[key];
      });
    });
  }
};

var syncEvent = {
  /** Init mixin on each tag */
  init: function init() {
    var _this = this;

    this._shouldSyncFromOpts = true;
    this.on('update', function () {
      if (_this._shouldSyncFromOpts) _this.trigger('sync');
      _this._shouldSyncFromOpts = true;
    });
  },

  /** Skip sync event once */
  skipSync: function skipSync() {
    this._shouldSyncFromOpts = false;
    return this; // return this for method chain
  }
};

var domEvent = {
  /**
   * Trigger Event on DOM (root element of the tag)
   * @param { string } eventName - the name of the event. ex: 'change'
   */
  triggerDomEvent: function triggerDomEvent(eventName) {
    var _this = this;

    setTimeout(function () {
      var e;
      if (typeof Event == 'function') {
        // Standard browsers
        e = new Event(eventName);
      } else {
        // IE 9 ~ 11
        e = document.createEvent('Event');
        e.initEvent(eventName, true, true);
      }
      /** dispatch an event */
      _this.root.dispatchEvent(e);
    }, 0);
    return this; // return this for method chain
  }
};

export { domEvent, syncEvent, parentScope };