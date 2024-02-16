// ets_tracing: off
import { combineSeq } from "../Cause/cause.mjs";
import { fold_ } from "../Exit/api.mjs";
import { chain_, foldCauseM_, halt, result, suspend } from "./core.mjs";
import { done } from "./done.mjs";
import { uninterruptibleMask } from "./interruption.mjs";
/**
 * Acquires a resource, uses the resource, and then releases the resource.
 * Neither the acquisition nor the release will be interrupted, and the
 * resource is guaranteed to be released, so long as the `acquire` effect
 * succeeds. If `use` fails, then after release, the returned effect will fail
 * with the same error.
 *
 * @ets_data_first bracketExit_
 */

export function bracketExit(use, release, __trace) {
  return acquire => bracketExit_(acquire, use, release, __trace);
}
/**
 * Acquires a resource, uses the resource, and then releases the resource.
 * Neither the acquisition nor the release will be interrupted, and the
 * resource is guaranteed to be released, so long as the `acquire` effect
 * succeeds. If `use` fails, then after release, the returned effect will fail
 * with the same error.
 */

export function bracketExit_(acquire, use, release, __trace) {
  return uninterruptibleMask(({
    restore
  }) => chain_(acquire, a => chain_(result(suspend(() => restore(use(a)))), e => foldCauseM_(suspend(() => release(a, e)), cause2 => halt(fold_(e, _ => combineSeq(_, cause2), _ => cause2)), _ => done(e))), __trace));
}
//# sourceMappingURL=bracketExit.mjs.map