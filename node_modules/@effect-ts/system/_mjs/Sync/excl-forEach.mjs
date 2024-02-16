// ets_tracing: off
import * as ChunkCollect from "../Collections/Immutable/Chunk/api/collect.mjs";
import * as Chunk from "../Collections/Immutable/Chunk/core.mjs";
import { identity } from "../Function/index.mjs";
import * as core from "./core.mjs";
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `readonly B[]`.
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
 * returns the results in a new `readonly B[]`.
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
 * produced Syncs sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 */


export function forEachUnit_(as, f, __trace) {
  return core.suspend(() => forEachUnitLoop(as[Symbol.iterator](), f));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced Syncs sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 *
 * @ets_data_first forEachUnit_
 */

export function forEachUnit(f, __trace) {
  return as => forEachUnit_(as, f);
}
/**
 * Evaluate each Sync in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */

export function collectAll(as) {
  return forEach_(as, identity);
}
/**
 * Evaluate each Sync in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */

export function collectAllUnit(as, __trace) {
  return forEachUnit_(as, identity);
}
/**
 * Evaluate each Sync in the structure with `collectAll`, and collect
 * the results with given partial function.
 */

export function collectAllWith_(as, pf, __trace) {
  return core.map_(collectAll(as), ChunkCollect.collect(pf));
}
/**
 * Evaluate each Sync in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */

export function collectAllWith(pf) {
  return as => collectAllWith_(as, pf);
}
//# sourceMappingURL=excl-forEach.mjs.map