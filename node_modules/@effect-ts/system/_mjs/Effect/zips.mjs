// ets_tracing: off
import { as_ } from "./as.mjs";
import { chain_ } from "./core.mjs";
import { zipWithPar_ } from "./zipWithPar.mjs";
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 */

export function zipLeft_(a, b, __trace) {
  return chain_(a, r => as_(b, r));
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeft_
 */

export function zipLeft(b, __trace) {
  return a => zipLeft_(a, b, __trace);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 */

export function zipLeftPar_(a, b, __trace) {
  return zipWithPar_(a, b, a => a, __trace);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeftPar_
 */

export function zipLeftPar(b, __trace) {
  return a => zipLeftPar_(a, b, __trace);
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 */

export function zipRight_(a, b, __trace) {
  return chain_(a, () => b, __trace);
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRight_
 */

export function zipRight(b, __trace) {
  return a => zipRight_(a, b, __trace);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 */

export function zipRightPar_(a, b, __trace) {
  return zipWithPar_(a, b, (_, a) => a, __trace);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRightPar_
 */

export function zipRightPar(b, __trace) {
  return a => zipRightPar_(a, b, __trace);
}
//# sourceMappingURL=zips.mjs.map