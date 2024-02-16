"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsandbox = unsandbox;

var _index = /*#__PURE__*/require("../Cause/index.js");

var _mapErrorCause = /*#__PURE__*/require("./mapErrorCause.js");

/**
 * The inverse operation `sandbox(effect)`
 *
 * Terminates with exceptions on the `Left` side of the `Either` error, if it
 * exists. Otherwise extracts the contained `Effect< R, E, A>`
 */
function unsandbox(fa, __trace) {
  return (0, _mapErrorCause.mapErrorCause_)(fa, _index.flatten, __trace);
}
//# sourceMappingURL=unsandbox.js.map