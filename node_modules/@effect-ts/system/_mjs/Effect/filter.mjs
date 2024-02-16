// ets_tracing: off
import { compact } from "../Collections/Immutable/Chunk/api/compact.mjs";
import { pipe } from "../Function/index.mjs";
import * as I from "../Iterable/index.mjs";
import * as O from "../Option/index.mjs";
import * as core from "./core.mjs";
import * as forEach from "./excl-forEach.mjs";
import * as map from "./map.mjs";
import * as zipWith from "./zipWith.mjs";
/**
 * Filters the collection using the specified effectual predicate.
 *
 * @ets_data_first filter_
 */

export function filter(f, __trace) {
  return as => filter_(as, f, __trace);
}
/**
 * Filters the collection using the specified effectual predicate.
 */

export function filter_(as, f, __trace) {
  return core.suspend(() => I.reduce_(as, core.succeedWith(() => []), (io, a) => zipWith.zipWith_(io, core.suspend(() => f(a)), (as_, p) => {
    if (p) {
      as_.push(a);
    }

    return as_;
  })), __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 */

export function filterPar_(as, f, __trace) {
  return map.map_(forEach.forEachPar_(as, a => map.map_(f(a), b => b ? O.some(a) : O.none), __trace), compact);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * @ets_data_first filterPar_
 */

export function filterPar(f, __trace) {
  return as => filterPar_(as, f, __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * This method will use up to `n` fibers.
 */

export function filterParN_(as, n, f, __trace) {
  return map.map_(forEach.forEachParN_(as, n, a => map.map_(f(a), b => b ? O.some(a) : O.none), __trace), compact);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * This method will use up to `n` fibers.
 *
 * @ets_data_first filterParN_
 */

export function filterParN(n, f, __trace) {
  return as => filterParN_(as, n, f, __trace);
}
/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 *
 * @ets_data_first filterNot_
 */

export function filterNot(f, __trace) {
  return as => filterNot_(as, f, __trace);
}
/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 */

export function filterNot_(as, f, __trace) {
  return filter_(as, x => map.map_(f(x), b => !b), __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 */

export function filterNotPar_(as, f, __trace) {
  return filterPar_(as, x => map.map_(f(x), b => !b), __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 *
 * @ets_data_first filterNotPar_
 */

export function filterNotPar(f, __trace) {
  return as => filterNotPar_(as, f, __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 */

export function filterNotParN_(as, n, f, __trace) {
  return filterParN_(as, n, x => map.map_(f(x), b => !b), __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 *
 * @ets_data_first filterNotParN_
 */

export function filterNotParN(n, f, __trace) {
  return as => filterNotParN_(as, n, f, __trace);
}
//# sourceMappingURL=filter.mjs.map