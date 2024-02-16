// ets_tracing: off
import { failureOrCause } from "../Cause/core.mjs";
import * as E from "../Either/index.mjs";
import { foldCauseM_, halt } from "./core.mjs";
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 *
 * This method has better performance than `either` since no intermediate
 * value is allocated and does not require subsequent calls to `flatMap` to
 * define the next effect.
 *
 * The error parameter of the returned `IO` may be chosen arbitrarily, since
 * it will depend on the `IO`s returned by the given continuations.
 */

export function foldM_(value, failure, success, __trace) {
  return foldCauseM_(value, cause => E.fold_(failureOrCause(cause), failure, halt), success, __trace);
}
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 *
 * This method has better performance than `either` since no intermediate
 * value is allocated and does not require subsequent calls to `flatMap` to
 * define the next effect.
 *
 * The error parameter of the returned `IO` may be chosen arbitrarily, since
 * it will depend on the `IO`s returned by the given continuations.
 *
 * @ets_data_first foldM_
 */

export function foldM(failure, success, __trace) {
  return value => foldM_(value, failure, success, __trace);
}
//# sourceMappingURL=foldM.mjs.map