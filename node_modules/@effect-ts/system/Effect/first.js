"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.first = first;

var _core = /*#__PURE__*/require("./core.js");

/**
 * Returns an effectful function that extracts out the first element of a
 * tuple.
 */
function first(__trace) {
  return (0, _core.access)(_ => _.get(0), __trace);
}
//# sourceMappingURL=first.js.map