import * as C from "../../Cause/index.mjs";
import { RuntimeError } from "../../Cause/index.mjs";
import * as A from "../../Collections/Immutable/Array/index.mjs";
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import * as R from "../../Collections/Immutable/Dictionary/index.mjs";
import * as NA from "../../Collections/Immutable/NonEmptyArray/index.mjs";
import * as SS from "../../Collections/Immutable/SortedSet/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../Effect/index.mjs";
import { ITracer } from "../../Effect/primitives.mjs";
import * as E from "../../Either/index.mjs";
import * as Ex from "../../Exit/index.mjs";
import * as F from "../../Fiber/index.mjs";
import { constVoid, identity, pipe } from "../../Function/index.mjs";
import { NoSuchElementException } from "../../GlobalExceptions/index.mjs";
import { mergeEnvironments } from "../../Has/index.mjs";
import * as I from "../../Iterable/index.mjs";
import * as L from "../../Layer/index.mjs";
import * as O from "../../Option/index.mjs";
import * as P from "../../Promise/index.mjs";
import { track } from "../../Supervisor/index.mjs";
import * as core from "../core.mjs";
import * as forEach from "../forEach.mjs";
import { fromEffect } from "../fromEffect.mjs";
import { makeExit_ } from "../makeExit.mjs";
import { managedApply } from "../managed.mjs";
import * as add from "../ReleaseMap/add.mjs";
import * as makeReleaseMap from "../ReleaseMap/makeReleaseMap.mjs";
import * as releaseAll from "../ReleaseMap/releaseAll.mjs";
import { succeed } from "../succeed.mjs";
import { absolve } from "./absolve.mjs";
import { environment } from "./environment.mjs";
import { foldM_ } from "./foldM.mjs";
import { halt } from "./halt.mjs";
import { releaseMap } from "./releaseMap.mjs";
import { suspend } from "./suspend.mjs";
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 *
 * @ets_data_first absorb_
 */

export function absorb(f, __trace) {
  return self => absorb_(self, f, __trace);
}
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */

export function absorb_(self, f, __trace) {
  return foldM_(sandbox(self), c => core.fail(C.squash(f)(c)), succeed, __trace);
}
/**
 * Unwraps the optional success of this effect, but can fail with None value.
 */

export function get(self, __trace) {
  return absolve(core.map_(self, E.fromOption(() => O.none)), __trace);
}
/**
 * Returns an effect whose failure is mapped by the specified `f` function.
 */

export function mapError_(self, f, __trace) {
  return managedApply(T.mapError_(self.effect, f, __trace));
}
/**
 * Returns an effect whose failure is mapped by the specified `f` function.
 *
 * @ets_data_first mapError_
 */

export function mapError(f, __trace) {
  return self => mapError_(self, f, __trace);
}
/**
 * Returns an effect whose full failure is mapped by the specified `f` function.
 */

export function mapErrorCause_(self, f, __trace) {
  return managedApply(T.mapErrorCause_(self.effect, f, __trace));
}
/**
 * Returns an effect whose full failure is mapped by the specified `f` function.
 *
 * @ets_data_first mapErrorCause_
 */

export function mapErrorCause(f, __trace) {
  return self => mapErrorCause_(self, f, __trace);
}
/**
 * Returns a memoized version of the specified managed.
 */

export function memoize(self, __trace) {
  return core.mapM_(releaseMap, finalizers => T.map_(T.bind_(T.bind_(T.do, "promise", () => P.make()), "complete", ({
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

export function merge(self, __trace) {
  return foldM_(self, succeed, succeed, __trace);
}
/**
 * Returns the managed resulting from mapping the success of this managed to unit.
 */

export const unit = /*#__PURE__*/suspend(() => fromEffect(T.unit));
/**
 * Requires the option produced by this value to be `None`.
 */

export function none(self, __trace) {
  return foldM_(self, x => core.fail(O.some(x)), O.fold(() => unit, () => core.fail(O.none)), __trace);
}
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 */

export function fold_(self, onFail, onSuccess, __trace) {
  return foldM_(self, x => succeed(onFail(x)), x => succeed(onSuccess(x)), __trace);
}
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 *
 * @ets_data_first fold_
 */

export function fold(onFail, onSuccess, __trace) {
  return self => fold_(self, onFail, onSuccess, __trace);
}
/**
 * Executes this effect, skipping the error but returning optionally the success.
 */

export function option(self, __trace) {
  return fold_(self, () => O.none, O.some, __trace);
}
/**
 * Converts an option on errors into an option on values.
 */

export function optional(self, __trace) {
  return foldM_(self, O.fold(() => succeed(O.none), core.fail), x => succeed(O.some(x)), __trace);
}
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first orDieWith_
 */

export function orDieWith(f, __trace) {
  return self => orDieWith_(self, f, __trace);
}
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `Throwable`.
 */

export function orDieWith_(self, f, __trace) {
  return managedApply(T.orDieWith_(self.effect, f, __trace));
}
/**
 * Translates effect failure into death of the fiber, making all failures unchecked and
 * not a part of the type of the effect.
 */

export function orDie(self, __trace) {
  return orDieWith_(self, identity, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 *
 * @ets_data_first orElse_
 */

export function orElse(that, __trace) {
  return self => orElse_(self, that, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 */

export function orElse_(self, that, __trace) {
  return foldM_(self, () => that(), succeed, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 *
 * @ets_data_first orElseFail_
 */

export function orElseFail(e, __trace) {
  return self => orElseFail_(self, e, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 */

export function orElseFail_(self, e, __trace) {
  return orElse_(self, () => core.fail(e), __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 *
 * @ets_data_first orElseEither_
 */

export function orElseEither(that, __trace) {
  return self => orElseEither_(self, that, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 */

export function orElseEither_(self, that, __trace) {
  return foldM_(self, () => core.map_(that(), E.left), x => succeed(E.right(x)), __trace);
}
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 */

export function orElseOptional_(self, that, __trace) {
  return catchAll_(self, O.fold(() => that(), e => core.fail(O.some(e))), __trace);
}
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 *
 * @ets_data_first orElseOptional_
 */

export function orElseOptional(that, __trace) {
  return self => orElseOptional_(self, that, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 */

export function orElseSucceed_(self, that, __trace) {
  return orElse_(self, () => succeed(that()), __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 *
 * @ets_data_first orElseSucceed_
 */

export function orElseSucceed(that, __trace) {
  return self => orElseSucceed_(self, that, __trace);
}
/**
 * Recovers from all errors.
 */

export function catchAll_(self, f, __trace) {
  return foldM_(self, f, succeed, __trace);
}
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */

export function catchAll(f, __trace) {
  return self => catchAll_(self, f, __trace);
}
/**
 * Recovers from all errors with provided Cause.
 */

export function catchAllCause_(self, f, __trace) {
  return core.foldCauseM_(self, f, succeed, __trace);
}
/**
 * Recovers from all errors with provided Cause.
 *
 * @ets_data_first catchAllCause_
 */

export function catchAllCause(f, __trace) {
  return self => core.foldCauseM_(self, f, succeed, __trace);
}
/**
 * Recovers from some or all of the error cases.
 */

export function catchSome_(self, pf, __trace) {
  return catchAll_(self, e => O.getOrElse_(pf(e), () => core.fail(e)), __trace);
}
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSome_
 */

export function catchSome(pf, __trace) {
  return self => catchSome_(self, pf, __trace);
}
/**
 * Recovers from some or all of the error cases.
 */

export function catchSomeCause_(self, pf, __trace) {
  return catchAllCause_(self, e => O.getOrElse_(pf(e), () => halt(e)), __trace);
}
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSomeCause_
 */

export function catchSomeCause(pf, __trace) {
  return self => catchSomeCause_(self, pf, __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */

export function continueOrFailM_(self, e, pf, __trace) {
  return core.chain_(self, a => O.getOrElse_(pf(a), () => core.fail(e())), __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailM_
 */

export function continueOrFailM(e, pf, __trace) {
  return self => continueOrFailM_(self, e, pf, __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */

export function continueOrFail_(self, e, pf, __trace) {
  return continueOrFailM_(self, e, x => O.map_(pf(x), succeed), __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFail_
 */

export function continueOrFail(e, pf, __trace) {
  return self => continueOrFail_(self, e, pf, __trace);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */

export function provide(r, __trace) {
  return next => core.provideSome_(next, r0 => ({ ...r0,
    ...r
  }), __trace);
}
/**
 * Executes the second effect and then provides its output as an environment to this effect
 *
 * @ets_data_first compose_
 */

export function compose(that, __trace) {
  return self => compose_(self, that, __trace);
}
/**
 * Executes the second effect and then provides its output as an environment to this effect
 */

export function compose_(self, that, __trace) {
  return core.chain_(environment(), r1 => core.chain_(core.provideAll_(self, r1), r => core.provideAll_(that, r)));
}
/**
 * Returns an effect whose failure and success have been lifted into an
 * `Either`. The resulting effect cannot fail
 */

export function either(self, __trace) {
  return fold_(self, E.left, E.right, __trace);
}
/**
 * Returns a Managed that ignores errors raised by the acquire effect and
 * runs it repeatedly until it eventually succeeds.
 */

export function eventually(self, __trace) {
  return managedApply(T.eventually(self.effect, __trace));
}
/**
 * Zips this effect with its environment
 */

export function first(self, __trace) {
  return core.zip_(self, environment(), __trace);
}
/**
 * Effectfully map the error channel
 */

export function chainError_(self, f, __trace) {
  return flipWith_(self, core.chain(f, __trace));
}
/**
 * Effectfully map the error channel
 *
 * @ets_data_first chainError_
 */

export function chainError(f, __trace) {
  return self => chainError_(self, f, __trace);
}
/**
 * Flip the error and result
 */

export function flip(self, __trace) {
  return foldM_(self, succeed, core.fail, __trace);
}
/**
 * Flip the error and result, then apply an effectful function to the effect
 */

export function flipWith_(self, f, __trace) {
  return flip(f(flip(self)), __trace);
}
/**
 * Flip the error and result, then apply an effectful function to the effect
 *
 * @ets_data_first flipWith_
 */

export function flipWith(f, __trace) {
  return self => flipWith_(self, f, __trace);
}
/**
 * Returns an effect that performs the outer effect first, followed by the
 * inner effect, yielding the value of the inner effect.
 *
 * This method can be used to "flatten" nested effects.
 */

export function flatten(self, __trace) {
  return core.chain_(self, identity, __trace);
}
/**
 * Returns an effect that performs the outer effect first, followed by the
 * inner effect, yielding the value of the inner effect.
 *
 * This method can be used to "flatten" nested effects.
 */

export function flattenM(self, __trace) {
  return core.mapM_(self, identity, __trace);
}
/**
 * A more powerful version of `fold` that allows recovering from any kind of failure except interruptions.
 */

export function foldCause_(self, f, g, __trace) {
  return fold_(sandbox(self), f, g, __trace);
}
/**
 * A more powerful version of `fold` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCause_
 */

export function foldCause(f, g, __trace) {
  return self => fold_(sandbox(self), f, g, __trace);
}
/**
 * Returns a new effect that ignores the success or failure of this effect.
 */

export function ignore(self, __trace) {
  return fold_(self, constVoid, constVoid, __trace);
}
/**
 * Returns whether this managed effect is a failure.
 */

export function isFailure(self, __trace) {
  return fold_(self, () => true, () => false, __trace);
}
/**
 * Returns whether this managed effect is a success.
 */

export function isSuccess(self, __trace) {
  return fold_(self, () => false, () => true, __trace);
}
/**
 * Depending on the environment execute this or the other effect
 *
 * @ets_data_first join_
 */

export function join(that, __trace) {
  return self => join_(self, that, __trace);
}
/**
 * Depending on the environment execute this or the other effect
 */

export function join_(self, that, __trace) {
  return core.chain_(environment(), E.fold(r => core.provideAll_(self, r), r1 => core.provideAll_(that, r1)), __trace);
}
/**
 * Depending on provided environment returns either this one or the other effect.
 *
 * @ets_data_first joinEither_
 */

export function joinEither(that, __trace) {
  return self => joinEither_(self, that, __trace);
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */

export function joinEither_(self, that, __trace) {
  return core.chain_(environment(), E.fold(r0 => core.provideAll_(core.map_(self, E.left), r0), r1 => core.provideAll_(core.map_(that, E.right), r1)), __trace);
}
/**
 * Join self selectively with C
 */

export function identityLeft(__trace) {
  return self => joinEither_(self, environment(), __trace);
}
/**
 * Lifts a synchronous side-effect into a `Managed[R, E, A]`,
 * translating any thrown exceptions into typed failed effects using onThrow.
 */

export function tryCatch(f, onThrow, __trace) {
  return fromEffect(T.tryCatch(f, onThrow), __trace);
}
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @ets_data_first mapTryCatch_
 */

export function mapTryCatch(onThrow, f, __trace) {
  return self => mapTryCatch_(self, onThrow, f, __trace);
}
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 */

export function mapTryCatch_(self, onThrow, f, __trace) {
  return foldM_(self, e => core.fail(e), a => tryCatch(() => f(a), onThrow), __trace);
}
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 */

export function mapEffect_(self, f, __trace) {
  return mapTryCatch_(self, identity, f, __trace);
}
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @ets_data_first mapEffect_
 */

export function mapEffect(f, __trace) {
  return self => mapEffect_(self, f, __trace);
}
/**
 * Preallocates the managed resource, resulting in a Managed that reserves
 * and acquires immediately and cannot fail. You should take care that you
 * are not interrupted between running preallocate and actually acquiring
 * the resource as you might leak otherwise.
 */

export function preallocate(self, __trace) {
  return T.uninterruptibleMask(({
    restore
  }) => T.map_(T.bind_(T.bind_(T.bind_(T.do, "releaseMap", () => makeReleaseMap.makeReleaseMap), "tp", ({
    releaseMap
  }) => T.result(restore(T.provideSome_(self.effect, r => Tp.tuple(r, releaseMap)), __trace))), "preallocated", ({
    releaseMap,
    tp
  }) => Ex.foldM_(tp, c => T.zipRight_(releaseAll.releaseAll(Ex.fail(c), T.sequential)(releaseMap), T.halt(c)), ({
    tuple: [release, a]
  }) => T.succeed(managedApply(T.accessM(({
    tuple: [_, releaseMap]
  }) => T.map_(add.add(release)(releaseMap), _ => Tp.tuple(_, a))))))), ({
    preallocated
  }) => preallocated));
}
/**
 * Preallocates the managed resource inside an outer managed, resulting in a
 * Managed that reserves and acquires immediately and cannot fail.
 */

export function preallocateManaged(self, __trace) {
  return managedApply(T.map_(self.effect, ({
    tuple: [release, a]
  }) => Tp.tuple(release, managedApply(T.accessM(({
    tuple: [_, releaseMap]
  }) => T.map_(add.add(release)(releaseMap), _ => Tp.tuple(_, a))))), __trace));
}
/**
 * Provides a layer to the `Managed`, which translates it to another level.
 *
 * @ets_data_first provideLayer_
 */

export function provideLayer(layer, __trace) {
  return self => provideLayer_(self, layer, __trace);
}
/**
 * Provides a layer to the `Managed`, which translates it to another level.
 */

export function provideLayer_(self, layer, __trace) {
  return core.chain_(L.build(layer), r => core.provideAll_(self, r), __trace);
}
/**
 * Splits the environment into two parts, providing one part using the
 * specified layer and leaving the remainder `R0`.
 */

export function provideSomeLayer(layer, __trace) {
  return self => provideLayer_(self, layer["+++"](L.identity()), __trace);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first refineOrDieWith_
 */

export function refineOrDieWith(pf, f, __trace) {
  return self => refineOrDieWith_(self, pf, f);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 */

export function refineOrDieWith_(self, pf, f, __trace) {
  return catchAll_(self, e => O.fold_(pf(e), () => die(f(e), __trace), e1 => core.fail(e1, __trace)));
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 * @ets_data_first refineOrDie_
 */

export function refineOrDie(pf, __trace) {
  return self => refineOrDie_(self, pf, __trace);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */

export function refineOrDie_(self, pf, __trace) {
  return refineOrDieWith_(self, pf, identity, __trace);
}
/**
 * Returns a managed that dies with the specified `unknown`. This method
 * can be used for terminating a fiber because a defect has been
 * detected in the code.
 */

export function die(e, __trace) {
  return fromEffect(T.die(e, __trace));
}
/**
 * Returns a managed that dies with the specified `unknown`. This method
 * can be used for terminating a fiber because a defect has been
 * detected in the code.
 */

export function dieWith(e, __trace) {
  return fromEffect(T.dieWith(e, __trace));
}
/**
 * Returns an effect that dies with a [[java.lang.RuntimeException]] having the
 * specified text message. This method can be used for terminating a fiber
 * because a defect has been detected in the code.
 */

export function dieMessage(message, __trace) {
  return die(new RuntimeError(message), __trace);
}
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 *
 * @ets_data_first rejectM_
 */

export function rejectM(pf, __trace) {
  return self => rejectM_(self, pf, __trace);
}
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 */

export function rejectM_(self, pf, __trace) {
  return core.chain_(self, a => O.fold_(pf(a), () => succeed(a, __trace), _ => core.chain_(_, e1 => core.fail(e1), __trace)));
}
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 *
 * @ets_data_first reject_
 */

export function reject(pf, __trace) {
  return self => reject_(self, pf, __trace);
}
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 */

export function reject_(self, pf, __trace) {
  return rejectM_(self, x => O.map_(pf(x), core.fail), __trace);
}
/**
 * Runs all the finalizers associated with this scope. This is useful to
 * conceptually "close" a scope when composing multiple managed effects.
 * Note that this is only safe if the result of this managed effect is valid
 * outside its scope.
 */

export function release(self, __trace) {
  return fromEffect(core.useNow(self), __trace);
}
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 */

export function retryOrElseEither_(self, policy, orElse, __trace) {
  return managedApply(T.map_(T.accessM(({
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

export function retryOrElseEither(policy, orElse, __trace) {
  return self => retryOrElseEither_(self, policy, orElse, __trace);
}
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 */

export function retryOrElse_(self, policy, orElse, __trace) {
  return core.map_(retryOrElseEither_(self, policy, orElse, __trace), E.fold(identity, identity));
}
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @ets_data_first retryOrElse_
 */

export function retryOrElse(policy, orElse, __trace) {
  return self => retryOrElse_(self, policy, orElse, __trace);
}
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 */

export function retry_(self, policy, __trace) {
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

export function retry(policy, __trace) {
  return self => retry_(self, policy, __trace);
}
/**
 * Returns an effect that semantically runs the effect on a fiber,
 * producing an `Exit` for the completion value of the fiber.
 */

export function result(self, __trace) {
  return core.foldCauseM_(self, x => succeed(Ex.halt(x)), x => succeed(Ex.succeed(x)), __trace);
}
/**
 * Exposes the full cause of failure of this effect.
 */

export function sandbox(self, __trace) {
  return managedApply(T.sandbox(self.effect, __trace));
}
/**
 * The inverse operation to `sandbox`. Submerges the full cause of failure.
 */

export function unsandbox(self) {
  return mapErrorCause_(self, C.flatten);
}
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 *
 * @ets_data_first sandboxWith_
 */

export function sandboxWith(f) {
  return self => sandboxWith_(self, f);
}
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 */

export function sandboxWith_(self, f) {
  return unsandbox(f(sandbox(self)));
}
/**
 * Zips this effect with its environment
 */

export function second(self) {
  return core.zip_(environment(), self);
}
/**
 * Converts an option on values into an option on errors.
 */

export function some(self) {
  return foldM_(self, x => core.fail(O.some(x)), O.fold(() => core.fail(O.none), succeed));
}
/**
 * Extracts the optional value, or returns the given 'orElse'.
 *
 * @ets_data_first someOrElse_
 */

export function someOrElse(orElse) {
  return self => someOrElse_(self, orElse);
}
/**
 * Extracts the optional value, or returns the given 'orElse'.
 */

export function someOrElse_(self, orElse) {
  return core.map_(self, O.getOrElse(orElse));
}
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 *
 * @ets_data_first someOrElseM_
 */

export function someOrElseM(orElse) {
  return self => someOrElseM_(self, orElse);
}
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 */

export function someOrElseM_(self, orElse) {
  return core.chain_(self, O.fold(() => orElse, succeed));
}
/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @ets_data_first someOrFail_
 */

export function someOrFail(e) {
  return self => someOrFail_(self, e);
}
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */

export function someOrFail_(self, e) {
  return core.chain_(self, O.fold(() => core.fail(e()), succeed));
}
/**
 * Extracts the optional value, or fails with a `NoSuchElementException`
 */

export function someOrFailException(self) {
  return someOrFail_(self, () => new NoSuchElementException());
}
/**
 * Returns an effect that effectfully peeks at the failure or success of the acquired resource.
 */

export function tapBoth_(self, f, g) {
  return foldM_(self, e => core.chain_(f(e), () => core.fail(e)), a => core.map_(g(a), () => a));
}
/**
 * Returns an effect that effectfully peeks at the failure or success of the acquired resource.
 *
 * @ets_data_first tapBoth_
 */

export function tapBoth(f, g) {
  return self => tapBoth_(self, f, g);
}
/**
 * Returns an effect that effectually peeks at the cause of the failure of
 * the acquired resource.
 */

export function tapCause_(self, f) {
  return catchAllCause_(self, c => core.chain_(f(c), () => halt(c)));
}
/**
 * Returns an effect that effectually peeks at the cause of the failure of
 * the acquired resource.
 *
 * @ets_data_first tapCause_
 */

export function tapCause(f) {
  return self => tapCause_(self, f);
}
/**
 * Returns an effect that effectfully peeks at the failure of the acquired resource.
 */

export function tapError_(self, f) {
  return tapBoth_(self, f, succeed);
}
/**
 * Returns an effect that effectfully peeks at the failure of the acquired resource.
 *
 * @ets_data_first tapError_
 */

export function tapError(f) {
  return self => tapError_(self, f);
}
/**
 * Like `tap`, but uses a function that returns a Effect value rather than a
 * Managed value.
 *
 * @ets_data_first tapM_
 */

export function tapM(f) {
  return self => tapM_(self, f);
}
/**
 * Like `tap`, but uses a function that returns a Effect value rather than a
 * Managed value.
 */

export function tapM_(self, f) {
  return core.mapM_(self, a => T.as_(f(a), a));
}
/**
 * Returns a new effect that executes this one and times the acquisition of the resource.
 */

export function timed(self) {
  return managedApply(T.chain_(T.environment(), ({
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

export function timeout_(self, d) {
  return managedApply(T.uninterruptibleMask(({
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

export function timeout(d) {
  return self => timeout_(self, d);
}
/**
 * Constructs a layer from this managed resource.
 *
 * @ets_data_first toLayer_
 */

export function toLayer(tag) {
  return L.fromManaged(tag);
}
/**
 * Constructs a layer from this managed resource.
 */

export function toLayer_(self, tag) {
  return toLayer(tag)(self);
}
/**
 * Constructs a layer from this managed resource, which must return one or
 * more services.
 */

export function toLayerMany(...tags) {
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

export function asUnit(self) {
  return as_(self, undefined);
}
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 *
 * @ets_data_first unlessM_
 */

export function unlessM(b) {
  return self => unlessM_(self, b);
}
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 */

export function unlessM_(self, b) {
  return core.chain_(b, b => b ? unit : asUnit(self));
}
/**
 * The moral equivalent of `if (!p) exp`
 *
 * @ets_data_first unless_
 */

export function unless(b) {
  return unlessM(core.succeedWith(b));
}
/**
 * The moral equivalent of `if (!p) exp`
 */

export function unless_(self, b) {
  return unless(b)(self);
}
/**
 * Maps this effect to the specified constant while preserving the
 * effects of this effect.
 */

export function as_(self, b) {
  return core.map_(self, () => b);
}
/**
 * Maps this effect to the specified constant while preserving the
 * effects of this effect.
 *
 * @ets_data_first as_
 */

export function as(b) {
  return self => as_(self, b);
}
/**
 * Maps the success value of this effect to an optional value.
 */

export function asSome(self) {
  return core.map_(self, O.some);
}
/**
 * Maps the error value of this effect to an optional value.
 */

export function asSomeError(self) {
  return mapError_(self, O.some);
}
/**
 * Maps the success value of this effect to a service.
 *
 * @ets_data_first asService_
 */

export function asService(tag) {
  return self => asService_(self, tag);
}
/**
 * Maps the success value of this effect to a service.
 */

export function asService_(self, tag) {
  return core.map_(self, tag.has);
}
/**
 * Executes the this effect and then provides its output as an environment to the second effect
 */

export function andThen_(self, that) {
  return core.chain_(self, a => core.provideAll_(that, a));
}
/**
 * Executes the this effect and then provides its output as an environment to the second effect
 *
 * @ets_data_first andThen_
 */

export function andThen(that) {
  return self => andThen_(self, that);
}
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */

export function bimap(f, g) {
  return self => bimap_(self, f, g);
}
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */

export function bimap_(self, f, g) {
  return core.map_(mapError_(self, f), g);
}
/**
 * Joins with environment passing self selectively on the right side
 */

export function right() {
  return self => joinEither_(environment(), self);
}
/**
 * Joins with environment passing self selectively on the left side
 */

export function left() {
  return self => joinEither_(self, environment());
}
/**
 * Effectfully accesses the environment of the effect.
 */

export function access(f, __trace) {
  return fromEffect(T.access(f), __trace);
}
/**
 * Effectfully accesses the environment of the effect.
 */

export function accessManaged(f) {
  return core.chain_(environment(), f);
}
/**
 * Effectfully accesses the environment of the effect.
 */

export function accessM(f) {
  return core.mapM_(environment(), f);
}
/**
 * Access a record of services with the required Service Entries
 */

export function accessServicesM(s) {
  return f => accessManaged(r => f(R.map_(s, v => r[v.key])));
}
/**
 * Access a tuple of services with the required Service Entries monadically
 */

export function accessServicesTM(...s) {
  return f => accessManaged(r => f(...A.map_(s, v => r[v.key])));
}
/**
 * Access a tuple of services with the required Service Entries
 */

export function accessServicesT(...s) {
  return f => access(r => f(...A.map_(s, v => r[v.key])));
}
/**
 * Access a record of services with the required Service Entries
 */

export function accessServices(s) {
  return f => access(r => f(R.map_(s, v => r[v.key])));
}
/**
 * Access a service with the required Service Entry
 */

export function accessServiceM(s) {
  return f => accessManaged(r => f(r[s.key]));
}
/**
 * Access a service with the required Service Entry
 */

export function accessService(s) {
  return f => accessServiceM(s)(a => succeed(f(a)));
}
/**
 * Accesses the specified service in the environment of the effect.
 */

export function service(s) {
  return accessServiceM(s)(a => succeed(a));
}
/**
 * Accesses the specified services in the environment of the effect.
 */

export function services(...s) {
  return access(r => s.map(tag => tag.read(r)));
}
/**
 * Provides the service with the required Service Entry
 */

export function provideServiceM(_) {
  return f => ma => accessManaged(r => core.chain_(f, t => core.provideAll_(ma, mergeEnvironments(_, r, t))));
}
/**
 * Provides the service with the required Service Entry
 */

export function provideService(_) {
  return f => ma => provideServiceM(_)(succeed(f))(ma);
}
/**
 * Replaces the service with the required Service Entry
 *
 * @ets_data_first replaceServiceM_
 */

export function replaceServiceM(_, f) {
  return ma => accessServiceM(_)(t => provideServiceM(_)(f(t))(ma));
}
/**
 * Replaces the service with the required Service Entry
 */

export function replaceServiceM_(ma, _, f) {
  return accessServiceM(_)(t => provideServiceM(_)(f(t))(ma));
}
/**
 * Replaces the service with the required Service Entry
 *
 * @ets_data_first replaceService_
 */

export function replaceService(_, f) {
  return ma => accessServiceM(_)(t => provideServiceM(_)(succeed(f(t)))(ma));
}
/**
 * Replaces the service with the required Service Entry
 */

export function replaceService_(ma, _, f) {
  return accessServiceM(_)(t => provideServiceM(_)(succeed(f(t)))(ma));
}
/**
 * The moral equivalent of `if (p) exp` when `p` has side-effects
 */

export function whenM(b) {
  return unlessM(core.map_(b, b => !b));
}
/**
 * The moral equivalent of `if (p) exp`
 */

export function when(b) {
  return unless(() => !b());
}
/**
 * A more powerful version of `withEarlyRelease` that allows specifying an
 * exit value in the event of early release.
 */

export function withEarlyReleaseExit_(self, exit) {
  return managedApply(T.map_(self.effect, tp => Tp.tuple(tp.get(0), Tp.tuple(T.uninterruptible(tp.get(0)(exit)), tp.get(1)))));
}
/**
 * A more powerful version of `withEarlyRelease` that allows specifying an
 * exit value in the event of early release.
 *
 * @ets_data_first withEarlyReleaseExit_
 */

export function withEarlyReleaseExit(exit) {
  return self => withEarlyReleaseExit_(self, exit);
}
/**
 * Returns an effect that succeeds with the `Fiber.Id` of the caller.
 */

export const fiberId = /*#__PURE__*/fromEffect(T.fiberId);
/**
 * Modifies this `Managed` to provide a canceler that can be used to eagerly
 * execute the finalizer of this `Managed`. The canceler will run
 * uninterruptibly with an exit value indicating that the effect was
 * interrupted, and if completed will cause the regular finalizer to not run.
 */

export function withEarlyRelease(self) {
  return core.chain_(fiberId, id => withEarlyReleaseExit_(self, Ex.interrupt(id)));
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 */

export function zipLeft_(a, b) {
  return core.zipWith_(a, b, a => a);
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeft_
 */

export function zipLeft(b) {
  return a => zipLeft_(a, b);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 */

export function zipLeftPar_(a, b) {
  return core.zipWithPar_(a, b, a => a);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeftPar_
 */

export function zipLeftPar(b) {
  return a => zipLeftPar_(a, b);
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 */

export function zipRight_(a, b) {
  return core.zipWith_(a, b, (_, a) => a);
}
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRight_
 */

export function zipRight(b) {
  return a => zipRight_(a, b);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 */

export function zipRightPar_(a, b) {
  return core.zipWithPar_(a, b, (_, a) => a);
}
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRightPar_
 */

export function zipRightPar(b) {
  return a => zipRightPar_(a, b);
}
/**
 * Parallely zips this effects
 */

export function zipPar_(a, b) {
  return core.zipWithPar_(a, b, (a, b) => [a, b]);
}
/**
 * Parallely zips this effects
 *
 * @ets_data_first zipPar_
 */

export function zipPar(b) {
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

export function create(effect) {
  return managedApply(effect);
}
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true, and the given E as error otherwise
 */

export function cond_(pred, result, error) {
  return pred ? succeed(result()) : core.fail(error());
}
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true, and the given E as error otherwise
 *
 * @ets_data_first cond_
 */

export function cond(result, error) {
  return pred => cond_(pred, result, error);
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEachUnit_`.
 */

export function forEachUnitPar_(as, f, __trace) {
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

export function forEachUnitPar(f, __trace) {
  return as => forEachUnitPar_(as, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEachUnit_`.
 */

export function forEachUnitParN_(as, n, f, __trace) {
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

export function forEachUnitParN(n, f) {
  return as => forEachUnitParN_(as, n, f);
}
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @ets_data_first collect_
 */

export function collect(f) {
  return self => collect_(self, f);
}
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 */

export function collect_(self, f) {
  return core.map_(forEach.forEach_(self, a => optional(f(a))), Chunk.compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * @ets_data_first collectPar_
 */

export function collectPar(f) {
  return self => collectPar_(self, f);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 */

export function collectPar_(self, f) {
  return core.map_(forEach.forEachPar_(self, a => optional(f(a))), Chunk.compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 */

export function collectParN_(self, n, f) {
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

export function collectParN(n, f) {
  return self => collectParN_(self, n, f);
}
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */

export function collectAll(as, __trace) {
  return forEach.forEach_(as, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 */

export function collectAllPar(as, __trace) {
  return forEach.forEachPar_(as, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllParN_
 */

export function collectAllParN(n, __trace) {
  return as => forEach.forEachParN_(as, n, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 */

export function collectAllParN_(as, n, __trace) {
  return forEach.forEachParN_(as, n, identity, __trace);
}
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */

export function collectAllUnit(as, __trace) {
  return forEach.forEachUnit_(as, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 */

export function collectAllUnitPar(as, __trace) {
  return forEachUnitPar_(as, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllUnitParN_
 */

export function collectAllUnitParN(n, __trace) {
  return as => forEachUnitParN_(as, n, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 */

export function collectAllUnitParN_(as, n, __trace) {
  return forEachUnitParN_(as, n, identity, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */

export function collectAllWith_(as, pf, __trace) {
  return core.map_(collectAll(as, __trace), Chunk.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */

export function collectAllWith(pf, __trace) {
  return as => collectAllWith_(as, pf, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */

export function collectAllWithPar_(as, pf, __trace) {
  return core.map_(collectAllPar(as, __trace), Chunk.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWithPar_
 */

export function collectAllWithPar(pf, __trace) {
  return as => collectAllWithPar_(as, pf, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * Unlike `collectAllWithPar`, this method will use at most up to `n` fibers.
 */

export function collectAllWithParN_(as, n, pf, __trace) {
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

export function collectAllWithParN(n, pf, __trace) {
  return as => collectAllWithParN_(as, n, pf, __trace);
}
/**
 * Evaluate and run each effect in the structure and collect discarding failed ones.
 */

export function collectAllSuccesses(as, __trace) {
  return collectAllWith_(I.map_(as, x => result(x)), e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 */

export function collectAllSuccessesPar(as, __trace) {
  return collectAllWithPar_(I.map_(as, x => result(x)), e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectAllSuccessesParN_
 */

export function collectAllSuccessesParN(n, __trace) {
  return as => collectAllSuccessesParN_(as, n, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 */

export function collectAllSuccessesParN_(as, n, __trace) {
  return collectAllWithParN_(I.map_(as, x => result(x)), n, e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Creates an effect that only executes the provided function as its
 * release action.
 */

export function finalizerExit(f, __trace) {
  return makeExit_(T.unit, (_, e) => f(e), __trace);
}
/**
 * Creates an effect that only executes the provided finalizer as its
 * release action.
 */

export function finalizer(f, __trace) {
  return finalizerExit(() => f, __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */

export function reduce_(i, zero, f, __trace) {
  return suspend(() => A.reduce_(Array.from(i), succeed(zero), (acc, el) => core.chain_(acc, a => f(a, el))), __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduce_
 */

export function reduce(zero, f, __trace) {
  return i => reduce_(i, zero, f, __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */

export function reduceRight_(i, zero, f, __trace) {
  return suspend(() => A.reduceRight_(Array.from(i), succeed(zero), (el, acc) => core.chain_(acc, a => f(el, a))), __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduceRight_
 */

export function reduceRight(zero, f) {
  return i => reduceRight_(i, zero, f);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 */

export function reduceAll_(as, f) {
  return A.reduce_(NA.tail(as), NA.head(as), (acc, a) => core.zipWith_(acc, a, f));
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 *
 * @ets_data_first reduceAll_
 */

export function reduceAll(f) {
  return as => reduceAll_(as, f);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 */

export function reduceAllPar_(as, f) {
  return core.mapM_(core.makeManagedReleaseMap(T.parallel), parallelReleaseMap => T.provideSome_(T.reduceAllPar_(NA.map_(as, _ => T.map_(_.effect, _ => _.get(1))), f), r => Tp.tuple(r, parallelReleaseMap)));
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 *
 * @ets_data_first reduceAllPar_
 */

export function reduceAllPar(f) {
  return as => reduceAllPar_(as, f);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 */

export function reduceAllParN_(as, n, f) {
  return core.mapM_(core.makeManagedReleaseMap(T.parallel), parallelReleaseMap => T.provideSome_(T.reduceAllParN_(NA.map_(as, _ => T.map_(_.effect, _ => _.get(1))), n, f), r => Tp.tuple(r, parallelReleaseMap)));
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 *
 * @ets_data_first reduceAllParN_
 */

export function reduceAllParN(n, f) {
  return as => reduceAllParN_(as, n, f);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 *
 * @ets_data_first mergeAll_
 */

export function mergeAll(zero, f) {
  return as => mergeAll_(as, zero, f);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 */

export function mergeAll_(as, zero, f) {
  return I.reduce_(as, succeed(zero), (b, a) => core.zipWith_(b, a, f));
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

export function mergeAllPar(zero, f) {
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

export function mergeAllPar_(as, zero, f) {
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

export function mergeAllParN(n, zero, f) {
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

export function mergeAllParN_(as, n, zero, f) {
  return core.mapM_(core.makeManagedReleaseMap(T.parallel), parallelReleaseMap => T.provideSome_(T.mergeAllParN_(I.map_(as, _ => T.map_(_.effect, _ => _.get(1))), n, zero, f), r => Tp.tuple(r, parallelReleaseMap)));
}
/**
 * Creates a scope in which resources can be safely allocated into together with a release action.
 */

export const scope = /*#__PURE__*/core.map_(releaseMap, finalizers => ma => T.chain_(T.environment(), r => T.provideAll_(ma.effect, Tp.tuple(r, finalizers))));
/**
 * Locally installs a supervisor and an effect that succeeds with all the
 * children that have been forked in the returned effect.
 */

export function withChildren(get) {
  return unwrap(T.map_(track, supervisor => managedApply(T.supervised_(get(T.chain_(supervisor.value, children => T.map_(T.descriptor, d => SS.filter_(children, _ => _.id !== d.id)))).effect, supervisor))));
}
/**
 * Unwraps a `Managed` that is inside an `Effect`.
 */

export function unwrap(fa) {
  return flatten(fromEffect(fa));
}
/**
 * Creates a `Managed` from an `AutoCloseable` resource. The resource's `close`
 * method will be used as the release action.
 */

export function fromAutoClosable(fa) {
  return core.make_(fa, a => T.succeedWith(() => a.close()));
}
/**
 * Creates a `Managed` from an `AutoCloseable` resource. The resource's `close`
 * method will be used as the release action.
 */

export function fromAutoClosableM(fa) {
  return core.make_(fa, a => a.close);
}
/**
 * Returns an effect that is interrupted as if by the fiber calling this
 * method.
 */

export const interrupt = /*#__PURE__*/core.chain_( /*#__PURE__*/fromEffect(T.descriptor), d => interruptAs(d.id));
/**
 * Returns an effect that is interrupted as if by the specified fiber.
 */

export function interruptAs(id) {
  return halt(C.interrupt(id));
}
/**
 * Low level expose internal trace pusher
 */

export function exposeTracer(f) {
  return managedApply(new ITracer(tracer => f(tracer).effect));
}
//# sourceMappingURL=api.mjs.map