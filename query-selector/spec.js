describe('querySelector', function() {
  var appDom // mounting point
  var app // reference to the tag

  before(function() {
    // create mounting points
    appDom = document.createElement('div')
    document.body.appendChild(appDom)
    app = riot.mount(appDom, 'query-selector')[0]
    app.mixin(riotMixinPack.querySelector)
  })

  it('gets single node', function() {
    expect(app.querySelector('.first').value).to.be('a')
  })

  it('gets multiple nodes', function() {
    expect(app.querySelectorAll('.first').length).to.be(2)
    expect(app.querySelectorAll('.first')[1].value).to.be('b')
  })

  it('gets Node instance', function() {
    expect(app.$('.first')).to.be.a(Node)
    expect(app.$('.second')).to.be.a(Node)
  })

  it('gets Tag instance', function() {
    expect(app.$('.second', true).constructor.name).to.be('Tag')
  })

  it('gets undefined if not a custom tag', function() {
    expect(app.$('.first', true)).to.be(undefined)
  })

  it('returns tags which has data-is attr, too', function() {
    expect(app.$$('query-selector-sub')[1].getAttribute('value')).to.be.equal('y')
  })

  after(function() {
    if (app) app.unmount()
  })
})
