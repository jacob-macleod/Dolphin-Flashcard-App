"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;

var _core = /*#__PURE__*/require("../core.js");

/**
 * Build a chunk with an integer range with both min/max included
 */
function range(min, max) {
  let builder = (0, _core.empty)();

  for (let i = min; i <= max; i++) {
    builder = (0, _core.append_)(builder, i);
  }

  return builder;
}
//# sourceMappingURL=range.js.map