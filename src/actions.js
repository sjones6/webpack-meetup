import makeColorString from './make_color_string.js'

export default {
  getState() {
    return function(state) {
      return state
    }
  },
  loaded() {
    return function() {
      return { loaded: true }
    }
  },
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