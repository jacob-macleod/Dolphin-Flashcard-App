import { keepDefects } from "../Cause/core.mjs";
import * as Exit from "../Exit/core.mjs";
import { identity } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import { ICheckInterrupt, ICheckTracingStatus, IDescriptor, IEffectAsync, IEffectPartial, IEffectTotal, IFail, IFlatMap, IFold, IFork, IInterruptStatus, IPlatform, IProvide, IRead, ISucceed, ISupervise, ISuspend, ISuspendPartial, ITrace, ITracingStatus, IYield } from "./primitives.mjs";
/**
 * Effectfully accesses the environment of the effect.
 */

export function access(f, __trace) {
  return new IRead(_ => new ISucceed(f(_)), __trace);
}
/**
 * Effectfully accesses the environment of the effect.
 */

export function accessM(f, __trace) {
  return new IRead(f, __trace);
}
/**
 * Returns an effect that models the execution of this effect, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the effect that it returns.
 *
 * @ets_data_first chain_
 */

export function chain(f, __trace) {
  return val => new IFlatMap(val, f, __trace);
}
/**
 * Returns an effect that models the execution of this effect, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the effect that it returns.
 */

export function chain_(val, f, __trace) {
  return new IFlatMap(val, f, __trace);
}
/**
 * Constructs an effect based on information about the current fiber, such as
 * its identity.
 */

export function descriptorWith(f, __trace) {
  return new IDescriptor(f, __trace);
}
/**
 * Checks the interrupt status, and produces the effect returned by the
 * specified callback.
 */

export function checkInterruptible(f, __trace) {
  return new ICheckInterrupt(f, __trace);
}
/**
 * Capture trace at the current point
 */

export const trace = /*#__PURE__*/new ITrace();
/**
 * Checks the tracing status, and produces the effect returned by the
 * specified callback.
 */

export function checkTraced(f) {
  return new ICheckTracingStatus(f);
}
/**
 * Disables Effect tracing facilities for the duration of the effect.
 *
 * Note: Effect tracing is cached, as such after the first iteration
 * it has a negligible effect on performance of hot-spots (Additional
 * hash map lookup per flatMap). As such, using `untraced` sections
 * is not guaranteed to result in a noticeable performance increase.
 */

export function untraced(self) {
  return new ITracingStatus(self, false);
}
/**
 * Enables Effect tracing for this effect. Because this is the default, this
 * operation only has an additional meaning if the effect is located within
 * an `untraced` section, or the current fiber has been spawned by a parent
 * inside an `untraced` section.
 */

export function traced(self) {
  return new ITracingStatus(self, true);
}
/**
 * Imports an asynchronous effect into a pure `Effect` value, possibly returning
 * the value synchronously.
 *
 * If the register function returns a value synchronously, then the callback
 * function `AsyncRE<R, E, A> => void` must not be called. Otherwise the callback
 * function must be called at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */

export function effectAsyncOption(register, __trace) {
  return new IEffectAsync(register, [], __trace);
}
/**
 * Imports an asynchronous effect into a pure `Effect` value, possibly returning
 * the value synchronously.
 *
 * If the register function returns a value synchronously, then the callback
 * function `AsyncRE<R, E, A> => void` must not be called. Otherwise the callback
 * function must be called at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */

export function effectAsyncOptionBlockingOn(register, blockingOn, __trace) {
  return new IEffectAsync(register, blockingOn, __trace);
}
/**
 * Imports a synchronous side-effect into a pure value, translating any
 * thrown exceptions into typed failed effects creating with `halt`.
 */

export function tryCatch(effect, onThrow, __trace) {
  return new IEffectPartial(effect, onThrow, __trace);
}
/**
 * Imports a synchronous side-effect into a pure value, translating any
 * thrown exceptions into typed failed effects creating with `halt`.
 */

function try_(effect, __trace) {
  return new IEffectPartial(effect, identity, __trace);
}

export { try_ as try };
/**
 * Imports a synchronous side-effect into a pure value
 */

export function succeedWith(effect, __trace) {
  return new IEffectTotal(effect, __trace);
}
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCauseM_
 */

export function foldCauseM(failure, success, __trace) {
  return value => new IFold(value, failure, success, __trace);
}
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 */

export function foldCauseM_(value, failure, success, __trace) {
  return new IFold(value, failure, success, __trace);
}
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin
 * executing the effect.
 *
 * The returned fiber can be used to interrupt the forked fiber, await its
 * result, or join the fiber. See `Fiber` for more information.
 *
 * The fiber is forked with interrupt supervision mode, meaning that when the
 * fiber that forks the child exits, the child will be interrupted.
 */

export function fork(value, __trace) {
  return new IFork(value, O.none, O.none, __trace);
}
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin
 * executing the effect.
 *
 * The returned fiber can be used to interrupt the forked fiber, await its
 * result, or join the fiber. See `Fiber` for more information.
 *
 * The fiber is forked with interrupt supervision mode, meaning that when the
 * fiber that forks the child exits, the child will be interrupted.
 *
 * @ets_data_first forkReport_
 */

export function forkReport(reportFailure, __trace) {
  return value => new IFork(value, O.none, O.some(reportFailure), __trace);
}
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin
 * executing the effect.
 *
 * The returned fiber can be used to interrupt the forked fiber, await its
 * result, or join the fiber. See `Fiber` for more information.
 *
 * The fiber is forked with interrupt supervision mode, meaning that when the
 * fiber that forks the child exits, the child will be interrupted.
 */

export function forkReport_(value, reportFailure, __trace) {
  return new IFork(value, O.none, O.some(reportFailure), __trace);
}
/**
 * Returns an effect that models failure with the specified `Cause`.
 */

export function halt(cause, __trace) {
  return new IFail(() => cause, __trace);
}
/**
 * Returns an effect that models failure with the specified `Cause`.
 *
 * This version takes in a lazily-evaluated trace that can be attached to the `Cause`
 * via `Cause.Traced`.
 */

export function haltWith(cause, __trace) {
  return new IFail(cause, __trace);
}
/**
 * Switches the interrupt status for this effect. If `true` is used, then the
 * effect becomes interruptible (the default), while if `false` is used, then
 * the effect becomes uninterruptible. These changes are compositional, so
 * they only affect regions of the effect.
 *
 * @ets_data_first interruptStatus_
 */

export function interruptStatus(flag, __trace) {
  return effect => new IInterruptStatus(effect, flag, __trace);
}
/**
 * Switches the interrupt status for this effect. If `true` is used, then the
 * effect becomes interruptible (the default), while if `false` is used, then
 * the effect becomes uninterruptible. These changes are compositional, so
 * they only affect regions of the effect.
 */

export function interruptStatus_(effect, flag, __trace) {
  return new IInterruptStatus(effect, flag, __trace);
}
/**
 * Toggles Effect tracing support for this effect. If `true` is used, then the
 * effect will accumulate traces, while if `false` is used, then tracing
 * is disabled. These changes are compositional, so they only affect regions
 * of the effect.
 *
 * @ets_data_first tracingStatus_
 */

export function tracingStatus(flag) {
  return effect => new ITracingStatus(effect, flag);
}
/**
 * Toggles Effect tracing support for this effect. If `true` is used, then the
 * effect will accumulate traces, while if `false` is used, then tracing
 * is disabled. These changes are compositional, so they only affect regions
 * of the effect.
 */

export function tracingStatus_(effect, flag) {
  return new ITracingStatus(effect, flag);
}
/**
 * Provides the `Effect` effect with its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */

export function provideAll(r, __trace) {
  return next => new IProvide(r, next, __trace);
}
/**
 * Provides the `Effect` effect with its required environment, which eliminates
 * its dependency on `R`.
 */

export function provideAll_(next, r, __trace) {
  return new IProvide(r, next, __trace);
}
/**
 * Returns an effect that semantically runs the effect on a fiber,
 * producing an `Exit` for the completion value of the fiber.
 */

export function result(value, __trace) {
  return new IFold(value, cause => succeed(Exit.halt(cause)), succ => succeed(Exit.succeed(succ)), __trace);
}
/**
 * Lift a pure value into an effect
 */

export function succeed(a, __trace) {
  return new ISucceed(a, __trace);
}
/**
 * Returns an effect with the behavior of this one, but where all child
 * fibers forked in the effect are reported to the specified supervisor.
 *
 * @ets_data_first supervised_
 */

export function supervised(supervisor, __trace) {
  return fa => new ISupervise(fa, supervisor, __trace);
}
/**
 * Returns an effect with the behavior of this one, but where all child
 * fibers forked in the effect are reported to the specified supervisor.
 */

export function supervised_(fa, supervisor, __trace) {
  return new ISupervise(fa, supervisor, __trace);
}
/**
 * Returns a lazily constructed effect, whose construction may itself require effects.
 * When no environment is required (i.e., when R == unknown) it is conceptually equivalent to `flatten(succeedWith(io))`.
 */

export function suspend(factory, __trace) {
  return new ISuspend(factory, __trace);
}
/**
 * Returns a lazily constructed effect, whose construction may itself require effects.
 * When no environment is required (i.e., when R == unknown) it is conceptually equivalent to `flatten(tryCatch(orThrow, io))`.
 */

export function tryCatchSuspend(factory, onThrow, __trace) {
  return new ISuspendPartial(factory, onThrow, __trace);
}
/**
 * Executed `that` in case `self` fails with a `Cause` that doesn't contain defects,
 * executes `success` in case of successes
 */

export function tryOrElse_(self, that, success, __trace) {
  return new IFold(self, cause => O.fold_(keepDefects(cause), that, halt), success, __trace);
}
/**
 * Executed `that` in case `self` fails with a `Cause` that doesn't contain defects,
 * executes `success` in case of successes
 *
 * @ets_data_first tryOrElse_
 */

export function tryOrElse(that, success, __trace) {
  return self => tryOrElse_(self, that, success, __trace);
}
/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 */

export const unit = /*#__PURE__*/new ISucceed(undefined);
/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 */

export const unitTraced = __trace => new ISucceed(undefined, __trace);
/**
 * Returns an effect that yields to the runtime system, starting on a fresh
 * stack. Manual use of this method can improve fairness, at the cost of
 * overhead.
 */

export const yieldNow = /*#__PURE__*/new IYield();
/**
 * Checks the current platform
 */

export function checkPlatform(f, __trace) {
  return new IPlatform(f, __trace);
}
//# sourceMappingURL=core.mjs.map