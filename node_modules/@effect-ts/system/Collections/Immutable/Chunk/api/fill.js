"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fill = fill;

var _core = /*#__PURE__*/require("../core.js");

/**
 * Fills a chunk with the result of applying `f` `n` times
 */
function fill(n, f) {
  if (n <= 0) {
    return (0, _core.empty)();
  }

  let builder = (0, _core.empty)();

  for (let i = 0; i < n; i++) {
    builder = (0, _core.append_)(builder, f(i));
  }

  return builder;
}
//# sourceMappingURL=fill.js.map