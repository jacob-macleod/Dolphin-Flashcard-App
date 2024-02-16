"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCommutative = makeCommutative;

var _index = /*#__PURE__*/require("../Prelude/index.js");

// ets_tracing: off
function makeCommutative(f) {
  return {
    combine: f,
    commute: (x, y) => f(y, x)
  };
}
//# sourceMappingURL=operations.js.map