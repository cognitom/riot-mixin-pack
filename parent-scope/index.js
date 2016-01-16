function hook(p, key) {
  let h = e => {
    e.preventUpdate = true
    p[key](e)
    p.update()
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
      this._ownPropKeys = Object.getOwnPropertyNames(this)
      this._ownOptsKeys = Object.getOwnPropertyNames(this.opts)
    })
    /** Inherit the properties from parents on each update */
    this.on('update', () => {
      Object.getOwnPropertyNames(this.parent)
        .filter(key => !~this._ownPropKeys.indexOf(key))
        .forEach(key => {
          this[key] = typeof this.parent[key] != 'function' || this.parent[key]._inherited
            ? this.parent[key]
            : hook(this.parent, key)
        })
      Object.getOwnPropertyNames(this.parent.opts)
        .filter(key => !~this._ownOptsKeys.indexOf(key))
        .forEach(key => {
          this.opts[key] = typeof this.parent.opts[key] != 'function' || this.parent.opts[key]._inherited
            ? this.parent.opts[key]
            : hook(this.parent, key)
        })
    })
  }
}
