/* global describe, it */

'use strict'

const compose = require('..')
const assert = require('assert')

describe('dispatching utility', () => {
  it('should work', async () => {
    var stack = [
      (_, next) => next(),
      (_, next) => next(),
      () => 123,
    ]

    assert.equal(await compose(stack)(), 123)
  })

  it('should work with zero handler', async () => {
    await compose([])()
  })

  it('should reject on errors in a handler', async () => {
    var i = 0
    var stack = [
      async (_, next) => next(),
      () => { throw new Error('Ooops!') },
      () => assert.fail('should not call this handler')
    ]

    try {
      let out = await compose(stack)()

      assert.fail('Promise was not rejected')
    } catch (e) {
      assert.equal(e.message, 'Ooops!')
    }
  })

  it('should pass the context to all handlers', async () => {
    var ctx = { foo: 'bar' }

    var stack = [
      (c, next) => {
        assert.deepEqual(c, ctx)
        return next()
      },
      (c, next) => {
        assert.deepEqual(c, ctx)
        return next()
      }
    ]

    await compose(stack)(ctx)
  })
})
