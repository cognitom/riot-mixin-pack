<parent-scope-1>
  <parent-scope-2 attr={ funcProp }>{ strProp }</parent-scope-2>
  <script>
    var self = this
    self.strProp = 'A'
    self.counter = 0
    funcProp (e) {
      self.counter++
    }
  </script>
</parent-scope-1>

<parent-scope-2>
  <p><yield/></p>
  <script>
    var self = this
    self.counter2 = 0
    self.one('update', function() {
      self.counter2++
    })
  </script>
</parent-scope-2>

<parent-scope-3>
  <parent-scope-4>{ strProp }</parent-scope-4>
  <parent-scope-4 onclick={ funcProp }>{ opts.strOpts }</parent-scope-4>
  <script>
    var self = this
    self.counter = 0
    self.strProp = 'A'
    self.objProp = { a: 1, b: 2 }
    funcProp (e) {
      self.counter++
    }
    sameNameFunc (e) {
      self.counter++
    }
  </script>
</parent-scope-3>

<parent-scope-4>
  <p><yield/></p>
  <script>
    var self = this
    self.mixin(riotMixinPack.parentScope)
    sameNameFunc (e) {
      // do nothing
    }
  </script>
</parent-scope-4>

<parent-scope-5>
  <parent-scope-4>
    <parent-scope-4>{ strProp }</parent-scope-4>
    <parent-scope-4 onclick={ funcProp }>{ opts.strOpts }</parent-scope-4>
  </parent-scope-4>
  <script>
    var self = this
    self.counter = 0
    self.strProp = 'A'
    self.objProp = { a: 1, b: 2 }
    funcProp (e) {
      self.counter++
    }
    sameNameFunc (e) {
      self.counter++
    }
  </script>
</parent-scope-5>
