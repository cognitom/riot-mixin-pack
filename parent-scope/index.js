export default {
  /**
   * Inject properties from parents
   */
  init: function() {
    this.one('update', () => {
      this._ownPropKeys = Object.getOwnPropertyNames(this)
      this._ownOptsKeys = Object.getOwnPropertyNames(this.opts)
    })
    this.on('update', () => {
      Object.getOwnPropertyNames(this.parent)
        .filter(key => !~this._ownPropKeys.indexOf(key))
        .forEach(key => {
          if (typeof this.parent[key] != 'function' || this.parent[key]._inherited) {
            this[key] = this.parent[key]
          } else {
            const hook = p => e => {
              e.preventUpdate = true
              p[key](e)
              p.update()
            }
            this[key] = hook(this.parent)
            this[key]._inherited = true
          }
        })
      Object.getOwnPropertyNames(this.parent.opts)
        .filter(key => !~this._ownOptsKeys.indexOf(key))
        .forEach(key => {
          if (typeof this.parent.opts[key] != 'function' || this.parent.opts[key]._inherited) {
            this.opts[key] = this.parent.opts[key]
          } else {
            const hook = p => e => {
              e.preventUpdate = true
              p[key](e)
              p.update()
            }
            this.opts[key] = hook(this.parent)
            this.opts[key]._inherited = true
          }
        })
    })
  }
}
