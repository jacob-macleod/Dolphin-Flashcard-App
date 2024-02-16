"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ignore = ignore;

var _index = /*#__PURE__*/require("../Function/index.js");

var _fold = /*#__PURE__*/require("./fold.js");

// ets_tracing: off

/**
 * Returns a new effect that ignores the success or failure of this effect.
 */
function ignore(self, __trace) {
  return (0, _fold.fold_)(self, _index.constVoid, _index.constVoid, __trace);
}
//# sourceMappingURL=ignore.js.map