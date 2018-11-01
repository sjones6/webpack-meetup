
const dynamicImport = function() {
  return import('./dynamically_loaded.js')
    .then(({ default: x }) => x())
} 

export default (state, actions) => (
  <div>
    <button onclick={dynamicImport}>Load another file.</button>
  </div>
)