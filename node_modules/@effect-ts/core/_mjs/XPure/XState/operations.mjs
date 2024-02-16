import * as F from "@effect-ts/system/XPure";
/**
 * Combines this computation with the specified computation.
 */

export const zip = F.zip;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

export const chain = F.chain;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>`
 *  whose argument and return types use the type constructor `F` to represent
 *  some computational context.
 */

export const map = F.map;
/**
 * Succeed with a value A
 */

export const succeed = F.succeed;
/**
 * Run the computation with input S returning updated state and output
 */

export const run = s => self => F.runState_(self, s);
/**
 * Run the computation with input S returning the updated state and discarding the output
 */

export const runState = s => self => F.runState_(self, s)[0];
/**
 * Run the computation with input S returning the state and discarding the updated state
 */

export const runResult = r => self => F.runResult(r)(self);
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */

export const tap = F.tap;
//# sourceMappingURL=operations.mjs.map