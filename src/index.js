import { app } from 'hyperapp'
import makeColorString from './make_color_string.js'
import {
  div,
  h1,
  span,
  button
} from './dom.js'

const state = {
  color: 'rgb(0,0,0)',
  interval: null
}

const actions = {
  setColor() {
    return function() {
      return { color: makeColorString() }
    }
  },
  cycleColors() {
    return function(state, actions) {
      if (state.interval) {
        clearInterval(state.interval)
        return { interval: null }
      }
      return {
        interval: setInterval(actions.setColor, 500)
      }
    }
  }
}

const view = (state, actions) => {
  return div({}, [
    h1({
      id: 'title',
      style: 'color: ' + state.color 
    }, [
      'Yay, Hyperapp! ',
      span({ }, [state.color])
    ]),
    button({onclick: actions.cycleColors}, ['cycle colors'])
  ])
}

app(state, actions, view, document.body)