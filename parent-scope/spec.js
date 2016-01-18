describe('parentScope', function() {
  var appDom // mounting point
  var app // reference to the tag

  beforeEach(function() {
    // create mounting points
    appDom = document.createElement('div')
    document.body.appendChild(appDom)
  })

  afterEach(function() {
    if (app) app.unmount()
  })

  it('without mixin (Riot specs)', function() {
    app = riot.mount(appDom, 'parent-scope-1', { strOpts: 'B' })[0]
    var tag = app.tags['parent-scope-2']

    expect(tag.root.querySelector('p').textContent).to.be('')
    expect(tag.strProp).to.be(undefined)
    expect(tag.funcProp).to.be(undefined)
    expect(app.opts.strOpts).to.be('B')

    expect(tag._ownPropKeys).to.be(undefined)
    expect(tag._ownOptsKeys).to.be(undefined)
  })

  describe('nest-level 1', function() {
    it('inherit props', function() {
      app = riot.mount(appDom, 'parent-scope-3')[0]
      var tags = app.tags['parent-scope-4']

      expect(tags[0].root.querySelector('p').textContent).to.be('A')
      expect(tags[0].strProp).to.be('A')
      expect(tags[0].objProp).to.be(app.objProp)
      expect(tags[0].funcProp._inherited).to.be(true)
    })

    it('inherit opts', function() {
      app = riot.mount(appDom, 'parent-scope-3', { strOpts: 'B' })[0]
      var tags = app.tags['parent-scope-4']

      expect(tags[1].root.querySelector('p').textContent).to.be('B')
      expect(tags[1].opts.strOpts).to.be('B')
      expect(tags[1].opts.onclick).to.be(app.funcProp)
    })

    it('inherited function call', function() {
      app = riot.mount(appDom, 'parent-scope-3')[0]
      var tags = app.tags['parent-scope-4']

      tags[0].funcProp()
      expect(app.counter).to.be(1)
    })
  })

  describe('nest-level 2', function() {
    it('inherit props', function() {
      app = riot.mount(appDom, 'parent-scope-5')[0]
      var tags = app.tags['parent-scope-4'].tags['parent-scope-4']

      expect(tags[0].root.querySelector('p').textContent).to.be('A')
      expect(tags[0].strProp).to.be('A')
      expect(tags[0].objProp).to.be(app.objProp)
      expect(tags[0].funcProp._inherited).to.be(true)
    })

    it('inherit opts', function() {
      app = riot.mount(appDom, 'parent-scope-5', { strOpts: 'B' })[0]
      var tags = app.tags['parent-scope-4'].tags['parent-scope-4']

      expect(tags[1].root.querySelector('p').textContent).to.be('B')
      expect(tags[1].opts.strOpts).to.be('B')
      expect(tags[1].opts.onclick._inherited).to.be(true)
    })

    it('inherited function call', function() {
      app = riot.mount(appDom, 'parent-scope-5')[0]
      var tags = app.tags['parent-scope-4'].tags['parent-scope-4']

      tags[0].funcProp()
      expect(app.counter).to.be(1)
    })
  })

})
