import { flow } from "./flow.mjs";
import { pipe } from "./pipe.mjs";
export { flow, pipe };
/**
 * Will raise if called
 */

export function absurd(_) {
  throw new Error("Called `absurd` function which should be uncallable");
}
/**
 * A constant function that always return A
 */

export function constant(a) {
  return () => a;
}
/**
 * A thunk that returns always `false`
 */

export const constFalse = () => {
  return false;
};
/**
 * A thunk that returns always `null`
 */

export const constNull = () => {
  return null;
};
/**
 * A thunk that returns always `true`
 */

export const constTrue = () => {
  return true;
};
/**
 * A thunk that returns always `undefined`
 */

export const constUndefined = () => {
  return;
};
/**
 * A thunk that returns always `void`
 */

export const constVoid = () => {
  return;
};
/**
 * Flips the order of the arguments of a function of two arguments.
 */

export function flip(f) {
  return (b, a) => f(a, b);
}
/**
 * Identity function
 *
 * @ets_optimize identity
 */

export function identity(a) {
  return a;
}
/**
 * Force string to be literal
 *
 * @ets_optimize identity
 */

export function literal(k) {
  return k;
}
/**
 * Inverts a boolean predicate
 */

export function not(predicate) {
  return a => !predicate(a);
}
/**
 * Construct tuples
 */

export function tuple(...t) {
  return t;
}
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 */

export function tupled(f) {
  return a => f(...a);
}
/**
 * Inverse function of `tupled`
 */

export function untupled(f) {
  return (...a) => f(a);
}
/**
 * Performs unsafe coercion of types
 *
 * @ets_optimize identity
 */

export function unsafeCoerce(a) {
  return a;
}
/**
 * Type Hole, to be used while implementing functions where you need a placeholder
 */

export function hole() {
  throw new Error("Hole should never be called");
}
/**
 * Requires _A to be the one specified
 */

export function enforceOutput() {
  return (
    /**
     * @ets_optimize identity
     */
    _ => _
  );
}
/**
 * Requires _E to be the one specified
 */

export function enforceError() {
  return (
    /**
     * @ets_optimize identity
     */
    _ => _
  );
}
/**
 * Requires _R to be the one specified
 */

export function enforceContext() {
  return (
    /**
     * @ets_optimize identity
     */
    _ => _
  );
}
/**
 * Increments a number by one
 */

export function increment(n) {
  return n + 1;
}
/**
 * Decrements a number by one
 */

export function decrement(n) {
  return n - 1;
}
//# sourceMappingURL=core.mjs.map