import './app.css'
import { app } from 'hyperapp'
import view from './view.js'

import('./sa.js').then(value => {
  const { state, actions } = value
  app(state, actions, view, document.body)
})


