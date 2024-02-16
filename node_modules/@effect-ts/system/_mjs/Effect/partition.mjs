import { identity } from "../Function/index.mjs";
import * as I from "../Iterable/index.mjs";
import { either } from "./either.mjs";
import { forEach_, forEachPar_, forEachParN_ } from "./excl-forEach.mjs";
import { map_ } from "./map.mjs";
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in a separated fashion.
 *
 * @ets_data_first partition_
 */

export function partition(f, __trace) {
  return as => partition_(as, f, __trace);
}
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in a separated fashion.
 */

export function partition_(as, f, __trace) {
  return map_(forEach_(as, a => either(f(a)), __trace), I.partitionMap(identity));
}
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 *
 * @ets_data_first partitionPar_
 */

export function partitionPar(f, __trace) {
  return as => partitionPar_(as, f, __trace);
}
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 */

export function partitionPar_(as, f, __trace) {
  return map_(forEachPar_(as, a => either(f(a)), __trace), I.partitionMap(identity));
}
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 *
 * Unlike `partitionPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first partitionParN_
 */

export function partitionParN(n, f, __trace) {
  return as => partitionParN_(as, n, f, __trace);
}
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 *
 * Unlike `partitionPar`, this method will use at most up to `n` fibers.
 */

export function partitionParN_(as, n, f, __trace) {
  return map_(forEachParN_(as, n, a => either(f(a)), __trace), I.partitionMap(identity));
}
//# sourceMappingURL=partition.mjs.map