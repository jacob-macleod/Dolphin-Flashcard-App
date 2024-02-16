"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.absolve = absolve;

var _core = /*#__PURE__*/require("../core.js");

var _fromEither = /*#__PURE__*/require("./fromEither.js");

/**
 * Submerges the error case of an `Either` into the `Managed`. The inverse
 * operation of `Managed.either`.
 */
function absolve(self, __trace) {
  return (0, _core.chain_)(self, _fromEither.fromEither, __trace);
}
//# sourceMappingURL=absolve.js.map