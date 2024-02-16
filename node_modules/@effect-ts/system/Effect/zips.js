"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipLeft = zipLeft;
exports.zipLeftPar = zipLeftPar;
exports.zipLeftPar_ = zipLeftPar_;
exports.zipLeft_ = zipLeft_;
exports.zipRight = zipRight;
exports.zipRightPar = zipRightPar;
exports.zipRightPar_ = zipRightPar_;
exports.zipRight_ = zipRight_;

var _as = /*#__PURE__*/require("./as.js");

var _core = /*#__PURE__*/require("./core.js");

var _zipWithPar = /*#__PURE__*/require("./zipWithPar.js");

// ets_tracing: off

/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 */
function zipLeft_(a, b, __trace) {
  return (0, _core.chain_)(a, r => (0, _as.as_)(b, r));
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeft_
 */


function zipLeft(b, __trace) {
  return a => zipLeft_(a, b, __trace);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 */


function zipLeftPar_(a, b, __trace) {
  return (0, _zipWithPar.zipWithPar_)(a, b, a => a, __trace);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeftPar_
 */


function zipLeftPar(b, __trace) {
  return a => zipLeftPar_(a, b, __trace);
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 */


function zipRight_(a, b, __trace) {
  return (0, _core.chain_)(a, () => b, __trace);
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRight_
 */


function zipRight(b, __trace) {
  return a => zipRight_(a, b, __trace);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 */


function zipRightPar_(a, b, __trace) {
  return (0, _zipWithPar.zipWithPar_)(a, b, (_, a) => a, __trace);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRightPar_
 */


function zipRightPar(b, __trace) {
  return a => zipRightPar_(a, b, __trace);
}
//# sourceMappingURL=zips.js.map