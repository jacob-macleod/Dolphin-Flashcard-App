"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bracketExit = bracketExit;
exports.bracketExit_ = bracketExit_;

var _cause = /*#__PURE__*/require("../Cause/cause.js");

var _api = /*#__PURE__*/require("../Exit/api.js");

var _core = /*#__PURE__*/require("./core.js");

var _done = /*#__PURE__*/require("./done.js");

var _interruption = /*#__PURE__*/require("./interruption.js");

// ets_tracing: off

/**
 * Acquires a resource, uses the resource, and then releases the resource.
 * Neither the acquisition nor the release will be interrupted, and the
 * resource is guaranteed to be released, so long as the `acquire` effect
 * succeeds. If `use` fails, then after release, the returned effect will fail
 * with the same error.
 *
 * @ets_data_first bracketExit_
 */
function bracketExit(use, release, __trace) {
  return acquire => bracketExit_(acquire, use, release, __trace);
}
/**
 * Acquires a resource, uses the resource, and then releases the resource.
 * Neither the acquisition nor the release will be interrupted, and the
 * resource is guaranteed to be released, so long as the `acquire` effect
 * succeeds. If `use` fails, then after release, the returned effect will fail
 * with the same error.
 */


function bracketExit_(acquire, use, release, __trace) {
  return (0, _interruption.uninterruptibleMask)(({
    restore
  }) => (0, _core.chain_)(acquire, a => (0, _core.chain_)((0, _core.result)((0, _core.suspend)(() => restore(use(a)))), e => (0, _core.foldCauseM_)((0, _core.suspend)(() => release(a, e)), cause2 => (0, _core.halt)((0, _api.fold_)(e, _ => (0, _cause.combineSeq)(_, cause2), _ => cause2)), _ => (0, _done.done)(e))), __trace));
}
//# sourceMappingURL=bracketExit.js.map