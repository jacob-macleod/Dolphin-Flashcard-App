// ets_tracing: off
import * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import { identity } from "../Function/index.mjs";
/**
 * Lift a sync (non failable) computation
 */

export const sync = identity;
/**
 * Reads the current context
 */

export const environment = () => identity;
/**
 * Projects a value from the global context in a Reader
 */

export const access = identity;
/**
 * Changes the value of the local context during the execution of the action `ma`
 */

export const provideSome = f => ma => r => ma(f(r));
/**
 * Combines this computation with the specified computation.
 */

export const zip = fb => fa => r => Tp.tuple(fa(r), fb(r));
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

export const chain = f => fa => r => f(fa(r))(r);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>`
 *  whose argument and return types use the type constructor `F` to represent
 *  some computational context.
 */

export const map = f => fa => r => f(fa(r));
/**
 * Succeed with a value A
 */

export const succeed = a => () => a;
/**
 * Run the computation
 */

export const run = self => self({});
/**
 * Run the computation with environment R
 */

export const runEnv = r => self => self(r);
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */

export const tap = f => fa => r => {
  const x = fa(r);
  f(x)(r);
  return x;
};
//# sourceMappingURL=operations.mjs.map