// ets_tracing: off
import { done } from "../Promise/done.mjs";
import { chain_, result } from "./core.mjs";
import { uninterruptibleMask } from "./interruption.mjs";
/**
 * Returns an effect that keeps or breaks a promise based on the result of
 * this effect. Synchronizes interruption, so if this effect is interrupted,
 * the specified promise will be interrupted, too.
 *
 * @ets_data_first to_
 */

export function to(p, __trace) {
  return effect => to_(effect, p, __trace);
}
/**
 * Returns an effect that keeps or breaks a promise based on the result of
 * this effect. Synchronizes interruption, so if this effect is interrupted,
 * the specified promise will be interrupted, too.
 */

export function to_(effect, p, __trace) {
  return uninterruptibleMask(({
    restore
  }) => chain_(result(restore(effect)), x => done(x)(p)), __trace);
}
//# sourceMappingURL=to.mjs.map