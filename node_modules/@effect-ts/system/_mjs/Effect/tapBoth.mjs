// ets_tracing: off
import { failureOrCause } from "../Cause/index.mjs";
import * as E from "../Either/index.mjs";
import { chain_, foldCauseM_, halt } from "./core.mjs";
import { map_ } from "./map.mjs";
/**
 * Returns an effect that effectfully "peeks" at the failure or success of
 * this effect.
 *
 * @ets_data_first tapBoth_
 */

export function tapBoth(f, g, __trace) {
  return self => tapBoth_(self, f, g, __trace);
}
/**
 * Returns an effect that effectfully "peeks" at the failure or success of
 * this effect.
 */

export function tapBoth_(self, f, g, __trace) {
  return foldCauseM_(self, c => E.fold_(failureOrCause(c), e => chain_(f(e), () => halt(c)), _ => halt(c)), a => map_(g(a), () => a), __trace);
}
//# sourceMappingURL=tapBoth.mjs.map