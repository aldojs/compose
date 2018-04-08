/* global describe, it */

'use strict'

const compose = require('..')
const assert = require('assert')

describe('dispatching utility', () => {
  it('should work', async () => {
    var i = 0
    var stack = [
      () => { i++ },
      () => { i++ },
      () => { i++ }
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
      () => { i++ },
      () => { throw new Error('Ooops!') },
      () => { i++ }
    ]

    try {
      await compose(stack)()

      assert.fail('promise was not reject')
    } catch (e) {
      assert.equal(e.message, 'Ooops!')
      assert.equal(i, 1)
    }
  })

  it('should stop if a handler returns `false`', async () => {
    var i = 0
    var stack = [
      () => { i++ },
      () => { i++ },
      () => false,
      () => { i++ }
    ]

    await compose(stack)(null)

    assert.equal(i, 2)
  })

  it('should pass the arguments to all handlers', async () => {
    var aa = 'foo'
    var bb = 123
    var cc = {}

    var stack = [
      (a, b, c) => {
        assert.equal(a, aa)
        assert.equal(b, bb)
        assert.equal(c, cc)
      },
      (a, b, c) => {
        assert.equal(a, aa)
        assert.equal(b, bb)
        assert.equal(c, cc)
      }
    ]

    await compose(stack)(aa, bb, cc)
  })
})
