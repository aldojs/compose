
'use strict'

const assert = require('assert')

/**
 * Compose the given middlewares and return a single middleware
 *
 * @param {Function[]} fns
 * @returns {Function}
 * @public
 */
function compose (fns) {
  assert(fns instanceof Array, 'Expect an array of functions')

  for (let fn of fns) {
    assert(typeof fn === 'function', `Expect function but got "${typeof fn}"`)
  }

  return (ctx, done) => {
    var i = 0

    async function _next () {
      var fn = fns[i++] || done

      if (fn) await fn(ctx, _next)
    }

    return _next()
  }
}

// export
exports = compose
module.exports = compose
exports.default = compose
