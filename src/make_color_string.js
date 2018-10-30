function getRandom() {
  return Math.floor((Math.random() * 255))
}

export default function() {
  return 'rgb(' + [
    getRandom(),
    getRandom(),
    getRandom()
  ].join(', ') + ')'
}