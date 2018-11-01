import('./app.js')

if (module.hot) {
  module.hot.accept(function() {
    app(actions.getState(), actions, view, document.body)
  })
}