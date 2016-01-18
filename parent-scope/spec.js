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
    app = riot.mount(appDom, 'parent-scope-1')[0]
    var tag = app.tags['parent-scope-2']

    expect(tag.root.querySelector('p').textContent).to.be('')
    expect(tag.strProp).to.be(undefined)
    expect(tag.funcProp).to.be(undefined)
  })

  it('inherit props: nest-level 1', function() {
    app = riot.mount(appDom, 'parent-scope-3')[0]
    var tag = app.tags['parent-scope-4']

    expect(tag.root.querySelector('p').textContent).to.be('A')
    expect(tag.strProp).to.be('A')
    expect(tag.objProp).to.be(app.objProp)
    expect(tag.funcProp._inherited).to.be(true)
  })

})
