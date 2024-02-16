"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFirst = validateFirst;
exports.validateFirstPar = validateFirstPar;
exports.validateFirstParN = validateFirstParN;
exports.validateFirstParN_ = validateFirstParN_;
exports.validateFirstPar_ = validateFirstPar_;
exports.validateFirst_ = validateFirst_;

var _exclForEach = /*#__PURE__*/require("./excl-forEach.js");

var _flip = /*#__PURE__*/require("./flip.js");

/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 */
function validateFirst_(i, f, __trace) {
  return (0, _flip.flip)((0, _exclForEach.forEach_)(i, a => (0, _flip.flip)(f(a)), __trace));
}
/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 *
 * @ets_data_first validateFirst_
 */


function validateFirst(f, __trace) {
  return i => validateFirst_(i, f, __trace);
}
/**
 * Feeds elements of type `A` to `f`, in parallel, until it succeeds. Returns
 * first success or the accumulation of all errors.
 *
 * In case of success all other running fibers are terminated.
 */


function validateFirstPar_(i, f, __trace) {
  return (0, _flip.flip)((0, _exclForEach.forEachPar_)(i, a => (0, _flip.flip)(f(a)), __trace));
}
/**
 * Feeds elements of type `A` to `f`, in parallel, until it succeeds. Returns
 * first success or the accumulation of all errors.
 *
 * In case of success all other running fibers are terminated.
 *
 * @ets_data_first validateFirstPar_
 */


function validateFirstPar(f, __trace) {
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


function validateFirstParN_(i, n, f, __trace) {
  return (0, _flip.flip)((0, _exclForEach.forEachParN_)(i, n, a => (0, _flip.flip)(f(a)), __trace));
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


function validateFirstParN(n, f, __trace) {
  return i => validateFirstParN_(i, n, f, __trace);
}
//# sourceMappingURL=validateFirst.js.map