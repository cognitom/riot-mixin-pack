/** Call original method and update automatically */
function hook(p, key) {
  let h = e => {
    // call original method
    p[key](e)
    // update only when the argument is an Event object
    if (e instanceof Event) p.update()
    // suppress updating on the inherit tag
    else e.preventUpdate = true
  }
  h._inherited = true
  return h
}

export default {
  /**
   * Inject properties from parents
   */
  init: function() {
    /** Store the keys originally belonging to the tag */
    this.one('update', () => {
      this._ownPropKeys = Object.keys(this)
      this._ownOptsKeys = Object.keys(this.opts)
    })
    /** Inherit the properties from parents on each update */
    this.on('update', () => {
      Object.keys(this.parent)
        .filter(key => !~this._ownPropKeys.indexOf(key))
        .forEach(key => {
          this[key] = typeof this.parent[key] != 'function' || this.parent[key]._inherited
            ? this.parent[key]
            : hook(this.parent, key)
        })
      Object.keys(this.parent.opts)
        .filter(key => !~this._ownOptsKeys.indexOf(key))
        .forEach(key => {
          this.opts[key] = typeof this.parent.opts[key] != 'function' || this.parent.opts[key]._inherited
            ? this.parent.opts[key]
            : hook(this.parent, key)
        })
    })
  }
}
