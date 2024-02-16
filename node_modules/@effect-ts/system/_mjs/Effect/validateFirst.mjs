import { forEach_, forEachPar_, forEachParN_ } from "./excl-forEach.mjs";
import { flip } from "./flip.mjs";
/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 */

export function validateFirst_(i, f, __trace) {
  return flip(forEach_(i, a => flip(f(a)), __trace));
}
/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 *
 * @ets_data_first validateFirst_
 */

export function validateFirst(f, __trace) {
  return i => validateFirst_(i, f, __trace);
}
/**
 * Feeds elements of type `A` to `f`, in parallel, until it succeeds. Returns
 * first success or the accumulation of all errors.
 *
 * In case of success all other running fibers are terminated.
 */

export function validateFirstPar_(i, f, __trace) {
  return flip(forEachPar_(i, a => flip(f(a)), __trace));
}
/**
 * Feeds elements of type `A` to `f`, in parallel, until it succeeds. Returns
 * first success or the accumulation of all errors.
 *
 * In case of success all other running fibers are terminated.
 *
 * @ets_data_first validateFirstPar_
 */

export function validateFirstPar(f, __trace) {
  return i => validateFirstPar_(i, f, __trace);
}
/**
 * Feeds elements of type `A` to `f`, in parallel, until it succeeds. Returns
 * first success or the accumulation of all errors.
 *
 * In case of success all other running fibers are terminated.
 *
 * Uses up to N fibers.
 */

export function validateFirstParN_(i, n, f, __trace) {
  return flip(forEachParN_(i, n, a => flip(f(a)), __trace));
}
/**
 * Feeds elements of type `A` to `f`, in parallel, until it succeeds. Returns
 * first success or the accumulation of all errors.
 *
 * In case of success all other running fibers are terminated.
 *
 * Uses up to N fibers.
 *
 * @ets_data_first validateFirstParN_
 */

export function validateFirstParN(n, f, __trace) {
  return i => validateFirstParN_(i, n, f, __trace);
}
//# sourceMappingURL=validateFirst.mjs.map