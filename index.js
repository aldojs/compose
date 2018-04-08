
'use strict'

const assert = require('assert')
const { setImmediate } = require('timers')

// export
exports = compose
module.exports = compose
exports.default = compose

/**
 * Compose the given handlers and return a handler
 *
 * @param {Function[]} fns
 * @returns {Function}
 * @public
 */
function compose (fns) {
  assert(fns instanceof Array, 'Expect an array of handlers')

  for (let fn of fns) {
    assert(typeof fn === 'function', `Expect function but got "${typeof fn}"`)
  }

  return (...args) => _dispatch(args, fns)
}

/**
 * Invoke the handlers one by one
 *
 * @param {Any[]} args
 * @param {Function[]} fns
 * @returns {Promise}
 * @private
 */
function _dispatch (args, fns) {
  return new Promise((resolve, reject) => {
    var i = 0

    next()

    /**
     * @param {Error} err
     * @param {Boolean} stop
     */
    function next (err, stop = false) {
      if (err != null) return reject(err)

      var fn = fns[i++]

      if (stop || !fn) return resolve()

      setImmediate(_try, fn, args, next)
    }
  })
}

/**
 * Await the current handler then call the next one
 *
 * @param {Function} fn
 * @param {Any[]} args
 * @param {Function} next
 * @private
 */
async function _try (fn, args, next) {
  try {
    var call = await fn(...args)

    next(null, call === false)
  } catch (error) {
    next(error)
  }
}
