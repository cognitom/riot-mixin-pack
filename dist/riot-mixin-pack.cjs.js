'use strict';

/** Call original method and update automatically */
function hook(p, key) {
  var h = function h(e) {
    // call original method
    p[key](e);
    // update only when the argument is an Event object
    if (e instanceof Event) p.update();
    // suppress updating on the inherit tag
    else e.preventUpdate = true;
  };
  h._inherited = true;
  return h;
}

var parentScope = {
  /**
   * Inject properties from parents
   */
  init: function init() {
    var _this = this;

    /** Store the keys originally belonging to the tag */
    this.one('update', function () {
      _this._ownPropKeys = Object.keys(_this);
      _this._ownOptsKeys = Object.keys(_this.opts);
    });
    /** Inherit the properties from parents on each update */
    this.on('update', function () {
      Object.keys(_this.parent).filter(function (key) {
        return ! ~_this._ownPropKeys.indexOf(key);
      }).forEach(function (key) {
        _this[key] = typeof _this.parent[key] != 'function' || _this.parent[key]._inherited ? _this.parent[key] : hook(_this.parent, key);
      });
      Object.keys(_this.parent.opts).filter(function (key) {
        return ! ~_this._ownOptsKeys.indexOf(key);
      }).forEach(function (key) {
        _this.opts[key] = typeof _this.parent.opts[key] != 'function' || _this.parent.opts[key]._inherited ? _this.parent.opts[key] : hook(_this.parent, key);
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

exports.domEvent = domEvent;
exports.syncEvent = syncEvent;
exports.parentScope = parentScope;