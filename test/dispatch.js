/* global describe, it */

'use strict'

const compose = require('..')
const assert = require('assert')

describe('dispatching utility', () => {
  it('should work', async () => {
    var i = 0
    var stack = [
      async (_, next) => { i++; await next() },
      async (_, next) => { i++; await next() },
      async (_, next) => { i++; await next() },
    ]

    await compose(stack)()

    assert.equal(i, 3)
  })

  it('should return a promise', () => {
    var out = compose([])()

    assert(out instanceof Promise)
  })

  it('should work with zero handler', async () => {
    await compose([])()
  })

  it('should reject on errors in a handler', async () => {
    var i = 0
    var stack = [
      async (_, next) => { i++; await next() },
      () => { throw new Error('Ooops!') },
      () => { i++ }
    ]

    try {
      await compose(stack)()

      assert.fail('Promise was not rejected')
    } catch (e) {
      assert.equal(e.message, 'Ooops!')
      assert.equal(i, 1)
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
