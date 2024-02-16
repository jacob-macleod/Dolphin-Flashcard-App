"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.succeedF = succeedF;

var _index = /*#__PURE__*/require("../../Function/index.js");

// ets_tracing: off
function succeedF(F) {
  return a => F.map((0, _index.constant)(a))(F.any());
}
//# sourceMappingURL=succeed.js.map