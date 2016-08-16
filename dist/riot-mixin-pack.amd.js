define(['exports'], function (exports) { 'use strict';

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

  /** Return all property names */
  function getAllPropertyNames(obj) {
    var arr = [];
    for (var key in obj) {
      arr.push(key);
    }return arr;
  }

  /** Call original method and update automatically */
  function hook(p, key) {
    var h = function h(e) {
      // update only when the argument is an Event object
      if (e && e instanceof Event) {
        // suppress updating on the inherit tag
        e.preventUpdate = true;
        // call original method
        p[key](e);
        // update automatically
        p.update();
      } else {
        p[key](e);
      }
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
        _this._ownPropKeys = getAllPropertyNames(_this);
        _this._ownOptsKeys = getAllPropertyNames(_this.opts);
      });
      /** Inherit the properties from parents on each update */
      this.on('update', function () {
        var ignoreProps = ['root', 'triggerDomEvent'];
        getAllPropertyNames(_this.parent)
        // TODO:
        //   Skipping 'triggerDomEvent' is a temporal workaround.
        //   In some cases function on the child would be overriden.
        //   This issue needs more study...
        .filter(function (key) {
          return ! ~_this._ownPropKeys.concat(ignoreProps).indexOf(key);
        }).forEach(function (key) {
          _this[key] = typeof _this.parent[key] != 'function' || _this.parent[key]._inherited ? _this.parent[key] : hook(_this.parent, key);
        });
        getAllPropertyNames(_this.parent.opts).filter(function (key) {
          return ! ~_this._ownOptsKeys.indexOf(key) && key != 'riotTag';
        }).forEach(function (key) {
          _this.opts[key] = typeof _this.parent.opts[key] != 'function' || _this.parent.opts[key]._inherited ? _this.parent.opts[key] : hook(_this.parent, key);
        });
      });
    }
  };

  function normalize(selector) {
    var re = /^[a-zA-Z]+(\-[a-zA-Z]+)*$/;
    return selector.replace(re, function (m) {
      return m + ", [data-is=\"" + m + "\"]";
    });
  }

  var querySelector = {
    init: function init() {
      this.$ = this.querySelector;
      this.$$ = this.querySelectorAll;
    },
    /**
     * Gets Node or Tag by CSS selector
     * @param { string } sel - CSS selector
     * @param { boolean } flag - true for Tag
     */
    querySelector: function querySelector(sel, flag) {
      var node = this.root.querySelector(normalize(sel));
      return !flag ? node : node._tag || undefined;
    },

    /**
     * Gets Nodes or Tags by CSS selector
     * @param { string } sel - CSS selector
     * @param { boolean } flag - true for Tag
     */
    querySelectorAll: function querySelectorAll(sel, flag) {
      var nodes = this.root.querySelectorAll(normalize(sel));
      return !flag ? nodes : Array.prototype.map.call(nodes, function (node) {
        return node._tag || undefined;
      });
    }
  };

  exports.domEvent = domEvent;
  exports.syncEvent = syncEvent;
  exports.parentScope = parentScope;
  exports.querySelector = querySelector;

});