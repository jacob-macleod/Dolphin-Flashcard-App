// ets_tracing: off
import * as E from "../Either/index.mjs";
import { effectMaybeAsyncInterruptBlockingOn } from "./effectMaybeAsyncInterrupt.mjs";
/**
 * Imports an asynchronous side-effect into an effect. The effect also
 * returns a canceler, which will be used by the runtime to cancel the
 * asynchronous effect if the fiber executing the effect is interrupted.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */

export function effectAsyncInterrupt(register, __trace) {
  return effectAsyncInterruptBlockingOn(register, [], __trace);
}
/**
 * Imports an asynchronous side-effect into an effect. The effect also
 * returns a canceler, which will be used by the runtime to cancel the
 * asynchronous effect if the fiber executing the effect is interrupted.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */

export function effectAsyncInterruptBlockingOn(register, blockingOn, __trace) {
  return effectMaybeAsyncInterruptBlockingOn(cb => E.left(register(cb)), blockingOn, __trace);
}
//# sourceMappingURL=effectAsyncInterrupt.mjs.map