import { get } from 'lodash'
import state from './state.js'

export default function() {
  alert(get(state, 'color'))
  alert('Dynamically loaded!!')
}