import { map_ } from "./map.mjs";
import { tuple, tuplePar, tupleParN } from "./tuple.mjs";
/**
 * Sequentially zips the specified effects using the specified combiner
 * function.
 *
 * @ets_data_first mapN_
 */

export function mapN(f, __trace) {
  return t => mapN_(t, f, __trace);
}
/**
 * Sequentially zips the specified effects using the specified combiner
 * function.
 */

export function mapN_(t, f, __trace) {
  // @ts-expect-error
  return map_(tuple(...t.tuple), x => f(...x.tuple), __trace);
}
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 *
 * @ets_data_first mapNPar_
 */

export function mapNPar(f, __trace) {
  return t => mapNPar_(t, f, __trace);
}
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 */

export function mapNPar_(t, f, __trace) {
  // @ts-expect-error
  return map_(tuplePar(...t.tuple), x => f(...x.tuple), __trace);
}
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 *
 * This variant uses up to N fibers.
 */

export function mapNParN(n, f, __trace) {
  return t => mapNParN_(t, n, f, __trace);
}
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 *
 * This variant uses up to N fibers.
 */

export function mapNParN_(t, n, f, __trace) {
  // @ts-expect-error
  return map_(tupleParN(n)(...t.tuple), x => f(...x.tuple), __trace);
}
//# sourceMappingURL=mapN.mjs.map