"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chainError = chainError;
exports.chainError_ = chainError_;

var _core = /*#__PURE__*/require("./core.js");

var _flipWith = /*#__PURE__*/require("./flipWith.js");

// ets_tracing: off

/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @ets_data_first chainError_
 */
function chainError(f, __trace) {
  return self => chainError_(self, f, __trace);
}
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 */


function chainError_(self, f, __trace) {
  return (0, _flipWith.flipWith_)(self, x => (0, _core.chain_)(x, f, __trace));
}
//# sourceMappingURL=chainError.js.map