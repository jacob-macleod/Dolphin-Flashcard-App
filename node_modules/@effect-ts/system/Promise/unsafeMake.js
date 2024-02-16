"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeMake = unsafeMake;

var _index = /*#__PURE__*/require("../Support/AtomicReference/index.js");

var _promise = /*#__PURE__*/require("./promise.js");

var _state = /*#__PURE__*/require("./state.js");

function unsafeMake(fiberId) {
  return new _promise.Promise(new _index.AtomicReference(new _state.Pending([])), [fiberId]);
}
//# sourceMappingURL=unsafeMake.js.map