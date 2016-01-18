describe('syncEvent', function() {
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

  it('syncs opts', function() {
    app = riot.mount(appDom, 'sync-event-1')[0]

    expect(app.root.querySelector('p').textContent).to.be('1')
    expect(app.counterU).to.be(1)
    expect(app.counterS).to.be(1)

    app.countUp()
    expect(app.root.querySelector('p').textContent).to.be('2')
    expect(app.counterU).to.be(2)
    expect(app.counterS).to.be(2)
  })

  it('skips sync', function() {
    app = riot.mount(appDom, 'sync-event-1')[0]

    expect(app.root.querySelector('p').textContent).to.be('1')
    expect(app.counterU).to.be(1)
    expect(app.counterS).to.be(1)

    app.countUpWoSync()
    expect(app.root.querySelector('p').textContent).to.be('1')
    expect(app.counterU).to.be(2)
    expect(app.counterS).to.be(1)
  })

})
