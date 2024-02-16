"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDone = isDone;

var _core = /*#__PURE__*/require("../Effect/core.js");

// ets_tracing: off

/**
 * Checks for completion of this Promise. Produces true if this promise has
 * already been completed with a value or an error and false otherwise.
 */
function isDone(promise) {
  return (0, _core.succeedWith)(() => promise.state.get._tag === "Done");
}
//# sourceMappingURL=isDone.js.map