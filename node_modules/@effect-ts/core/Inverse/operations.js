"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeInverse = makeInverse;

var _index = /*#__PURE__*/require("../Prelude/index.js");

// ets_tracing: off
function makeInverse(identity, combine, inverse) {
  return {
    combine,
    identity,
    inverse
  };
}
//# sourceMappingURL=operations.js.map