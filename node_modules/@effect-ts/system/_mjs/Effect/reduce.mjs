// ets_tracing: off
import * as I from "../Iterable/index.mjs";
import { chain_, succeed, suspend } from "./core.mjs";
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */

export function reduce_(i, zero, f, __trace) {
  return suspend(() => I.reduce_(i, succeed(zero), (acc, el) => chain_(acc, a => f(a, el))), __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduce_
 */

export function reduce(zero, f, __trace) {
  return i => reduce_(i, zero, f, __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */

export function reduceRight_(i, zero, f, __trace) {
  return suspend(() => I.reduceRight_(i, succeed(zero), (el, acc) => chain_(acc, a => f(el, a))), __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduceRight_
 */

export function reduceRight(zero, f, __trace) {
  return i => reduceRight_(i, zero, f, __trace);
}
//# sourceMappingURL=reduce.mjs.map