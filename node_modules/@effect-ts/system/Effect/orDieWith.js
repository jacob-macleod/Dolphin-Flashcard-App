"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orDieWith = orDieWith;
exports.orDieWith_ = orDieWith_;

var _core = /*#__PURE__*/require("./core.js");

var _die = /*#__PURE__*/require("./die.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

// ets_tracing: off

/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `unknown`.
 *
 * @ets_data_first orDieWith_
 */
function orDieWith(f, __trace) {
  return effect => orDieWith_(effect, f, __trace);
}
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `unknown`.
 */


function orDieWith_(effect, f, __trace) {
  return (0, _foldM.foldM_)(effect, e => (0, _die.die)(f(e)), _core.succeed, __trace);
}
//# sourceMappingURL=orDieWith.js.map