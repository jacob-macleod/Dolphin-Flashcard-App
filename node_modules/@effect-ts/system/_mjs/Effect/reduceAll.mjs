// ets_tracing: off
import * as A from "../Collections/Immutable/Array/index.mjs";
import * as NA from "../Collections/Immutable/NonEmptyArray/index.mjs";
import * as O from "../Option/index.mjs";
import { suspend } from "./core.mjs";
import { map_ } from "./map.mjs";
import { mergeAllPar_, mergeAllParN_ } from "./mergeAll.mjs";
import { zipWith_ } from "./zipWith.mjs";
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 */

export function reduceAll_(as, f, __trace) {
  return suspend(() => A.reduce_(NA.tail(as), NA.head(as), (acc, a) => zipWith_(acc, a, f)), __trace);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 *
 * @ets_data_first reduceAll_
 */

export function reduceAll(f, __trace) {
  return as => reduceAll_(as, f, __trace);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 */

export function reduceAllPar_(as, f, __trace) {
  return map_(mergeAllPar_(as, O.none, (acc, elem) => O.some(O.fold_(acc, () => elem, a => f(a, elem))), __trace), O.getOrElse(() => {
    throw new Error("Bug");
  }));
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 *
 * @ets_data_first reduceAllPar_
 */

export function reduceAllPar(f, __trace) {
  return as => reduceAllPar_(as, f, __trace);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 */

export function reduceAllParN_(as, n, f, __trace) {
  return map_(mergeAllParN_(as, n, O.none, (acc, elem) => O.some(O.fold_(acc, () => elem, a => f(a, elem))), __trace), O.getOrElse(() => {
    throw new Error("Bug");
  }));
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 *
 * @ets_data_first reduceAllParN_
 */

export function reduceAllParN(n, f, __trace) {
  return as => reduceAllParN_(as, n, f, __trace);
}
//# sourceMappingURL=reduceAll.mjs.map