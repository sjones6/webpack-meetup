import makeColorString from './make_color_string.js'

export default {
  setColor() {
    return function() {
      return { color: makeColorString() }
    }
  },
  startCyclingColors() {
    return function(state, actions) {
      return {
        interval: setInterval(actions.setColor, 500)
      }
    }
  },
  stopCyclingColors() {
    return function(state, actions) {
      state.interval && clearInterval(state.interval)
      return { interval: null }
    }
  }
}