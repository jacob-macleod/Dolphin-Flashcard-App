"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensuring = ensuring;
exports.ensuring_ = ensuring_;

var _cause = /*#__PURE__*/require("../Cause/cause.js");

var _core = /*#__PURE__*/require("./core.js");

var _interruption = /*#__PURE__*/require("./interruption.js");

// ets_tracing: off

/**
 * Returns an effect that, if this effect _starts_ execution, then the
 * specified `finalizer` is guaranteed to begin execution, whether this effect
 * succeeds, fails, or is interrupted.
 *
 * For use cases that need access to the effect's result, see onExit.
 *
 * Finalizers offer very powerful guarantees, but they are low-level, and
 * should generally not be used for releasing resources. For higher-level
 * logic built on `ensuring`, see `bracket`.
 *
 * @ets_data_first ensuring_
 */
function ensuring(finalizer, __trace) {
  return effect => ensuring_(effect, finalizer, __trace);
}
/**
 * Returns an effect that, if this effect _starts_ execution, then the
 * specified `finalizer` is guaranteed to begin execution, whether this effect
 * succeeds, fails, or is interrupted.
 *
 * For use cases that need access to the effect's result, see onExit.
 *
 * Finalizers offer very powerful guarantees, but they are low-level, and
 * should generally not be used for releasing resources. For higher-level
 * logic built on `ensuring`, see `bracket`.
 */


function ensuring_(effect, finalizer, __trace) {
  return (0, _interruption.uninterruptibleMask)(({
    restore
  }) => (0, _core.foldCauseM_)(restore(effect), cause1 => (0, _core.foldCauseM_)(finalizer, cause2 => (0, _core.halt)((0, _cause.combineSeq)(cause1, cause2)), _ => (0, _core.halt)(cause1)), value => (0, _core.foldCauseM_)(finalizer, cause1 => (0, _core.halt)(cause1), _ => (0, _core.succeed)(value)), __trace));
}
//# sourceMappingURL=ensuring.js.map