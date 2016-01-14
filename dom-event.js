export default {
  /**
   * Trigger Event on DOM (root element of the tag)
   * @param { string } eventName - the name of the event. ex: 'change'
   */
  triggerDomEvent: function(eventName) {
    setTimeout(() => {
      var e
      if (typeof Event == 'function') { // Standard browsers
        e = new Event(eventName)
      } else { // IE 9 ~ 11
        e = document.createEvent('Event')
        e.initEvent(eventName, true, true)
      }
      /** dispatch an event */
      this.root.dispatchEvent(e)
    }, 0)
  }
}
