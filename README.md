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

- [domEvent](dom-event/)
- [syncEvent](sync-event/)
- [parentScope](parent-scope/)
