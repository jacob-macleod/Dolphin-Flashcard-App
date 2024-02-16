"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.absorb = absorb;
exports.absorb_ = absorb_;
exports.access = access;
exports.accessM = accessM;
exports.accessManaged = accessManaged;
exports.accessService = accessService;
exports.accessServiceM = accessServiceM;
exports.accessServices = accessServices;
exports.accessServicesM = accessServicesM;
exports.accessServicesT = accessServicesT;
exports.accessServicesTM = accessServicesTM;
exports.andThen = andThen;
exports.andThen_ = andThen_;
exports.as = as;
exports.asService = asService;
exports.asService_ = asService_;
exports.asSome = asSome;
exports.asSomeError = asSomeError;
exports.asUnit = asUnit;
exports.as_ = as_;
exports.bimap = bimap;
exports.bimap_ = bimap_;
exports.catchAll = catchAll;
exports.catchAllCause = catchAllCause;
exports.catchAllCause_ = catchAllCause_;
exports.catchAll_ = catchAll_;
exports.catchSome = catchSome;
exports.catchSomeCause = catchSomeCause;
exports.catchSomeCause_ = catchSomeCause_;
exports.catchSome_ = catchSome_;
exports.chainError = chainError;
exports.chainError_ = chainError_;
exports.collect = collect;
exports.collectAll = collectAll;
exports.collectAllPar = collectAllPar;
exports.collectAllParN = collectAllParN;
exports.collectAllParN_ = collectAllParN_;
exports.collectAllSuccesses = collectAllSuccesses;
exports.collectAllSuccessesPar = collectAllSuccessesPar;
exports.collectAllSuccessesParN = collectAllSuccessesParN;
exports.collectAllSuccessesParN_ = collectAllSuccessesParN_;
exports.collectAllUnit = collectAllUnit;
exports.collectAllUnitPar = collectAllUnitPar;
exports.collectAllUnitParN = collectAllUnitParN;
exports.collectAllUnitParN_ = collectAllUnitParN_;
exports.collectAllWith = collectAllWith;
exports.collectAllWithPar = collectAllWithPar;
exports.collectAllWithParN = collectAllWithParN;
exports.collectAllWithParN_ = collectAllWithParN_;
exports.collectAllWithPar_ = collectAllWithPar_;
exports.collectAllWith_ = collectAllWith_;
exports.collectPar = collectPar;
exports.collectParN = collectParN;
exports.collectParN_ = collectParN_;
exports.collectPar_ = collectPar_;
exports.collect_ = collect_;
exports.compose = compose;
exports.compose_ = compose_;
exports.cond = cond;
exports.cond_ = cond_;
exports.continueOrFail = continueOrFail;
exports.continueOrFailM = continueOrFailM;
exports.continueOrFailM_ = continueOrFailM_;
exports.continueOrFail_ = continueOrFail_;
exports.create = create;
exports.die = die;
exports.dieMessage = dieMessage;
exports.dieWith = dieWith;
exports.either = either;
exports.eventually = eventually;
exports.exposeTracer = exposeTracer;
exports.fiberId = void 0;
exports.finalizer = finalizer;
exports.finalizerExit = finalizerExit;
exports.first = first;
exports.flatten = flatten;
exports.flattenM = flattenM;
exports.flip = flip;
exports.flipWith = flipWith;
exports.flipWith_ = flipWith_;
exports.fold = fold;
exports.foldCause = foldCause;
exports.foldCause_ = foldCause_;
exports.fold_ = fold_;
exports.forEachUnitPar = forEachUnitPar;
exports.forEachUnitParN = forEachUnitParN;
exports.forEachUnitParN_ = forEachUnitParN_;
exports.forEachUnitPar_ = forEachUnitPar_;
exports.fromAutoClosable = fromAutoClosable;
exports.fromAutoClosableM = fromAutoClosableM;
exports.get = get;
exports.identityLeft = identityLeft;
exports.ignore = ignore;
exports.interrupt = void 0;
exports.interruptAs = interruptAs;
exports.isFailure = isFailure;
exports.isSuccess = isSuccess;
exports.join = join;
exports.joinEither = joinEither;
exports.joinEither_ = joinEither_;
exports.join_ = join_;
exports.left = left;
exports.mapEffect = mapEffect;
exports.mapEffect_ = mapEffect_;
exports.mapError = mapError;
exports.mapErrorCause = mapErrorCause;
exports.mapErrorCause_ = mapErrorCause_;
exports.mapError_ = mapError_;
exports.mapTryCatch = mapTryCatch;
exports.mapTryCatch_ = mapTryCatch_;
exports.memoize = memoize;
exports.merge = merge;
exports.mergeAll = mergeAll;
exports.mergeAllPar = mergeAllPar;
exports.mergeAllParN = mergeAllParN;
exports.mergeAllParN_ = mergeAllParN_;
exports.mergeAllPar_ = mergeAllPar_;
exports.mergeAll_ = mergeAll_;
exports.none = none;
exports.option = option;
exports.optional = optional;
exports.orDie = orDie;
exports.orDieWith = orDieWith;
exports.orDieWith_ = orDieWith_;
exports.orElse = orElse;
exports.orElseEither = orElseEither;
exports.orElseEither_ = orElseEither_;
exports.orElseFail = orElseFail;
exports.orElseFail_ = orElseFail_;
exports.orElseOptional = orElseOptional;
exports.orElseOptional_ = orElseOptional_;
exports.orElseSucceed = orElseSucceed;
exports.orElseSucceed_ = orElseSucceed_;
exports.orElse_ = orElse_;
exports.preallocate = preallocate;
exports.preallocateManaged = preallocateManaged;
exports.provide = provide;
exports.provideLayer = provideLayer;
exports.provideLayer_ = provideLayer_;
exports.provideService = provideService;
exports.provideServiceM = provideServiceM;
exports.provideSomeLayer = provideSomeLayer;
exports.reduce = reduce;
exports.reduceAll = reduceAll;
exports.reduceAllPar = reduceAllPar;
exports.reduceAllParN = reduceAllParN;
exports.reduceAllParN_ = reduceAllParN_;
exports.reduceAllPar_ = reduceAllPar_;
exports.reduceAll_ = reduceAll_;
exports.reduceRight = reduceRight;
exports.reduceRight_ = reduceRight_;
exports.reduce_ = reduce_;
exports.refineOrDie = refineOrDie;
exports.refineOrDieWith = refineOrDieWith;
exports.refineOrDieWith_ = refineOrDieWith_;
exports.refineOrDie_ = refineOrDie_;
exports.reject = reject;
exports.rejectM = rejectM;
exports.rejectM_ = rejectM_;
exports.reject_ = reject_;
exports.release = release;
exports.replaceService = replaceService;
exports.replaceServiceM = replaceServiceM;
exports.replaceServiceM_ = replaceServiceM_;
exports.replaceService_ = replaceService_;
exports.result = result;
exports.retry = retry;
exports.retryOrElse = retryOrElse;
exports.retryOrElseEither = retryOrElseEither;
exports.retryOrElseEither_ = retryOrElseEither_;
exports.retryOrElse_ = retryOrElse_;
exports.retry_ = retry_;
exports.right = right;
exports.sandbox = sandbox;
exports.sandboxWith = sandboxWith;
exports.sandboxWith_ = sandboxWith_;
exports.scope = void 0;
exports.second = second;
exports.service = service;
exports.services = services;
exports.some = some;
exports.someOrElse = someOrElse;
exports.someOrElseM = someOrElseM;
exports.someOrElseM_ = someOrElseM_;
exports.someOrElse_ = someOrElse_;
exports.someOrFail = someOrFail;
exports.someOrFailException = someOrFailException;
exports.someOrFail_ = someOrFail_;
exports.tapBoth = tapBoth;
exports.tapBoth_ = tapBoth_;
exports.tapCause = tapCause;
exports.tapCause_ = tapCause_;
exports.tapError = tapError;
exports.tapError_ = tapError_;
exports.tapM = tapM;
exports.tapM_ = tapM_;
exports.timed = timed;
exports.timeout = timeout;
exports.timeout_ = timeout_;
exports.toLayer = toLayer;
exports.toLayerMany = toLayerMany;
exports.toLayer_ = toLayer_;
exports.tryCatch = tryCatch;
exports.unit = void 0;
exports.unless = unless;
exports.unlessM = unlessM;
exports.unlessM_ = unlessM_;
exports.unless_ = unless_;
exports.unsandbox = unsandbox;
exports.unwrap = unwrap;
exports.when = when;
exports.whenM = whenM;
exports.withChildren = withChildren;
exports.withEarlyRelease = withEarlyRelease;
exports.withEarlyReleaseExit = withEarlyReleaseExit;
exports.withEarlyReleaseExit_ = withEarlyReleaseExit_;
exports.zipLeft = zipLeft;
exports.zipLeftPar = zipLeftPar;
exports.zipLeftPar_ = zipLeftPar_;
exports.zipLeft_ = zipLeft_;
exports.zipPar = zipPar;
exports.zipPar_ = zipPar_;
exports.zipRight = zipRight;
exports.zipRightPar = zipRightPar;
exports.zipRightPar_ = zipRightPar_;
exports.zipRight_ = zipRight_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Array/index.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Dictionary/index.js"));

var NA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/NonEmptyArray/index.js"));

var SS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/SortedSet/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var _primitives = /*#__PURE__*/require("../../Effect/primitives.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Fiber/index.js"));

var _index12 = /*#__PURE__*/require("../../Function/index.js");

var _index13 = /*#__PURE__*/require("../../GlobalExceptions/index.js");

var _index14 = /*#__PURE__*/require("../../Has/index.js");

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Iterable/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Layer/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Promise/index.js"));

var _index19 = /*#__PURE__*/require("../../Supervisor/index.js");

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../forEach.js"));

var _fromEffect = /*#__PURE__*/require("../fromEffect.js");

var _makeExit = /*#__PURE__*/require("../makeExit.js");

var _managed = /*#__PURE__*/require("../managed.js");

var add = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../ReleaseMap/add.js"));

var makeReleaseMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../ReleaseMap/makeReleaseMap.js"));

var releaseAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../ReleaseMap/releaseAll.js"));

var _succeed = /*#__PURE__*/require("../succeed.js");

var _absolve = /*#__PURE__*/require("./absolve.js");

var _environment = /*#__PURE__*/require("./environment.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

var _halt = /*#__PURE__*/require("./halt.js");

var _releaseMap = /*#__PURE__*/require("./releaseMap.js");

var _suspend = /*#__PURE__*/require("./suspend.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 *
 * @ets_data_first absorb_
 */
function absorb(f, __trace) {
  return self => absorb_(self, f, __trace);
}
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */


function absorb_(self, f, __trace) {
  return (0, _foldM.foldM_)(sandbox(self), c => core.fail(C.squash(f)(c)), _succeed.succeed, __trace);
}
/**
 * Unwraps the optional success of this effect, but can fail with None value.
 */


function get(self, __trace) {
  return (0, _absolve.absolve)(core.map_(self, E.fromOption(() => O.none)), __trace);
}
/**
 * Returns an effect whose failure is mapped by the specified `f` function.
 */


function mapError_(self, f, __trace) {
  return (0, _managed.managedApply)(T.mapError_(self.effect, f, __trace));
}
/**
 * Returns an effect whose failure is mapped by the specified `f` function.
 *
 * @ets_data_first mapError_
 */


function mapError(f, __trace) {
  return self => mapError_(self, f, __trace);
}
/**
 * Returns an effect whose full failure is mapped by the specified `f` function.
 */


function mapErrorCause_(self, f, __trace) {
  return (0, _managed.managedApply)(T.mapErrorCause_(self.effect, f, __trace));
}
/**
 * Returns an effect whose full failure is mapped by the specified `f` function.
 *
 * @ets_data_first mapErrorCause_
 */


function mapErrorCause(f, __trace) {
  return self => mapErrorCause_(self, f, __trace);
}
/**
 * Returns a memoized version of the specified managed.
 */


function memoize(self, __trace) {
  return core.mapM_(_releaseMap.releaseMap, finalizers => T.map_(T.bind_(T.bind_(T.do, "promise", () => P.make()), "complete", ({
    promise
  }) => T.once(T.accessM(r => T.to_(T.map_(T.provideAll_(self.effect, Tp.tuple(r, finalizers)), _ => _.get(1)), promise)))), ({
    complete,
    promise
  }) => T.toManaged(T.zipRight_(complete, P.await(promise)))), __trace);
}
/**
 * Returns a new effect where the error channel has been merged into the
 * success channel to their common combined type.
 */


function merge(self, __trace) {
  return (0, _foldM.foldM_)(self, _succeed.succeed, _succeed.succeed, __trace);
}
/**
 * Returns the managed resulting from mapping the success of this managed to unit.
 */


const unit = /*#__PURE__*/(0, _suspend.suspend)(() => (0, _fromEffect.fromEffect)(T.unit));
/**
 * Requires the option produced by this value to be `None`.
 */

exports.unit = unit;

function none(self, __trace) {
  return (0, _foldM.foldM_)(self, x => core.fail(O.some(x)), O.fold(() => unit, () => core.fail(O.none)), __trace);
}
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 */


function fold_(self, onFail, onSuccess, __trace) {
  return (0, _foldM.foldM_)(self, x => (0, _succeed.succeed)(onFail(x)), x => (0, _succeed.succeed)(onSuccess(x)), __trace);
}
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 *
 * @ets_data_first fold_
 */


function fold(onFail, onSuccess, __trace) {
  return self => fold_(self, onFail, onSuccess, __trace);
}
/**
 * Executes this effect, skipping the error but returning optionally the success.
 */


function option(self, __trace) {
  return fold_(self, () => O.none, O.some, __trace);
}
/**
 * Converts an option on errors into an option on values.
 */


function optional(self, __trace) {
  return (0, _foldM.foldM_)(self, O.fold(() => (0, _succeed.succeed)(O.none), core.fail), x => (0, _succeed.succeed)(O.some(x)), __trace);
}
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first orDieWith_
 */


function orDieWith(f, __trace) {
  return self => orDieWith_(self, f, __trace);
}
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `Throwable`.
 */


function orDieWith_(self, f, __trace) {
  return (0, _managed.managedApply)(T.orDieWith_(self.effect, f, __trace));
}
/**
 * Translates effect failure into death of the fiber, making all failures unchecked and
 * not a part of the type of the effect.
 */


function orDie(self, __trace) {
  return orDieWith_(self, _index12.identity, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 *
 * @ets_data_first orElse_
 */


function orElse(that, __trace) {
  return self => orElse_(self, that, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 */


function orElse_(self, that, __trace) {
  return (0, _foldM.foldM_)(self, () => that(), _succeed.succeed, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 *
 * @ets_data_first orElseFail_
 */


function orElseFail(e, __trace) {
  return self => orElseFail_(self, e, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 */


function orElseFail_(self, e, __trace) {
  return orElse_(self, () => core.fail(e), __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 *
 * @ets_data_first orElseEither_
 */


function orElseEither(that, __trace) {
  return self => orElseEither_(self, that, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 */


function orElseEither_(self, that, __trace) {
  return (0, _foldM.foldM_)(self, () => core.map_(that(), E.left), x => (0, _succeed.succeed)(E.right(x)), __trace);
}
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 */


function orElseOptional_(self, that, __trace) {
  return catchAll_(self, O.fold(() => that(), e => core.fail(O.some(e))), __trace);
}
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 *
 * @ets_data_first orElseOptional_
 */


function orElseOptional(that, __trace) {
  return self => orElseOptional_(self, that, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 */


function orElseSucceed_(self, that, __trace) {
  return orElse_(self, () => (0, _succeed.succeed)(that()), __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 *
 * @ets_data_first orElseSucceed_
 */


function orElseSucceed(that, __trace) {
  return self => orElseSucceed_(self, that, __trace);
}
/**
 * Recovers from all errors.
 */


function catchAll_(self, f, __trace) {
  return (0, _foldM.foldM_)(self, f, _succeed.succeed, __trace);
}
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */


function catchAll(f, __trace) {
  return self => catchAll_(self, f, __trace);
}
/**
 * Recovers from all errors with provided Cause.
 */


function catchAllCause_(self, f, __trace) {
  return core.foldCauseM_(self, f, _succeed.succeed, __trace);
}
/**
 * Recovers from all errors with provided Cause.
 *
 * @ets_data_first catchAllCause_
 */


function catchAllCause(f, __trace) {
  return self => core.foldCauseM_(self, f, _succeed.succeed, __trace);
}
/**
 * Recovers from some or all of the error cases.
 */


function catchSome_(self, pf, __trace) {
  return catchAll_(self, e => O.getOrElse_(pf(e), () => core.fail(e)), __trace);
}
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSome_
 */


function catchSome(pf, __trace) {
  return self => catchSome_(self, pf, __trace);
}
/**
 * Recovers from some or all of the error cases.
 */


function catchSomeCause_(self, pf, __trace) {
  return catchAllCause_(self, e => O.getOrElse_(pf(e), () => (0, _halt.halt)(e)), __trace);
}
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSomeCause_
 */


function catchSomeCause(pf, __trace) {
  return self => catchSomeCause_(self, pf, __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */


function continueOrFailM_(self, e, pf, __trace) {
  return core.chain_(self, a => O.getOrElse_(pf(a), () => core.fail(e())), __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailM_
 */


function continueOrFailM(e, pf, __trace) {
  return self => continueOrFailM_(self, e, pf, __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */


function continueOrFail_(self, e, pf, __trace) {
  return continueOrFailM_(self, e, x => O.map_(pf(x), _succeed.succeed), __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFail_
 */


function continueOrFail(e, pf, __trace) {
  return self => continueOrFail_(self, e, pf, __trace);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */


function provide(r, __trace) {
  return next => core.provideSome_(next, r0 => ({ ...r0,
    ...r
  }), __trace);
}
/**
 * Executes the second effect and then provides its output as an environment to this effect
 *
 * @ets_data_first compose_
 */


function compose(that, __trace) {
  return self => compose_(self, that, __trace);
}
/**
 * Executes the second effect and then provides its output as an environment to this effect
 */


function compose_(self, that, __trace) {
  return core.chain_((0, _environment.environment)(), r1 => core.chain_(core.provideAll_(self, r1), r => core.provideAll_(that, r)));
}
/**
 * Returns an effect whose failure and success have been lifted into an
 * `Either`. The resulting effect cannot fail
 */


function either(self, __trace) {
  return fold_(self, E.left, E.right, __trace);
}
/**
 * Returns a Managed that ignores errors raised by the acquire effect and
 * runs it repeatedly until it eventually succeeds.
 */


function eventually(self, __trace) {
  return (0, _managed.managedApply)(T.eventually(self.effect, __trace));
}
/**
 * Zips this effect with its environment
 */


function first(self, __trace) {
  return core.zip_(self, (0, _environment.environment)(), __trace);
}
/**
 * Effectfully map the error channel
 */


function chainError_(self, f, __trace) {
  return flipWith_(self, core.chain(f, __trace));
}
/**
 * Effectfully map the error channel
 *
 * @ets_data_first chainError_
 */


function chainError(f, __trace) {
  return self => chainError_(self, f, __trace);
}
/**
 * Flip the error and result
 */


function flip(self, __trace) {
  return (0, _foldM.foldM_)(self, _succeed.succeed, core.fail, __trace);
}
/**
 * Flip the error and result, then apply an effectful function to the effect
 */


function flipWith_(self, f, __trace) {
  return flip(f(flip(self)), __trace);
}
/**
 * Flip the error and result, then apply an effectful function to the effect
 *
 * @ets_data_first flipWith_
 */


function flipWith(f, __trace) {
  return self => flipWith_(self, f, __trace);
}
/**
 * Returns an effect that performs the outer effect first, followed by the
 * inner effect, yielding the value of the inner effect.
 *
 * This method can be used to "flatten" nested effects.
 */


function flatten(self, __trace) {
  return core.chain_(self, _index12.identity, __trace);
}
/**
 * Returns an effect that performs the outer effect first, followed by the
 * inner effect, yielding the value of the inner effect.
 *
 * This method can be used to "flatten" nested effects.
 */


function flattenM(self, __trace) {
  return core.mapM_(self, _index12.identity, __trace);
}
/**
 * A more powerful version of `fold` that allows recovering from any kind of failure except interruptions.
 */


function foldCause_(self, f, g, __trace) {
  return fold_(sandbox(self), f, g, __trace);
}
/**
 * A more powerful version of `fold` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCause_
 */


function foldCause(f, g, __trace) {
  return self => fold_(sandbox(self), f, g, __trace);
}
/**
 * Returns a new effect that ignores the success or failure of this effect.
 */


function ignore(self, __trace) {
  return fold_(self, _index12.constVoid, _index12.constVoid, __trace);
}
/**
 * Returns whether this managed effect is a failure.
 */


function isFailure(self, __trace) {
  return fold_(self, () => true, () => false, __trace);
}
/**
 * Returns whether this managed effect is a success.
 */


function isSuccess(self, __trace) {
  return fold_(self, () => false, () => true, __trace);
}
/**
 * Depending on the environment execute this or the other effect
 *
 * @ets_data_first join_
 */


function join(that, __trace) {
  return self => join_(self, that, __trace);
}
/**
 * Depending on the environment execute this or the other effect
 */


function join_(self, that, __trace) {
  return core.chain_((0, _environment.environment)(), E.fold(r => core.provideAll_(self, r), r1 => core.provideAll_(that, r1)), __trace);
}
/**
 * Depending on provided environment returns either this one or the other effect.
 *
 * @ets_data_first joinEither_
 */


function joinEither(that, __trace) {
  return self => joinEither_(self, that, __trace);
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */


function joinEither_(self, that, __trace) {
  return core.chain_((0, _environment.environment)(), E.fold(r0 => core.provideAll_(core.map_(self, E.left), r0), r1 => core.provideAll_(core.map_(that, E.right), r1)), __trace);
}
/**
 * Join self selectively with C
 */


function identityLeft(__trace) {
  return self => joinEither_(self, (0, _environment.environment)(), __trace);
}
/**
 * Lifts a synchronous side-effect into a `Managed[R, E, A]`,
 * translating any thrown exceptions into typed failed effects using onThrow.
 */


function tryCatch(f, onThrow, __trace) {
  return (0, _fromEffect.fromEffect)(T.tryCatch(f, onThrow), __trace);
}
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @ets_data_first mapTryCatch_
 */


function mapTryCatch(onThrow, f, __trace) {
  return self => mapTryCatch_(self, onThrow, f, __trace);
}
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 */


function mapTryCatch_(self, onThrow, f, __trace) {
  return (0, _foldM.foldM_)(self, e => core.fail(e), a => tryCatch(() => f(a), onThrow), __trace);
}
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 */


function mapEffect_(self, f, __trace) {
  return mapTryCatch_(self, _index12.identity, f, __trace);
}
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @ets_data_first mapEffect_
 */


function mapEffect(f, __trace) {
  return self => mapEffect_(self, f, __trace);
}
/**
 * Preallocates the managed resource, resulting in a Managed that reserves
 * and acquires immediately and cannot fail. You should take care that you
 * are not interrupted between running preallocate and actually acquiring
 * the resource as you might leak otherwise.
 */


function preallocate(self, __trace) {
  return T.uninterruptibleMask(({
    restore
  }) => T.map_(T.bind_(T.bind_(T.bind_(T.do, "releaseMap", () => makeReleaseMap.makeReleaseMap), "tp", ({
    releaseMap
  }) => T.result(restore(T.provideSome_(self.effect, r => Tp.tuple(r, releaseMap)), __trace))), "preallocated", ({
    releaseMap,
    tp
  }) => Ex.foldM_(tp, c => T.zipRight_(releaseAll.releaseAll(Ex.fail(c), T.sequential)(releaseMap), T.halt(c)), ({
    tuple: [release, a]
  }) => T.succeed((0, _managed.managedApply)(T.accessM(({
    tuple: [_, releaseMap]
  }) => T.map_(add.add(release)(releaseMap), _ => Tp.tuple(_, a))))))), ({
    preallocated
  }) => preallocated));
}
/**
 * Preallocates the managed resource inside an outer managed, resulting in a
 * Managed that reserves and acquires immediately and cannot fail.
 */


function preallocateManaged(self, __trace) {
  return (0, _managed.managedApply)(T.map_(self.effect, ({
    tuple: [release, a]
  }) => Tp.tuple(release, (0, _managed.managedApply)(T.accessM(({
    tuple: [_, releaseMap]
  }) => T.map_(add.add(release)(releaseMap), _ => Tp.tuple(_, a))))), __trace));
}
/**
 * Provides a layer to the `Managed`, which translates it to another level.
 *
 * @ets_data_first provideLayer_
 */


function provideLayer(layer, __trace) {
  return self => provideLayer_(self, layer, __trace);
}
/**
 * Provides a layer to the `Managed`, which translates it to another level.
 */


function provideLayer_(self, layer, __trace) {
  return core.chain_(L.build(layer), r => core.provideAll_(self, r), __trace);
}
/**
 * Splits the environment into two parts, providing one part using the
 * specified layer and leaving the remainder `R0`.
 */


function provideSomeLayer(layer, __trace) {
  return self => provideLayer_(self, layer["+++"](L.identity()), __trace);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first refineOrDieWith_
 */


function refineOrDieWith(pf, f, __trace) {
  return self => refineOrDieWith_(self, pf, f);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 */


function refineOrDieWith_(self, pf, f, __trace) {
  return catchAll_(self, e => O.fold_(pf(e), () => die(f(e), __trace), e1 => core.fail(e1, __trace)));
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 * @ets_data_first refineOrDie_
 */


function refineOrDie(pf, __trace) {
  return self => refineOrDie_(self, pf, __trace);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */


function refineOrDie_(self, pf, __trace) {
  return refineOrDieWith_(self, pf, _index12.identity, __trace);
}
/**
 * Returns a managed that dies with the specified `unknown`. This method
 * can be used for terminating a fiber because a defect has been
 * detected in the code.
 */


function die(e, __trace) {
  return (0, _fromEffect.fromEffect)(T.die(e, __trace));
}
/**
 * Returns a managed that dies with the specified `unknown`. This method
 * can be used for terminating a fiber because a defect has been
 * detected in the code.
 */


function dieWith(e, __trace) {
  return (0, _fromEffect.fromEffect)(T.dieWith(e, __trace));
}
/**
 * Returns an effect that dies with a [[java.lang.RuntimeException]] having the
 * specified text message. This method can be used for terminating a fiber
 * because a defect has been detected in the code.
 */


function dieMessage(message, __trace) {
  return die(new C.RuntimeError(message), __trace);
}
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 *
 * @ets_data_first rejectM_
 */


function rejectM(pf, __trace) {
  return self => rejectM_(self, pf, __trace);
}
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 */


function rejectM_(self, pf, __trace) {
  return core.chain_(self, a => O.fold_(pf(a), () => (0, _succeed.succeed)(a, __trace), _ => core.chain_(_, e1 => core.fail(e1), __trace)));
}
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 *
 * @ets_data_first reject_
 */


function reject(pf, __trace) {
  return self => reject_(self, pf, __trace);
}
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 */


function reject_(self, pf, __trace) {
  return rejectM_(self, x => O.map_(pf(x), core.fail), __trace);
}
/**
 * Runs all the finalizers associated with this scope. This is useful to
 * conceptually "close" a scope when composing multiple managed effects.
 * Note that this is only safe if the result of this managed effect is valid
 * outside its scope.
 */


function release(self, __trace) {
  return (0, _fromEffect.fromEffect)(core.useNow(self), __trace);
}
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 */


function retryOrElseEither_(self, policy, orElse, __trace) {
  return (0, _managed.managedApply)(T.map_(T.accessM(({
    tuple: [env, releaseMap]
  }) => T.provideAll_(T.retryOrElseEither_(T.provideAll_(self.effect, Tp.tuple(env, releaseMap)), policy, (e, o) => T.provideAll_(orElse(e, o).effect, Tp.tuple(env, releaseMap)), __trace), env)), E.fold(({
    tuple: [f, a]
  }) => Tp.tuple(f, E.left(a)), ({
    tuple: [f, a]
  }) => Tp.tuple(f, E.right(a)))));
}
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 *
 * @ets_data_first retryOrElseEither_
 */


function retryOrElseEither(policy, orElse, __trace) {
  return self => retryOrElseEither_(self, policy, orElse, __trace);
}
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 */


function retryOrElse_(self, policy, orElse, __trace) {
  return core.map_(retryOrElseEither_(self, policy, orElse, __trace), E.fold(_index12.identity, _index12.identity));
}
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @ets_data_first retryOrElse_
 */


function retryOrElse(policy, orElse, __trace) {
  return self => retryOrElse_(self, policy, orElse, __trace);
}
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 */


function retry_(self, policy, __trace) {
  return retryOrElse_(self, policy, (e, _) => core.fail(e), __trace);
}
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 *
 * @ets_data_first retry_
 */


function retry(policy, __trace) {
  return self => retry_(self, policy, __trace);
}
/**
 * Returns an effect that semantically runs the effect on a fiber,
 * producing an `Exit` for the completion value of the fiber.
 */


function result(self, __trace) {
  return core.foldCauseM_(self, x => (0, _succeed.succeed)(Ex.halt(x)), x => (0, _succeed.succeed)(Ex.succeed(x)), __trace);
}
/**
 * Exposes the full cause of failure of this effect.
 */


function sandbox(self, __trace) {
  return (0, _managed.managedApply)(T.sandbox(self.effect, __trace));
}
/**
 * The inverse operation to `sandbox`. Submerges the full cause of failure.
 */


function unsandbox(self) {
  return mapErrorCause_(self, C.flatten);
}
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 *
 * @ets_data_first sandboxWith_
 */


function sandboxWith(f) {
  return self => sandboxWith_(self, f);
}
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 */


function sandboxWith_(self, f) {
  return unsandbox(f(sandbox(self)));
}
/**
 * Zips this effect with its environment
 */


function second(self) {
  return core.zip_((0, _environment.environment)(), self);
}
/**
 * Converts an option on values into an option on errors.
 */


function some(self) {
  return (0, _foldM.foldM_)(self, x => core.fail(O.some(x)), O.fold(() => core.fail(O.none), _succeed.succeed));
}
/**
 * Extracts the optional value, or returns the given 'orElse'.
 *
 * @ets_data_first someOrElse_
 */


function someOrElse(orElse) {
  return self => someOrElse_(self, orElse);
}
/**
 * Extracts the optional value, or returns the given 'orElse'.
 */


function someOrElse_(self, orElse) {
  return core.map_(self, O.getOrElse(orElse));
}
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 *
 * @ets_data_first someOrElseM_
 */


function someOrElseM(orElse) {
  return self => someOrElseM_(self, orElse);
}
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 */


function someOrElseM_(self, orElse) {
  return core.chain_(self, O.fold(() => orElse, _succeed.succeed));
}
/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @ets_data_first someOrFail_
 */


function someOrFail(e) {
  return self => someOrFail_(self, e);
}
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */


function someOrFail_(self, e) {
  return core.chain_(self, O.fold(() => core.fail(e()), _succeed.succeed));
}
/**
 * Extracts the optional value, or fails with a `NoSuchElementException`
 */


function someOrFailException(self) {
  return someOrFail_(self, () => new _index13.NoSuchElementException());
}
/**
 * Returns an effect that effectfully peeks at the failure or success of the acquired resource.
 */


function tapBoth_(self, f, g) {
  return (0, _foldM.foldM_)(self, e => core.chain_(f(e), () => core.fail(e)), a => core.map_(g(a), () => a));
}
/**
 * Returns an effect that effectfully peeks at the failure or success of the acquired resource.
 *
 * @ets_data_first tapBoth_
 */


function tapBoth(f, g) {
  return self => tapBoth_(self, f, g);
}
/**
 * Returns an effect that effectually peeks at the cause of the failure of
 * the acquired resource.
 */


function tapCause_(self, f) {
  return catchAllCause_(self, c => core.chain_(f(c), () => (0, _halt.halt)(c)));
}
/**
 * Returns an effect that effectually peeks at the cause of the failure of
 * the acquired resource.
 *
 * @ets_data_first tapCause_
 */


function tapCause(f) {
  return self => tapCause_(self, f);
}
/**
 * Returns an effect that effectfully peeks at the failure of the acquired resource.
 */


function tapError_(self, f) {
  return tapBoth_(self, f, _succeed.succeed);
}
/**
 * Returns an effect that effectfully peeks at the failure of the acquired resource.
 *
 * @ets_data_first tapError_
 */


function tapError(f) {
  return self => tapError_(self, f);
}
/**
 * Like `tap`, but uses a function that returns a Effect value rather than a
 * Managed value.
 *
 * @ets_data_first tapM_
 */


function tapM(f) {
  return self => tapM_(self, f);
}
/**
 * Like `tap`, but uses a function that returns a Effect value rather than a
 * Managed value.
 */


function tapM_(self, f) {
  return core.mapM_(self, a => T.as_(f(a), a));
}
/**
 * Returns a new effect that executes this one and times the acquisition of the resource.
 */


function timed(self) {
  return (0, _managed.managedApply)(T.chain_(T.environment(), ({
    tuple: [r, releaseMap]
  }) => T.provideSome_(T.map_(T.timed(T.provideAll_(self.effect, Tp.tuple(r, releaseMap))), ({
    tuple: [duration, {
      tuple: [fin, a]
    }]
  }) => Tp.tuple(fin, Tp.tuple(duration, a))), r => r.get(0))));
}
/**
 * Returns an effect that will timeout this resource, returning `None` if the
 * timeout elapses before the resource was reserved and acquired.
 * If the reservation completes successfully (even after the timeout) the release action will be run on a new fiber.
 * `Some` will be returned if acquisition and reservation complete in time
 */


function timeout_(self, d) {
  return (0, _managed.managedApply)(T.uninterruptibleMask(({
    restore
  }) => T.gen(function* (_) {
    const env = yield* _(T.environment());
    const {
      tuple: [r, outerReleaseMap]
    } = env;
    const innerReleaseMap = yield* _(makeReleaseMap.makeReleaseMap);
    const earlyRelease = yield* _(add.add(exit => releaseAll.releaseAll(exit, T.sequential)(innerReleaseMap))(outerReleaseMap));
    const raceResult = yield* _(restore(T.provideAll_(T.raceWith_(T.provideAll_(self.effect, Tp.tuple(r, innerReleaseMap)), T.as_(T.sleep(d), O.none), (result, sleeper) => T.zipRight_(F.interrupt(sleeper), T.done(Ex.map_(result, tp => E.right(tp.get(1))))), (_, resultFiber) => T.succeed(E.left(resultFiber))), r)));
    const a = yield* _(E.fold_(raceResult, f => T.as_(T.chain_(T.fiberId, id => T.forkDaemon(T.ensuring_(F.interrupt(f), releaseAll.releaseAll(Ex.interrupt(id), T.sequential)(innerReleaseMap)))), O.none), v => T.succeed(O.some(v))));
    return Tp.tuple(earlyRelease, a);
  })));
}
/**
 * Returns an effect that will timeout this resource, returning `None` if the
 * timeout elapses before the resource was reserved and acquired.
 * If the reservation completes successfully (even after the timeout) the release action will be run on a new fiber.
 * `Some` will be returned if acquisition and reservation complete in time
 *
 * @ets_data_first timeout_
 */


function timeout(d) {
  return self => timeout_(self, d);
}
/**
 * Constructs a layer from this managed resource.
 *
 * @ets_data_first toLayer_
 */


function toLayer(tag) {
  return L.fromManaged(tag);
}
/**
 * Constructs a layer from this managed resource.
 */


function toLayer_(self, tag) {
  return toLayer(tag)(self);
}
/**
 * Constructs a layer from this managed resource, which must return one or
 * more services.
 */


function toLayerMany(...tags) {
  return self => L.fromRawManaged(core.map_(self, r => {
    const env = {};

    for (const tag of tags) {
      env[tag.key] = tag.read(r);
    }

    return env;
  }));
}
/**
 * Return unit while running the effect
 */


function asUnit(self) {
  return as_(self, undefined);
}
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 *
 * @ets_data_first unlessM_
 */


function unlessM(b) {
  return self => unlessM_(self, b);
}
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 */


function unlessM_(self, b) {
  return core.chain_(b, b => b ? unit : asUnit(self));
}
/**
 * The moral equivalent of `if (!p) exp`
 *
 * @ets_data_first unless_
 */


function unless(b) {
  return unlessM(core.succeedWith(b));
}
/**
 * The moral equivalent of `if (!p) exp`
 */


function unless_(self, b) {
  return unless(b)(self);
}
/**
 * Maps this effect to the specified constant while preserving the
 * effects of this effect.
 */


function as_(self, b) {
  return core.map_(self, () => b);
}
/**
 * Maps this effect to the specified constant while preserving the
 * effects of this effect.
 *
 * @ets_data_first as_
 */


function as(b) {
  return self => as_(self, b);
}
/**
 * Maps the success value of this effect to an optional value.
 */


function asSome(self) {
  return core.map_(self, O.some);
}
/**
 * Maps the error value of this effect to an optional value.
 */


function asSomeError(self) {
  return mapError_(self, O.some);
}
/**
 * Maps the success value of this effect to a service.
 *
 * @ets_data_first asService_
 */


function asService(tag) {
  return self => asService_(self, tag);
}
/**
 * Maps the success value of this effect to a service.
 */


function asService_(self, tag) {
  return core.map_(self, tag.has);
}
/**
 * Executes the this effect and then provides its output as an environment to the second effect
 */


function andThen_(self, that) {
  return core.chain_(self, a => core.provideAll_(that, a));
}
/**
 * Executes the this effect and then provides its output as an environment to the second effect
 *
 * @ets_data_first andThen_
 */


function andThen(that) {
  return self => andThen_(self, that);
}
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */


function bimap(f, g) {
  return self => bimap_(self, f, g);
}
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */


function bimap_(self, f, g) {
  return core.map_(mapError_(self, f), g);
}
/**
 * Joins with environment passing self selectively on the right side
 */


function right() {
  return self => joinEither_((0, _environment.environment)(), self);
}
/**
 * Joins with environment passing self selectively on the left side
 */


function left() {
  return self => joinEither_(self, (0, _environment.environment)());
}
/**
 * Effectfully accesses the environment of the effect.
 */


function access(f, __trace) {
  return (0, _fromEffect.fromEffect)(T.access(f), __trace);
}
/**
 * Effectfully accesses the environment of the effect.
 */


function accessManaged(f) {
  return core.chain_((0, _environment.environment)(), f);
}
/**
 * Effectfully accesses the environment of the effect.
 */


function accessM(f) {
  return core.mapM_((0, _environment.environment)(), f);
}
/**
 * Access a record of services with the required Service Entries
 */


function accessServicesM(s) {
  return f => accessManaged(r => f(R.map_(s, v => r[v.key])));
}
/**
 * Access a tuple of services with the required Service Entries monadically
 */


function accessServicesTM(...s) {
  return f => accessManaged(r => f(...A.map_(s, v => r[v.key])));
}
/**
 * Access a tuple of services with the required Service Entries
 */


function accessServicesT(...s) {
  return f => access(r => f(...A.map_(s, v => r[v.key])));
}
/**
 * Access a record of services with the required Service Entries
 */


function accessServices(s) {
  return f => access(r => f(R.map_(s, v => r[v.key])));
}
/**
 * Access a service with the required Service Entry
 */


function accessServiceM(s) {
  return f => accessManaged(r => f(r[s.key]));
}
/**
 * Access a service with the required Service Entry
 */


function accessService(s) {
  return f => accessServiceM(s)(a => (0, _succeed.succeed)(f(a)));
}
/**
 * Accesses the specified service in the environment of the effect.
 */


function service(s) {
  return accessServiceM(s)(a => (0, _succeed.succeed)(a));
}
/**
 * Accesses the specified services in the environment of the effect.
 */


function services(...s) {
  return access(r => s.map(tag => tag.read(r)));
}
/**
 * Provides the service with the required Service Entry
 */


function provideServiceM(_) {
  return f => ma => accessManaged(r => core.chain_(f, t => core.provideAll_(ma, (0, _index14.mergeEnvironments)(_, r, t))));
}
/**
 * Provides the service with the required Service Entry
 */


function provideService(_) {
  return f => ma => provideServiceM(_)((0, _succeed.succeed)(f))(ma);
}
/**
 * Replaces the service with the required Service Entry
 *
 * @ets_data_first replaceServiceM_
 */


function replaceServiceM(_, f) {
  return ma => accessServiceM(_)(t => provideServiceM(_)(f(t))(ma));
}
/**
 * Replaces the service with the required Service Entry
 */


function replaceServiceM_(ma, _, f) {
  return accessServiceM(_)(t => provideServiceM(_)(f(t))(ma));
}
/**
 * Replaces the service with the required Service Entry
 *
 * @ets_data_first replaceService_
 */


function replaceService(_, f) {
  return ma => accessServiceM(_)(t => provideServiceM(_)((0, _succeed.succeed)(f(t)))(ma));
}
/**
 * Replaces the service with the required Service Entry
 */


function replaceService_(ma, _, f) {
  return accessServiceM(_)(t => provideServiceM(_)((0, _succeed.succeed)(f(t)))(ma));
}
/**
 * The moral equivalent of `if (p) exp` when `p` has side-effects
 */


function whenM(b) {
  return unlessM(core.map_(b, b => !b));
}
/**
 * The moral equivalent of `if (p) exp`
 */


function when(b) {
  return unless(() => !b());
}
/**
 * A more powerful version of `withEarlyRelease` that allows specifying an
 * exit value in the event of early release.
 */


function withEarlyReleaseExit_(self, exit) {
  return (0, _managed.managedApply)(T.map_(self.effect, tp => Tp.tuple(tp.get(0), Tp.tuple(T.uninterruptible(tp.get(0)(exit)), tp.get(1)))));
}
/**
 * A more powerful version of `withEarlyRelease` that allows specifying an
 * exit value in the event of early release.
 *
 * @ets_data_first withEarlyReleaseExit_
 */


function withEarlyReleaseExit(exit) {
  return self => withEarlyReleaseExit_(self, exit);
}
/**
 * Returns an effect that succeeds with the `Fiber.Id` of the caller.
 */


const fiberId = /*#__PURE__*/(0, _fromEffect.fromEffect)(T.fiberId);
/**
 * Modifies this `Managed` to provide a canceler that can be used to eagerly
 * execute the finalizer of this `Managed`. The canceler will run
 * uninterruptibly with an exit value indicating that the effect was
 * interrupted, and if completed will cause the regular finalizer to not run.
 */

exports.fiberId = fiberId;

function withEarlyRelease(self) {
  return core.chain_(fiberId, id => withEarlyReleaseExit_(self, Ex.interrupt(id)));
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 */


function zipLeft_(a, b) {
  return core.zipWith_(a, b, a => a);
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeft_
 */


function zipLeft(b) {
  return a => zipLeft_(a, b);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 */


function zipLeftPar_(a, b) {
  return core.zipWithPar_(a, b, a => a);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeftPar_
 */


function zipLeftPar(b) {
  return a => zipLeftPar_(a, b);
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 */


function zipRight_(a, b) {
  return core.zipWith_(a, b, (_, a) => a);
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRight_
 */


function zipRight(b) {
  return a => zipRight_(a, b);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 */


function zipRightPar_(a, b) {
  return core.zipWithPar_(a, b, (_, a) => a);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRightPar_
 */


function zipRightPar(b) {
  return a => zipRightPar_(a, b);
}
/**
 * Parallely zips this effects
 */


function zipPar_(a, b) {
  return core.zipWithPar_(a, b, (a, b) => [a, b]);
}
/**
 * Parallely zips this effects
 *
 * @ets_data_first zipPar_
 */


function zipPar(b) {
  return a => zipPar_(a, b);
}
/**
 * Creates new `Managed` from a `Effect` value that uses a `ReleaseMap` and returns
 * a resource and a finalizer.
 *
 * The correct usage of this constructor consists of:
 * - Properly registering a finalizer in the ReleaseMap as part of the `Effect` value;
 * - Managing interruption safety - take care to use `uninterruptible` or
 *   `uninterruptibleMask` to verify that the finalizer is registered in the
 *   `ReleaseMap` after acquiring the value;
 * - Returning the finalizer returned from `ReleaseMap#add`. This is important
 *   to prevent double-finalization.
 */


function create(effect) {
  return (0, _managed.managedApply)(effect);
}
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true, and the given E as error otherwise
 */


function cond_(pred, result, error) {
  return pred ? (0, _succeed.succeed)(result()) : core.fail(error());
}
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true, and the given E as error otherwise
 *
 * @ets_data_first cond_
 */


function cond(result, error) {
  return pred => cond_(pred, result, error);
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEachUnit_`.
 */


function forEachUnitPar_(as, f, __trace) {
  return core.mapM_(core.makeManagedReleaseMap(T.parallel, __trace), parallelReleaseMap => {
    const makeInnerMap = T.provideSome_(T.map_(core.makeManagedReleaseMap(T.sequential).effect, _ => _.get(1)), r => Tp.tuple(r, parallelReleaseMap));
    return T.forEachUnitPar_(as, a => T.chain_(makeInnerMap, innerMap => T.provideSome_(T.map_(f(a).effect, _ => _.get(1)), r => Tp.tuple(r, innerMap))));
  });
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEachUnit_`.
 *
 * @ets_data_first forEachUnitPar_
 */


function forEachUnitPar(f, __trace) {
  return as => forEachUnitPar_(as, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEachUnit_`.
 */


function forEachUnitParN_(as, n, f, __trace) {
  return core.mapM_(core.makeManagedReleaseMap(T.parallel, __trace), parallelReleaseMap => {
    const makeInnerMap = T.provideSome_(T.map_(core.makeManagedReleaseMap(T.sequential).effect, _ => _.get(1)), r => Tp.tuple(r, parallelReleaseMap));
    return T.forEachUnitParN_(as, n, a => T.chain_(makeInnerMap, innerMap => T.provideSome_(T.map_(f(a).effect, _ => _.get(1)), r => Tp.tuple(r, innerMap))));
  });
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEachUnit_`.
 *
 * @ets_data_first forEachUnitParN_
 */


function forEachUnitParN(n, f) {
  return as => forEachUnitParN_(as, n, f);
}
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @ets_data_first collect_
 */


function collect(f) {
  return self => collect_(self, f);
}
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 */


function collect_(self, f) {
  return core.map_(forEach.forEach_(self, a => optional(f(a))), Chunk.compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * @ets_data_first collectPar_
 */


function collectPar(f) {
  return self => collectPar_(self, f);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 */


function collectPar_(self, f) {
  return core.map_(forEach.forEachPar_(self, a => optional(f(a))), Chunk.compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 */


function collectParN_(self, n, f) {
  return core.map_(forEach.forEachParN_(self, n, a => optional(f(a))), Chunk.compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectParN_
 */


function collectParN(n, f) {
  return self => collectParN_(self, n, f);
}
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */


function collectAll(as, __trace) {
  return forEach.forEach_(as, _index12.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 */


function collectAllPar(as, __trace) {
  return forEach.forEachPar_(as, _index12.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllParN_
 */


function collectAllParN(n, __trace) {
  return as => forEach.forEachParN_(as, n, _index12.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 */


function collectAllParN_(as, n, __trace) {
  return forEach.forEachParN_(as, n, _index12.identity, __trace);
}
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */


function collectAllUnit(as, __trace) {
  return forEach.forEachUnit_(as, _index12.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 */


function collectAllUnitPar(as, __trace) {
  return forEachUnitPar_(as, _index12.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllUnitParN_
 */


function collectAllUnitParN(n, __trace) {
  return as => forEachUnitParN_(as, n, _index12.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 */


function collectAllUnitParN_(as, n, __trace) {
  return forEachUnitParN_(as, n, _index12.identity, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */


function collectAllWith_(as, pf, __trace) {
  return core.map_(collectAll(as, __trace), Chunk.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */


function collectAllWith(pf, __trace) {
  return as => collectAllWith_(as, pf, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */


function collectAllWithPar_(as, pf, __trace) {
  return core.map_(collectAllPar(as, __trace), Chunk.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWithPar_
 */


function collectAllWithPar(pf, __trace) {
  return as => collectAllWithPar_(as, pf, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * Unlike `collectAllWithPar`, this method will use at most up to `n` fibers.
 */


function collectAllWithParN_(as, n, pf, __trace) {
  return core.map_(collectAllParN_(as, n, __trace), Chunk.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * Unlike `collectAllWithPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectAllWithParN_
 */


function collectAllWithParN(n, pf, __trace) {
  return as => collectAllWithParN_(as, n, pf, __trace);
}
/**
 * Evaluate and run each effect in the structure and collect discarding failed ones.
 */


function collectAllSuccesses(as, __trace) {
  return collectAllWith_(I.map_(as, x => result(x)), e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 */


function collectAllSuccessesPar(as, __trace) {
  return collectAllWithPar_(I.map_(as, x => result(x)), e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectAllSuccessesParN_
 */


function collectAllSuccessesParN(n, __trace) {
  return as => collectAllSuccessesParN_(as, n, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 */


function collectAllSuccessesParN_(as, n, __trace) {
  return collectAllWithParN_(I.map_(as, x => result(x)), n, e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Creates an effect that only executes the provided function as its
 * release action.
 */


function finalizerExit(f, __trace) {
  return (0, _makeExit.makeExit_)(T.unit, (_, e) => f(e), __trace);
}
/**
 * Creates an effect that only executes the provided finalizer as its
 * release action.
 */


function finalizer(f, __trace) {
  return finalizerExit(() => f, __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */


function reduce_(i, zero, f, __trace) {
  return (0, _suspend.suspend)(() => A.reduce_(Array.from(i), (0, _succeed.succeed)(zero), (acc, el) => core.chain_(acc, a => f(a, el))), __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduce_
 */


function reduce(zero, f, __trace) {
  return i => reduce_(i, zero, f, __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */


function reduceRight_(i, zero, f, __trace) {
  return (0, _suspend.suspend)(() => A.reduceRight_(Array.from(i), (0, _succeed.succeed)(zero), (el, acc) => core.chain_(acc, a => f(el, a))), __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduceRight_
 */


function reduceRight(zero, f) {
  return i => reduceRight_(i, zero, f);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 */


function reduceAll_(as, f) {
  return A.reduce_(NA.tail(as), NA.head(as), (acc, a) => core.zipWith_(acc, a, f));
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 *
 * @ets_data_first reduceAll_
 */


function reduceAll(f) {
  return as => reduceAll_(as, f);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 */


function reduceAllPar_(as, f) {
  return core.mapM_(core.makeManagedReleaseMap(T.parallel), parallelReleaseMap => T.provideSome_(T.reduceAllPar_(NA.map_(as, _ => T.map_(_.effect, _ => _.get(1))), f), r => Tp.tuple(r, parallelReleaseMap)));
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 *
 * @ets_data_first reduceAllPar_
 */


function reduceAllPar(f) {
  return as => reduceAllPar_(as, f);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 */


function reduceAllParN_(as, n, f) {
  return core.mapM_(core.makeManagedReleaseMap(T.parallel), parallelReleaseMap => T.provideSome_(T.reduceAllParN_(NA.map_(as, _ => T.map_(_.effect, _ => _.get(1))), n, f), r => Tp.tuple(r, parallelReleaseMap)));
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 *
 * @ets_data_first reduceAllParN_
 */


function reduceAllParN(n, f) {
  return as => reduceAllParN_(as, n, f);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 *
 * @ets_data_first mergeAll_
 */


function mergeAll(zero, f) {
  return as => mergeAll_(as, zero, f);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 */


function mergeAll_(as, zero, f) {
  return I.reduce_(as, (0, _succeed.succeed)(zero), (b, a) => core.zipWith_(b, a, f));
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 *
 * @ets_data_first mergeAllPar_
 */


function mergeAllPar(zero, f) {
  return as => mergeAllPar_(as, zero, f);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 */


function mergeAllPar_(as, zero, f) {
  return core.mapM_(core.makeManagedReleaseMap(T.parallel), parallelReleaseMap => T.provideSome_(T.mergeAllPar_(I.map_(as, _ => T.map_(_.effect, _ => _.get(1))), zero, f), r => Tp.tuple(r, parallelReleaseMap)));
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in with up to `n` fibers in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 *
 * @ets_data_first mergeAllParN_
 */


function mergeAllParN(n, zero, f) {
  return as => mergeAllParN_(as, n, zero, f);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in with up to `n` fibers in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 */


function mergeAllParN_(as, n, zero, f) {
  return core.mapM_(core.makeManagedReleaseMap(T.parallel), parallelReleaseMap => T.provideSome_(T.mergeAllParN_(I.map_(as, _ => T.map_(_.effect, _ => _.get(1))), n, zero, f), r => Tp.tuple(r, parallelReleaseMap)));
}
/**
 * Creates a scope in which resources can be safely allocated into together with a release action.
 */


const scope = /*#__PURE__*/core.map_(_releaseMap.releaseMap, finalizers => ma => T.chain_(T.environment(), r => T.provideAll_(ma.effect, Tp.tuple(r, finalizers))));
/**
 * Locally installs a supervisor and an effect that succeeds with all the
 * children that have been forked in the returned effect.
 */

exports.scope = scope;

function withChildren(get) {
  return unwrap(T.map_(_index19.track, supervisor => (0, _managed.managedApply)(T.supervised_(get(T.chain_(supervisor.value, children => T.map_(T.descriptor, d => SS.filter_(children, _ => _.id !== d.id)))).effect, supervisor))));
}
/**
 * Unwraps a `Managed` that is inside an `Effect`.
 */


function unwrap(fa) {
  return flatten((0, _fromEffect.fromEffect)(fa));
}
/**
 * Creates a `Managed` from an `AutoCloseable` resource. The resource's `close`
 * method will be used as the release action.
 */


function fromAutoClosable(fa) {
  return core.make_(fa, a => T.succeedWith(() => a.close()));
}
/**
 * Creates a `Managed` from an `AutoCloseable` resource. The resource's `close`
 * method will be used as the release action.
 */


function fromAutoClosableM(fa) {
  return core.make_(fa, a => a.close);
}
/**
 * Returns an effect that is interrupted as if by the fiber calling this
 * method.
 */


const interrupt = /*#__PURE__*/core.chain_( /*#__PURE__*/(0, _fromEffect.fromEffect)(T.descriptor), d => interruptAs(d.id));
/**
 * Returns an effect that is interrupted as if by the specified fiber.
 */

exports.interrupt = interrupt;

function interruptAs(id) {
  return (0, _halt.halt)(C.interrupt(id));
}
/**
 * Low level expose internal trace pusher
 */


function exposeTracer(f) {
  return (0, _managed.managedApply)(new _primitives.ITracer(tracer => f(tracer).effect));
}
//# sourceMappingURL=api.js.map