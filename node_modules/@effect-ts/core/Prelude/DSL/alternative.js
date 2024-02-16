"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orElseF = orElseF;

var _index = /*#__PURE__*/require("../../Function/index.js");

// ets_tracing: off
function orElseF(F) {
  return fb => fa => F.map(e => e._tag === "Left" ? e.left : e.right)(F.orElseEither(fb)(fa));
}
//# sourceMappingURL=alternative.js.map