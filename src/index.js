import { app } from 'hyperapp'
import actions from './actions.js'
import view from './view.js'
import state from './state.js'

app(state, actions, view, document.body)