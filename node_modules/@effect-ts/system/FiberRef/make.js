"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = make;
exports.unsafeMake = unsafeMake;

var _primitives = /*#__PURE__*/require("../Effect/primitives.js");

var _index = /*#__PURE__*/require("../Function/index.js");

var _fiberRef = /*#__PURE__*/require("./fiberRef.js");

/**
 * Creates a new `FiberRef` with given initial value.
 */
function make(initial, onFork = _index.identity, onJoin = (_, a) => a) {
  return new _primitives.IFiberRefNew(initial, onFork, onJoin);
}
/**
 * Creates a new `FiberRef` with given initial value.
 */


function unsafeMake(initial, onFork = _index.identity, onJoin = (_, a) => a) {
  return new _fiberRef.Runtime(initial, onFork, onJoin);
}
//# sourceMappingURL=make.js.map