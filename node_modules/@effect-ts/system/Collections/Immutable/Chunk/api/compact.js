"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compact = compact;

var _collect = /*#__PURE__*/require("./collect.js");

/**
 * Filter out optional values
 */
function compact(fa) {
  return (0, _collect.collect_)(fa, x => x);
}
//# sourceMappingURL=compact.js.map