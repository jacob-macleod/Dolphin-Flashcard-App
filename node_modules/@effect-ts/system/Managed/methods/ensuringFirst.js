"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensuringFirst = ensuringFirst;
exports.ensuringFirst_ = ensuringFirst_;

var _core = /*#__PURE__*/require("../core.js");

/**
 * Ensures that `f` is executed when this `Managed` is finalized, before
 * the existing finalizer.
 *
 * For use cases that need access to the Managed's result, see `onExitFirst`.
 *
 * @ets_data_first ensuringFirst_
 */
function ensuringFirst(f, __trace) {
  return (0, _core.onExitFirst)(() => f, __trace);
}
/**
 * Ensures that `f` is executed when this `Managed` is finalized, before
 * the existing finalizer.
 *
 * For use cases that need access to the Managed's result, see `onExitFirst_`.
 */


function ensuringFirst_(self, f, __trace) {
  return (0, _core.onExitFirst_)(self, () => f, __trace);
}
//# sourceMappingURL=ensuringFirst.js.map