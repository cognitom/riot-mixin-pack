# domEvent

To mimic native DOM element perfectly, the component should fire DOM event. The mixin provide the method for this purpose:

- `this.triggerDomEvent(eventName)`: fire the event on `root`

```html
import { domEvent, syncEvent } from 'riot-mixin-pack'

<input-text>
  <input type="text" value={ value } onchange={ change }>
  <script>
    this.mixin(domEvent)
    this.mixin(syncEvent)
    change (e) {
      e.stopPropagation()
      this.root.value = this.value = e.target.value
      this.triggerDomEvent('change')
      this.skipSync()
    }
    this.on('sync', function() {
      this.value = opts.value
    })
  </script>
</input-text>
```
