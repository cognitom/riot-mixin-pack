<sync-event-1>
  <p>{ counterS }</p>
  <script>
    var self = this
    self.mixin(riotMixinPack.syncEvent)
    self.counterS = 0
    self.counterU = 0

    self.on('sync', function() {
      self.counterS++
    })
    self.on('update', function() {
      self.counterU++
    })
    countUp () {
      self.update()
    }
    countUpWoSync () {
      self.skipSync()
      self.update()
    }
  </script>
</sync-event-1>
