"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.absolve = absolve;

var _core = /*#__PURE__*/require("./core.js");

var _fromEither = /*#__PURE__*/require("./fromEither.js");

/**
 * Returns an effect that submerges the error case of an `Either` into the
 * `Effect`.
 */
function absolve(v, __trace) {
  return (0, _core.chain_)(v, e => (0, _fromEither.fromEither)(() => e), __trace);
}
//# sourceMappingURL=absolve.js.map