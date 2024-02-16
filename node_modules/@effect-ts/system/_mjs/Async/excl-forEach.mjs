// ets_tracing: off
import * as Collect from "../Collections/Immutable/Chunk/api/collect.mjs";
import * as Chunk from "../Collections/Immutable/Chunk/core.mjs";
import { identity, pipe } from "../Function/index.mjs";
import * as I from "../Iterable/index.mjs";
import * as core from "./core.mjs";
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `Chunk<B>`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 */

export function forEach_(as, f) {
  return core.suspend(() => {
    const acc = [];
    return core.map_(forEachUnit_(as, a => core.map_(f(a), b => {
      acc.push(b);
    })), () => Chunk.from(acc));
  });
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `Chunk<B>`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 *
 * @ets_data_first forEach_
 */

export function forEach(f) {
  return as => forEach_(as, f);
}

function forEachUnitLoop(iterator, f) {
  const next = iterator.next();
  return next.done ? core.unit : core.chain_(f(next.value), () => forEachUnitLoop(iterator, f));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 */


export function forEachUnit_(as, f) {
  return core.suspend(() => forEachUnitLoop(as[Symbol.iterator](), f));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 *
 * @ets_data_first forEachUnit_
 */

export function forEachUnit(f) {
  return as => forEachUnit_(as, f);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEach_`.
 *
 * Optimized to avoid keeping full tree of effects, so that method could be
 * able to handle large input sequences.
 *
 * Additionally, interrupts all effects on any failure.
 */

export function forEachUnitPar_(as, f) {
  return core.chain_(core.environment(), env => core.promise(onInterrupt => {
    return new Promise((resolve, reject) => {
      const is = new core.InterruptionState();
      const promises = [];
      onInterrupt(() => {
        is.interrupt();
      });

      const interruptOnFailure = ex => {
        if (ex._tag === "Failure" && !is.interrupted) {
          is.interrupt();
          reject(ex.e);
        }
      };

      for (const a of as) {
        promises.push(core.runPromiseExitEnv(f(a), env, is).then(interruptOnFailure));
      }

      Promise.all(promises).then(() => {
        resolve();
      });
    });
  }, e => e));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEach_`.
 *
 * Optimized to avoid keeping full tree of effects, so that method could be
 * able to handle large input sequences.
 * Behaves almost like this code:
 *
 * Additionally, interrupts all effects on any failure.
 *
 * @ets_data_first forEachUnitPar_
 */

export function forEachUnitPar(f) {
  return as => forEachUnitPar_(as, f);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `Chunk<B>`.
 *
 * For a sequential version of this method, see `forEach`.
 */

export function forEachPar_(as, f) {
  return core.suspend(() => core.chain_(core.succeedWith(() => []), array => core.map_(forEachUnitPar_(I.map_(as, (a, n) => [a, n]), ([a, n]) => core.chain_(core.suspend(() => f(a)), b => core.succeedWith(() => {
    array[n] = b;
  }))), () => Chunk.from(array))));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `Chunk<B>`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachPar_
 */

export function forEachPar(f) {
  return as => forEachPar_(as, f);
}
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */

export function collectAll(as) {
  return forEach_(as, identity);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 */

export function collectAllPar(as) {
  return forEachPar_(as, identity);
}
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */

export function collectAllUnit(as) {
  return forEachUnit_(as, identity);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 */

export function collectAllUnitPar(as) {
  return forEachUnitPar_(as, identity);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */

export function collectAllWith_(as, pf) {
  return core.map_(collectAll(as), Collect.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */

export function collectAllWith(pf) {
  return as => collectAllWith_(as, pf);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */

export function collectAllWithPar_(as, pf) {
  return core.map_(collectAllPar(as), Collect.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWithPar_
 */

export function collectAllWithPar(pf) {
  return as => collectAllWithPar_(as, pf);
}
//# sourceMappingURL=excl-forEach.mjs.map