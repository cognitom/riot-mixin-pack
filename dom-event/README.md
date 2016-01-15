# domEvent

To mimic native DOM element perfectly, the component should fire DOM event. The mixin provide the method for this purpose:

- `this.triggerDomEvent(eventName)`: fire the event on `root`

```html
import { domEvent, syncEvent } from 'riot-mixin-pack'

<input-text>
  <input type="text" value={ value } onchange={ change }>
  <script>
    this.mixin(domEvent).mixin(syncEvent)
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

## Custom events

We can trigger names as we like. But be aware that nobody listens them at default. For example:

```html
<my-tag onpush={ doSomething } />
```

```js
this.triggerDomEvent('push')
```

In this case `doSomethig()` will never be called. Compare the next example:

```html
<my-tag onclick={ doSomething } />
```

```js
this.triggerDomEvent('click')
```

In this case above, syntax is the same, but all HTML tags have `onclick` event handlers at default, so `doSomethig()` will be called as we expect.

It needs to use `addEventListener` for custom named events:

```html
<my-tag name="first" />
this.first.addEventListener('push', doSomething)
```

```js
this.triggerDomEvent('push')
```
