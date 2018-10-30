import {
  div,
  h1,
  span,
  button
} from './dom.js'

export default (state, actions) => div({}, [
  h1({
    id: 'title',
    style: 'color: ' + state.color 
  }, [
    'Yay, Hyperapp! ',
    span({ }, [state.color])
  ]),
  button({onclick: state.interval ? actions.stopCyclingColors : actions.startCyclingColors}, [state.interval ? 'stop ' : 'start', ' cycling colors'])
])