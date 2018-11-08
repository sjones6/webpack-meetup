import _ from 'lodash'

export default (state, actions) => (
  <div>
    <h1 id="title" style={`color: ` + state.color }>Yay, Hyperapp and JSX! <span>{_.get(state, 'color')}</span></h1>
    <button onclick={state.interval ? actions.stopCyclingColors : actions.startCyclingColors}>{state.interval ? 'stop ' : 'start'} cycling colors</button>
  </div>
)