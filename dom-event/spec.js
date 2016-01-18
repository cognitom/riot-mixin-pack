describe('domEvent', function() {
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

  it('domEvent triggered', function(done) {
    app = riot.mount(appDom, 'dom-event-1')[0]
    tag = app.tags['dom-event-2']

    tag.triggerClick()
    setTimeout(function() {
      expect(app.counter).to.be(1)
      expect(app.message).to.be('Clicked!')
      expect(app.clickedTagName).to.be('DOM-EVENT-2')
      done()
    }, 10)
  })
})
