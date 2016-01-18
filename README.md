# Riot Mixin Pack

This is a series of mixins which make Riot.js more convenient.

## Installation

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

See more detail for each mixin:

- [domEvent](dom-event/)
- [syncEvent](sync-event/)
- [parentScope](parent-scope/)

## Development

Each directory has these files:

- `index.js`: source code of mixin
- `README`: description about it
- `spec.js`: test script
- `spec.tag`: tag(s) for testing

Some note:

- `index.js` should be written in ES6.
- `spec.js` and `spec.tag` should be written in ES5.
- In `spec.tag`, all tags has the prefix. For example: `<sync-event-app>` `<sync-event-child>` for syncEvent mixin.
