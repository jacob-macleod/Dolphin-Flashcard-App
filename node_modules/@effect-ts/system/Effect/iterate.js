"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterate = iterate;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Iterates with the specified effectual function. The moral equivalent of:
 *
 * ```
 * let s = initial
 *
 * while (cont(s)) {
 *   s = body(s)
 * }
 *
 * return s
 * ```
 */
function iterate(initial, cont) {
  return (body, __trace) => {
    return (0, _core.suspend)(() => {
      if (cont(initial)) {
        return (0, _core.chain_)(body(initial), z2 => iterate(z2, cont)(body));
      }

      return (0, _core.succeed)(initial);
    }, __trace);
  };
}
//# sourceMappingURL=iterate.js.map