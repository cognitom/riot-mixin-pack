function normalize(selector) {
  const re = /^[a-zA-Z]+(\-[a-zA-Z]+)*$/
  return selector.replace(re, m => `${ m }, [data-is="${ m }"]`)
}

export default {
  init: function() {
    this.$ = this.querySelector
    this.$$ = this.querySelectorAll
  },
  /**
   * Gets Node or Tag by CSS selector
   * @param { string } sel - CSS selector
   * @param { boolean } flag - true for Tag
   */
  querySelector: function(sel, flag) {
    const node = this.root.querySelector(normalize(sel))
    return !flag ? node : node._tag || undefined
  },

  /**
   * Gets Nodes or Tags by CSS selector
   * @param { string } sel - CSS selector
   * @param { boolean } flag - true for Tag
   */
  querySelectorAll: function (sel, flag) {
    const nodes = this.root.querySelectorAll(normalize(sel))
    return !flag ? nodes : Array.prototype.map.call(nodes, node => node._tag || undefined)
  }
}
