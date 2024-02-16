// ets_tracing: off
import { failureOrCause } from "../Cause/index.mjs";
import { fold } from "../Either/index.mjs";
import { pipe } from "../Function/index.mjs";
import { fork, halt } from "./core.mjs";
import { onError_ } from "./onExit.mjs";
/**
 * Like fork but handles an error with the provided handler.
 *
 * @ets_data_first forkWithErrorHandler_
 */

export function forkWithErrorHandler(handler, __trace) {
  return self => forkWithErrorHandler_(self, handler, __trace);
}
/**
 * Like fork but handles an error with the provided handler.
 */

export function forkWithErrorHandler_(self, handler, __trace) {
  return fork(onError_(self, x => fold(handler, halt)(failureOrCause(x))), __trace);
}
//# sourceMappingURL=forkWithErrorHandler.mjs.map