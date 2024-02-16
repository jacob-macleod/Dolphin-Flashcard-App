"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLast = getLast;

var _index = /*#__PURE__*/require("../../Identity/index.js");

var _getLastIdentity = /*#__PURE__*/require("./getLastIdentity.js");

function getLast(...items) {
  return (0, _index.fold)((0, _getLastIdentity.getLastIdentity)())(items);
}
//# sourceMappingURL=getLast.js.map