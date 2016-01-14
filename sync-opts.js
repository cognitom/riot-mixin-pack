export default {
  /** Init mixin on each tag */
  init: function() {
    this._shouldSyncFromOpts = true
    this.on('update', () => {
      if (this._shouldSyncFromOpts) this.trigger('sync')
      this._shouldSyncFromOpts = true
    })
  },

  /** Skip sync event once */
  skipSync: function() {
    this._shouldSyncFromOpts = false
  }
}
