"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chainF = chainF;

var _index = /*#__PURE__*/require("../../Function/index.js");

// ets_tracing: off
function chainF(F) {
  return f => x => F.flatten(F.map(f)(x));
}
//# sourceMappingURL=chain.js.map