"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.access = access;
exports.accessM = accessM;
exports.chain = chain;
exports.chain_ = chain_;
exports.checkInterruptible = checkInterruptible;
exports.checkPlatform = checkPlatform;
exports.checkTraced = checkTraced;
exports.descriptorWith = descriptorWith;
exports.effectAsyncOption = effectAsyncOption;
exports.effectAsyncOptionBlockingOn = effectAsyncOptionBlockingOn;
exports.foldCauseM = foldCauseM;
exports.foldCauseM_ = foldCauseM_;
exports.fork = fork;
exports.forkReport = forkReport;
exports.forkReport_ = forkReport_;
exports.halt = halt;
exports.haltWith = haltWith;
exports.interruptStatus = interruptStatus;
exports.interruptStatus_ = interruptStatus_;
exports.provideAll = provideAll;
exports.provideAll_ = provideAll_;
exports.result = result;
exports.succeed = succeed;
exports.succeedWith = succeedWith;
exports.supervised = supervised;
exports.supervised_ = supervised_;
exports.suspend = suspend;
exports.trace = void 0;
exports.traced = traced;
exports.tracingStatus = tracingStatus;
exports.tracingStatus_ = tracingStatus_;
exports.try = try_;
exports.tryCatch = tryCatch;
exports.tryCatchSuspend = tryCatchSuspend;
exports.tryOrElse = tryOrElse;
exports.tryOrElse_ = tryOrElse_;
exports.unitTraced = exports.unit = void 0;
exports.untraced = untraced;
exports.yieldNow = void 0;

var _core = /*#__PURE__*/require("../Cause/core.js");

var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Exit/core.js"));

var _index = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _primitives = /*#__PURE__*/require("./primitives.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Effectfully accesses the environment of the effect.
 */
function access(f, __trace) {
  return new _primitives.IRead(_ => new _primitives.ISucceed(f(_)), __trace);
}
/**
 * Effectfully accesses the environment of the effect.
 */


function accessM(f, __trace) {
  return new _primitives.IRead(f, __trace);
}
/**
 * Returns an effect that models the execution of this effect, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the effect that it returns.
 *
 * @ets_data_first chain_
 */


function chain(f, __trace) {
  return val => new _primitives.IFlatMap(val, f, __trace);
}
/**
 * Returns an effect that models the execution of this effect, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the effect that it returns.
 */


function chain_(val, f, __trace) {
  return new _primitives.IFlatMap(val, f, __trace);
}
/**
 * Constructs an effect based on information about the current fiber, such as
 * its identity.
 */


function descriptorWith(f, __trace) {
  return new _primitives.IDescriptor(f, __trace);
}
/**
 * Checks the interrupt status, and produces the effect returned by the
 * specified callback.
 */


function checkInterruptible(f, __trace) {
  return new _primitives.ICheckInterrupt(f, __trace);
}
/**
 * Capture trace at the current point
 */


const trace = /*#__PURE__*/new _primitives.ITrace();
/**
 * Checks the tracing status, and produces the effect returned by the
 * specified callback.
 */

exports.trace = trace;

function checkTraced(f) {
  return new _primitives.ICheckTracingStatus(f);
}
/**
 * Disables Effect tracing facilities for the duration of the effect.
 *
 * Note: Effect tracing is cached, as such after the first iteration
 * it has a negligible effect on performance of hot-spots (Additional
 * hash map lookup per flatMap). As such, using `untraced` sections
 * is not guaranteed to result in a noticeable performance increase.
 */


function untraced(self) {
  return new _primitives.ITracingStatus(self, false);
}
/**
 * Enables Effect tracing for this effect. Because this is the default, this
 * operation only has an additional meaning if the effect is located within
 * an `untraced` section, or the current fiber has been spawned by a parent
 * inside an `untraced` section.
 */


function traced(self) {
  return new _primitives.ITracingStatus(self, true);
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


function effectAsyncOption(register, __trace) {
  return new _primitives.IEffectAsync(register, [], __trace);
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


function effectAsyncOptionBlockingOn(register, blockingOn, __trace) {
  return new _primitives.IEffectAsync(register, blockingOn, __trace);
}
/**
 * Imports a synchronous side-effect into a pure value, translating any
 * thrown exceptions into typed failed effects creating with `halt`.
 */


function tryCatch(effect, onThrow, __trace) {
  return new _primitives.IEffectPartial(effect, onThrow, __trace);
}
/**
 * Imports a synchronous side-effect into a pure value, translating any
 * thrown exceptions into typed failed effects creating with `halt`.
 */


function try_(effect, __trace) {
  return new _primitives.IEffectPartial(effect, _index.identity, __trace);
}

/**
 * Imports a synchronous side-effect into a pure value
 */
function succeedWith(effect, __trace) {
  return new _primitives.IEffectTotal(effect, __trace);
}
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCauseM_
 */


function foldCauseM(failure, success, __trace) {
  return value => new _primitives.IFold(value, failure, success, __trace);
}
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 */


function foldCauseM_(value, failure, success, __trace) {
  return new _primitives.IFold(value, failure, success, __trace);
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


function fork(value, __trace) {
  return new _primitives.IFork(value, O.none, O.none, __trace);
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


function forkReport(reportFailure, __trace) {
  return value => new _primitives.IFork(value, O.none, O.some(reportFailure), __trace);
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


function forkReport_(value, reportFailure, __trace) {
  return new _primitives.IFork(value, O.none, O.some(reportFailure), __trace);
}
/**
 * Returns an effect that models failure with the specified `Cause`.
 */


function halt(cause, __trace) {
  return new _primitives.IFail(() => cause, __trace);
}
/**
 * Returns an effect that models failure with the specified `Cause`.
 *
 * This version takes in a lazily-evaluated trace that can be attached to the `Cause`
 * via `Cause.Traced`.
 */


function haltWith(cause, __trace) {
  return new _primitives.IFail(cause, __trace);
}
/**
 * Switches the interrupt status for this effect. If `true` is used, then the
 * effect becomes interruptible (the default), while if `false` is used, then
 * the effect becomes uninterruptible. These changes are compositional, so
 * they only affect regions of the effect.
 *
 * @ets_data_first interruptStatus_
 */


function interruptStatus(flag, __trace) {
  return effect => new _primitives.IInterruptStatus(effect, flag, __trace);
}
/**
 * Switches the interrupt status for this effect. If `true` is used, then the
 * effect becomes interruptible (the default), while if `false` is used, then
 * the effect becomes uninterruptible. These changes are compositional, so
 * they only affect regions of the effect.
 */


function interruptStatus_(effect, flag, __trace) {
  return new _primitives.IInterruptStatus(effect, flag, __trace);
}
/**
 * Toggles Effect tracing support for this effect. If `true` is used, then the
 * effect will accumulate traces, while if `false` is used, then tracing
 * is disabled. These changes are compositional, so they only affect regions
 * of the effect.
 *
 * @ets_data_first tracingStatus_
 */


function tracingStatus(flag) {
  return effect => new _primitives.ITracingStatus(effect, flag);
}
/**
 * Toggles Effect tracing support for this effect. If `true` is used, then the
 * effect will accumulate traces, while if `false` is used, then tracing
 * is disabled. These changes are compositional, so they only affect regions
 * of the effect.
 */


function tracingStatus_(effect, flag) {
  return new _primitives.ITracingStatus(effect, flag);
}
/**
 * Provides the `Effect` effect with its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */


function provideAll(r, __trace) {
  return next => new _primitives.IProvide(r, next, __trace);
}
/**
 * Provides the `Effect` effect with its required environment, which eliminates
 * its dependency on `R`.
 */


function provideAll_(next, r, __trace) {
  return new _primitives.IProvide(r, next, __trace);
}
/**
 * Returns an effect that semantically runs the effect on a fiber,
 * producing an `Exit` for the completion value of the fiber.
 */


function result(value, __trace) {
  return new _primitives.IFold(value, cause => succeed(Exit.halt(cause)), succ => succeed(Exit.succeed(succ)), __trace);
}
/**
 * Lift a pure value into an effect
 */


function succeed(a, __trace) {
  return new _primitives.ISucceed(a, __trace);
}
/**
 * Returns an effect with the behavior of this one, but where all child
 * fibers forked in the effect are reported to the specified supervisor.
 *
 * @ets_data_first supervised_
 */


function supervised(supervisor, __trace) {
  return fa => new _primitives.ISupervise(fa, supervisor, __trace);
}
/**
 * Returns an effect with the behavior of this one, but where all child
 * fibers forked in the effect are reported to the specified supervisor.
 */


function supervised_(fa, supervisor, __trace) {
  return new _primitives.ISupervise(fa, supervisor, __trace);
}
/**
 * Returns a lazily constructed effect, whose construction may itself require effects.
 * When no environment is required (i.e., when R == unknown) it is conceptually equivalent to `flatten(succeedWith(io))`.
 */


function suspend(factory, __trace) {
  return new _primitives.ISuspend(factory, __trace);
}
/**
 * Returns a lazily constructed effect, whose construction may itself require effects.
 * When no environment is required (i.e., when R == unknown) it is conceptually equivalent to `flatten(tryCatch(orThrow, io))`.
 */


function tryCatchSuspend(factory, onThrow, __trace) {
  return new _primitives.ISuspendPartial(factory, onThrow, __trace);
}
/**
 * Executed `that` in case `self` fails with a `Cause` that doesn't contain defects,
 * executes `success` in case of successes
 */


function tryOrElse_(self, that, success, __trace) {
  return new _primitives.IFold(self, cause => O.fold_((0, _core.keepDefects)(cause), that, halt), success, __trace);
}
/**
 * Executed `that` in case `self` fails with a `Cause` that doesn't contain defects,
 * executes `success` in case of successes
 *
 * @ets_data_first tryOrElse_
 */


function tryOrElse(that, success, __trace) {
  return self => tryOrElse_(self, that, success, __trace);
}
/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 */


const unit = /*#__PURE__*/new _primitives.ISucceed(undefined);
/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 */

exports.unit = unit;

const unitTraced = __trace => new _primitives.ISucceed(undefined, __trace);
/**
 * Returns an effect that yields to the runtime system, starting on a fresh
 * stack. Manual use of this method can improve fairness, at the cost of
 * overhead.
 */


exports.unitTraced = unitTraced;
const yieldNow = /*#__PURE__*/new _primitives.IYield();
/**
 * Checks the current platform
 */

exports.yieldNow = yieldNow;

function checkPlatform(f, __trace) {
  return new _primitives.IPlatform(f, __trace);
}
//# sourceMappingURL=core.js.map