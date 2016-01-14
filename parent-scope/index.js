export default {
  /**
   * Inject properties from parents
   */
  init: function() {
    this.on('mount', () => {
      this._ownPropKeys = Object.getOwnPropertyNames(this)
      this._ownOptsKeys = Object.getOwnPropertyNames(this.opts)
    })
    this.on('update', () => {
      Object.getOwnPropertyNames(this.parent)
        .filter(key => !~this._ownPropKeys.indexOf(key))
        .forEach(key => { this[key] = this.parent[key] })
      Object.getOwnPropertyNames(this.parent.opts)
        .filter(key => !~this._ownOptsKeys.indexOf(key))
        .forEach(key => { this.opts[key] = this.parent.opts[key] })
    })
  }
}
