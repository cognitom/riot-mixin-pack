# parentScope

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
