# querySelector

The example below is self-explanatory enough:

```html
<my-tag>
  <input class="first" value="a">
  <input class="first" value="b">
  <input-special class="second" value="x" />
  <p>{ $('.first').value }</p>
  <script>
    this.querySelector('.first').value // a
    this.querySelectorAll('.first')[1].value // b

    this.$('.first') // DOM
    this.$('.first', true)// undefined
    this.$('.second') // DOM
    this.$('.second', true) // Tag
  </script>
</my-tag>
```

- `$`: alias to `querySelector`
- `$$`: alias to `querySelectorAll`
- `querySelector(selector, true)`: gets a Tag instance instead of DOM
- `$('input-special')` --> `$('input-special'),$([data-is='input-special'])`
