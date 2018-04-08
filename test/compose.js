/* global describe, it */

'use strict'

const compose = require('..')
const assert = require('assert')

describe('composition utility', () => {
  it('should export a function', () => {
    assert(typeof compose === 'function')
  })

  describe('compose(fns)', () => {
    it('should return a function', () => {
      assert(typeof compose([]) === 'function')
    })

    it('should only accept an array', () => {
      assert.throws(() => compose())
      assert.throws(() => compose({}))
      assert.throws(() => compose(null))
      assert.doesNotThrow(() => compose([]))
    })
  
    it('should only accept an array of functions', () => {
      assert.doesNotThrow(() => compose([
        () => {}, () => {}, () => {}
      ]))
  
      assert.throws(() => compose([
        () => {}, null, () => {}
      ]))
    })
  })
})
