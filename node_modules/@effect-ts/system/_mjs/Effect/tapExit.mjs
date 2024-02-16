// ets_tracing: off
import { failureOrCause } from "../Cause/index.mjs";
import * as E from "../Either/index.mjs";
import * as Ex from "../Exit/index.mjs";
import { chain_, foldCauseM_, halt, succeed } from "./core.mjs";
/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Exit`.
 */

export function tapExit_(self, f, __trace) {
  return foldCauseM_(self, c => E.fold_(failureOrCause(c), e => chain_(f(Ex.fail(e)), _ => halt(c)), c => halt(c)), a => chain_(f(Ex.succeed(a)), _ => succeed(a)), __trace);
}
/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Exit`.
 *
 * @ets_data_first tapExit_
 */

export function tapExit(f, __trace) {
  return self => tapExit_(self, f, __trace);
}
//# sourceMappingURL=tapExit.mjs.map