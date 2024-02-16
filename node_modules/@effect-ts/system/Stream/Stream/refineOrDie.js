"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refineOrDie = refineOrDie;
exports.refineOrDie_ = refineOrDie_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _refineOrDieWith = /*#__PURE__*/require("./refineOrDieWith.js");

// ets_tracing: off

/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */
function refineOrDie_(self, pf) {
  return (0, _refineOrDieWith.refineOrDieWith)(pf)(_index.identity)(self);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */


function refineOrDie(pf) {
  return self => refineOrDie_(self, pf);
}
//# sourceMappingURL=refineOrDie.js.map