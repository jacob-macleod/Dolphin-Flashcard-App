"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirst = getFirst;

var _index = /*#__PURE__*/require("../../Identity/index.js");

var _getFirstIdentity = /*#__PURE__*/require("./getFirstIdentity.js");

function getFirst(...items) {
  return (0, _index.fold)((0, _getFirstIdentity.getFirstIdentity)())(items);
}
//# sourceMappingURL=getFirst.js.map