"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = apply;

var _AssertionM = /*#__PURE__*/require("./AssertionM.js");

function apply(render, runM) {
  return new class extends _AssertionM.AssertionM {}(render, runM);
}
//# sourceMappingURL=apply.js.map