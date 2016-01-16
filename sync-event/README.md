### syncEvent

Basically we can update the tag properties on `update` event, but sometimes this could be annoying when the value is updated inside the tag itself. This mixin provide these:

- `this.on('sync', () => { /* */ })`: fired in `update` event
- `this.skipSync()`: skip next `sync` event

See more details on [domEvent](../dom-event/).