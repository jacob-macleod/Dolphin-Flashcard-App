"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectSome = collectSome;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _collect = /*#__PURE__*/require("./collect.js");

// ets_tracing: off

/**
 * Filters any 'None' values.
 */
function collectSome(self) {
  return (0, _collect.collect_)(self, _index.identity);
}
//# sourceMappingURL=collectSome.js.map