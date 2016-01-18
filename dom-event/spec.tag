<dom-event-1>
  <dom-event-2 onclick={ click }>
  <script>
    var self = this
    self.counter = 0
    self.clickedTagName = ''
    self.messages = ''
    click (e) {
      self.counter++
      self.message = e.target.value
      self.clickedTagName = e.target.tagName
    }
  </script>
</dom-event-1>

<dom-event-2>
  <p>{ value }</p>
  <script>
    var self = this
    self.mixin(riotMixinPack.domEvent)
    self.value = 'Hello.'

    triggerClick () {
      self.root.value = self.value = 'Clicked!'
      self.triggerDomEvent('click')
    }
  </script>
</dom-event-2>
