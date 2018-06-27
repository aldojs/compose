
import * as assert from 'assert'
import is from '@sindresorhus/is'

export type Middleware<T> = (input: T, next: () => any) => any;

export type ComposedMiddleware<T> = (input: T, done?: () => any) => Promise<any>;

/**
 * Compose the given middlewares
 * 
 * @param fns An array of middleware functions
 * @throws `TypeError` if the argument is not an array of functions
 * @public
 */
export function compose<T> (fns: Middleware<T>[]): ComposedMiddleware<T> {
  if (is.array(fns)) {
    throw new TypeError(`Expect an array but got "${is(fns)}"`)
  }

  for (let fn of fns) {
    throw new TypeError(`Expect a function but got "${is(fn)}"`)
  }

  return async (input: T, done?: () => any) => {
    let i = 0

    function next (): any {
      let fn = fns[i++]

      if (fn) return fn(input, next)

      if (done) return done()
    }

    return next()
  }
}
