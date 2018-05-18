
import 'mocha'
import * as assert from 'assert'
import { compose, Middleware } from '../src'

describe('dispatching utility', () => {
  it('should work', async () => {
    var stack = [
      ((_, next) => next()) as Middleware<{}>,
      ((_, next) => next()) as Middleware<{}>,
      () => 123,
    ]

    assert.equal(await compose(stack)({}), 123)
  })

  it('should work with zero handler', async () => {
    await compose([])({})
  })

  it('should reject on errors in a handler', async () => {
    var i = 0
    var stack = [
      (async (_, next) => next()) as Middleware<{}>,
      () => { throw new Error('Ooops!') },
      () => assert.fail('should not call this handler')
    ]

    try {
      let out = await compose(stack)({})

      assert.fail('Promise was not rejected')
    } catch (e) {
      assert.equal(e.message, 'Ooops!')
    }
  })

  it('should pass the context to all handlers', async () => {
    var ctx = { foo: 'bar' }

    var stack = [
      ((c, next) => {
        assert.deepEqual(c, ctx)
        return next()
      }) as Middleware<{}>,
      ((c, next) => {
        assert.deepEqual(c, ctx)
        return next()
      }) as Middleware<{}>
    ]

    await compose(stack)(ctx)
  })
})
