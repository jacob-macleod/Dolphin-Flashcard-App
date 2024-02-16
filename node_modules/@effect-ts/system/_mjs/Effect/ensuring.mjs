// ets_tracing: off
import { combineSeq } from "../Cause/cause.mjs";
import { foldCauseM_, halt, succeed } from "./core.mjs";
import { uninterruptibleMask } from "./interruption.mjs";
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

export function ensuring(finalizer, __trace) {
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

export function ensuring_(effect, finalizer, __trace) {
  return uninterruptibleMask(({
    restore
  }) => foldCauseM_(restore(effect), cause1 => foldCauseM_(finalizer, cause2 => halt(combineSeq(cause1, cause2)), _ => halt(cause1)), value => foldCauseM_(finalizer, cause1 => halt(cause1), _ => succeed(value)), __trace));
}
//# sourceMappingURL=ensuring.mjs.map