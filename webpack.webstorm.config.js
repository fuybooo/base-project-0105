const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    extensions: [ '.ts', '.js', '.tsx', '.vue', '.json' ],
    alias: {
      '@': resolve('src'),
      '@shared': resolve('shared'),
    },
  },
}
