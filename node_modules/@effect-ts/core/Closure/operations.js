"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeClosure = makeClosure;

var _index = /*#__PURE__*/require("../Prelude/index.js");

// ets_tracing: off
function makeClosure(f) {
  return {
    combine: f
  };
}
//# sourceMappingURL=operations.js.map