"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = flatten;

var _index = /*#__PURE__*/require("../Function/index.js");

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Returns an effect that first executes the outer effect, and then executes
 * the inner effect, returning the value from the inner effect, and effectively
 * flattening a nested effect.
 */
function flatten(effect, __trace) {
  return (0, _core.chain_)(effect, _index.identity, __trace);
}
//# sourceMappingURL=flatten.js.map