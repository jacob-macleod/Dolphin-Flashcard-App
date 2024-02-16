"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sandboxWith = sandboxWith;
exports.sandboxWith_ = sandboxWith_;

var _sandbox = /*#__PURE__*/require("./sandbox.js");

var _unsandbox = /*#__PURE__*/require("./unsandbox.js");

/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 *
 * @ets_data_first sandboxWith_
 */
function sandboxWith(f, __trace) {
  return self => sandboxWith_(self, f, __trace);
}
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 */


function sandboxWith_(self, f, __trace) {
  return (0, _unsandbox.unsandbox)(f((0, _sandbox.sandbox)(self)), __trace);
}
//# sourceMappingURL=sandboxWith.js.map