# Riot Mixin Pack

This is a series of mixins which make Riot.js more convenient.

## Install

```bash
$ npm install --save-dev riot-mixin-pack
```

## Usage

```js
import { domEvent } from 'riot-mixin-pack'
```

Or, respectively:

```js
import domEvent from 'riot-mixin-pack/dom-event'
```

For ES5:

```js
var domEvent = require('riot-mixin-pack').domEvent
```

Then, apply the mixin to the tag: `this.mixin(domEvent)`

## Mixins

### domEvent

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

### syncEvent

Basically we can update the tag properties on `update` event, but sometimes this could be annoying when the value is updated inside the tag. This mixin provide these:

- `this.on('sync', () => { /* */ })`: fired in `update` event
- `this.skipSync()`: skip next `sync` event

### parentScope

Workaround to avoid `parent.parent....`.

```html
import { parentScope } from 'riot-mixin-pack'

<my-tag>
  <my-child>{ message }</my-child>
  <script>
    this.message = 'Hello!'
  </script>
</my-tag>

<my-child>
  <yield />
  <script>
    this.mixin(parentScope)
  </script>
</my-child>
```
