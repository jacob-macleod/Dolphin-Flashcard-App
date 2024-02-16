"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orElse = orElse;
exports.orElse_ = orElse_;

var _catchAll = /*#__PURE__*/require("./catchAll.js");

// ets_tracing: off

/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
function orElse_(self, that) {
  return (0, _catchAll.catchAll_)(self, _ => that);
}
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */


function orElse(that) {
  return self => orElse_(self, that);
}
//# sourceMappingURL=orElse.js.map