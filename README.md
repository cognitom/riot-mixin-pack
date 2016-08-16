[![Build Status][travis-image]][travis-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

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
- [querySelector](query-selector/)

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


[travis-image]:https://img.shields.io/travis/cognitom/riot-mixin-pack.svg?style=flat-square
[travis-url]:https://travis-ci.org/cognitom/riot-mixin-pack

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[npm-version-image]:http://img.shields.io/npm/v/riot-mixin-pack.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/riot-mixin-pack.svg?style=flat-square
[npm-url]:https://npmjs.org/package/riot-mixin-pack
