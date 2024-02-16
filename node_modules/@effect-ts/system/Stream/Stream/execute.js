"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = execute;

var _drain = /*#__PURE__*/require("./drain.js");

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

/**
 * Creates a stream that executes the specified effect but emits no elements.
 */
function execute(effect) {
  return (0, _drain.drain)((0, _fromEffect.fromEffect)(effect));
}
//# sourceMappingURL=execute.js.map