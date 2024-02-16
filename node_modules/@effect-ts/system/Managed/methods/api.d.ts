import type { Cause } from "../../Cause/index.js";
import * as C from "../../Cause/index.js";
import type { HasClock } from "../../Clock/index.js";
import * as Chunk from "../../Collections/Immutable/Chunk/index.js";
import * as NA from "../../Collections/Immutable/NonEmptyArray/index.js";
import * as SS from "../../Collections/Immutable/SortedSet/index.js";
import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Effect } from "../../Effect/index.js";
import * as T from "../../Effect/index.js";
import * as E from "../../Either/index.js";
import * as Ex from "../../Exit/index.js";
import type { FiberID } from "../../Fiber/index.js";
import * as F from "../../Fiber/index.js";
import { NoSuchElementException } from "../../GlobalExceptions/index.js";
import type { Has, Tag } from "../../Has/index.js";
import * as L from "../../Layer/index.js";
import type { Option } from "../../Option/index.js";
import * as O from "../../Option/index.js";
import type { Schedule } from "../../Schedule/index.js";
import type { UnionToIntersection } from "../../Utils/index.js";
import type { IO, Managed, RIO, UIO } from "../managed.js";
import type * as RM from "../ReleaseMap/index.js";
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 *
 * @ets_data_first absorb_
 */
export declare function absorb<E>(f: (e: E) => unknown, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R, unknown, A>;
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */
export declare function absorb_<R, A, E>(self: Managed<R, E, A>, f: (e: E) => unknown, __trace?: string): Managed<R, unknown, A>;
/**
 * Unwraps the optional success of this effect, but can fail with None value.
 */
export declare function get<R, A>(self: Managed<R, never, O.Option<A>>, __trace?: string): Managed<R, Option<never>, A>;
/**
 * Returns an effect whose failure is mapped by the specified `f` function.
 */
export declare function mapError_<R, A, E, E2>(self: Managed<R, E, A>, f: (e: E) => E2, __trace?: string): Managed<R, E2, A>;
/**
 * Returns an effect whose failure is mapped by the specified `f` function.
 *
 * @ets_data_first mapError_
 */
export declare function mapError<E, E2>(f: (e: E) => E2, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R, E2, A>;
/**
 * Returns an effect whose full failure is mapped by the specified `f` function.
 */
export declare function mapErrorCause_<R, A, E, E2>(self: Managed<R, E, A>, f: (e: C.Cause<E>) => C.Cause<E2>, __trace?: string): Managed<R, E2, A>;
/**
 * Returns an effect whose full failure is mapped by the specified `f` function.
 *
 * @ets_data_first mapErrorCause_
 */
export declare function mapErrorCause<E, E2>(f: (e: C.Cause<E>) => C.Cause<E2>, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R, E2, A>;
/**
 * Returns a memoized version of the specified managed.
 */
export declare function memoize<R, E, A>(self: Managed<R, E, A>, __trace?: string): UIO<Managed<R, E, A>>;
/**
 * Returns a new effect where the error channel has been merged into the
 * success channel to their common combined type.
 */
export declare function merge<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, never, E | A>;
/**
 * Returns the managed resulting from mapping the success of this managed to unit.
 */
export declare const unit: Managed<unknown, never, void>;
/**
 * Requires the option produced by this value to be `None`.
 */
export declare function none<R, E, A>(self: Managed<R, E, O.Option<A>>, __trace?: string): Managed<R, O.Option<E>, void>;
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 */
export declare function fold_<R, E, A, B, C>(self: Managed<R, E, A>, onFail: (e: E) => B, onSuccess: (a: A) => C, __trace?: string): Managed<R, never, B | C>;
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 *
 * @ets_data_first fold_
 */
export declare function fold<E, A, B, C>(onFail: (e: E) => B, onSuccess: (a: A) => C, __trace?: string): <R>(self: Managed<R, E, A>) => Managed<R, never, B | C>;
/**
 * Executes this effect, skipping the error but returning optionally the success.
 */
export declare function option<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, never, O.Option<A>>;
/**
 * Converts an option on errors into an option on values.
 */
export declare function optional<R, E, A>(self: Managed<R, O.Option<E>, A>, __trace?: string): Managed<R, E, O.Option<A>>;
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first orDieWith_
 */
export declare function orDieWith<E>(f: (e: E) => unknown, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R, never, A>;
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `Throwable`.
 */
export declare function orDieWith_<R, E, A>(self: Managed<R, E, A>, f: (e: E) => unknown, __trace?: string): Managed<R, never, A>;
/**
 * Translates effect failure into death of the fiber, making all failures unchecked and
 * not a part of the type of the effect.
 */
export declare function orDie<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, never, A>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 *
 * @ets_data_first orElse_
 */
export declare function orElse<R2, E2, A2>(that: () => Managed<R2, E2, A2>, __trace?: string): <R, E, A>(self: Managed<R, E, A>) => Managed<R & R2, E2, A2 | A>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 */
export declare function orElse_<R, E, A, R2, E2, A2>(self: Managed<R, E, A>, that: () => Managed<R2, E2, A2>, __trace?: string): Managed<R & R2, E2, A | A2>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 *
 * @ets_data_first orElseFail_
 */
export declare function orElseFail<E2>(e: E2, __trace?: string): <R, E, A>(self: Managed<R, E, A>) => Managed<R, E2, A>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 */
export declare function orElseFail_<R, E, A, E2>(self: Managed<R, E, A>, e: E2, __trace?: string): Managed<R, E2, A>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 *
 * @ets_data_first orElseEither_
 */
export declare function orElseEither<R2, E2, A2>(that: () => Managed<R2, E2, A2>, __trace?: string): <R, E, A>(self: Managed<R, E, A>) => Managed<R & R2, E2, E.Either<A2, A>>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 */
export declare function orElseEither_<R, E, A, R2, E2, A2>(self: Managed<R, E, A>, that: () => Managed<R2, E2, A2>, __trace?: string): Managed<R & R2, E2, E.Either<A2, A>>;
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 */
export declare function orElseOptional_<R, E, A, R2, E2, A2>(self: Managed<R, O.Option<E>, A>, that: () => Managed<R2, O.Option<E2>, A2>, __trace?: string): Managed<R & R2, O.Option<E | E2>, A | A2>;
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 *
 * @ets_data_first orElseOptional_
 */
export declare function orElseOptional<R2, E2, A2>(that: () => Managed<R2, O.Option<E2>, A2>, __trace?: string): <R, E, A>(self: Managed<R, Option<E>, A>) => Managed<R & R2, Option<E2 | E>, A2 | A>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 */
export declare function orElseSucceed_<R, E, A, A2>(self: Managed<R, O.Option<E>, A>, that: () => A2, __trace?: string): Managed<R, O.Option<E>, A | A2>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 *
 * @ets_data_first orElseSucceed_
 */
export declare function orElseSucceed<R, E, A, A2>(that: () => A2, __trace?: string): (self: Managed<R, O.Option<E>, A>) => Managed<R, Option<E>, A | A2>;
/**
 * Recovers from all errors.
 */
export declare function catchAll_<R, E, A, R2, E2, A2>(self: Managed<R, E, A>, f: (e: E) => Managed<R2, E2, A2>, __trace?: string): Managed<R & R2, E2, A | A2>;
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */
export declare function catchAll<E, R2, E2, A2>(f: (e: E) => Managed<R2, E2, A2>, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R & R2, E2, A2 | A>;
/**
 * Recovers from all errors with provided Cause.
 */
export declare function catchAllCause_<R, E, A, R2, E2, A2>(self: Managed<R, E, A>, f: (e: C.Cause<E>) => Managed<R2, E2, A2>, __trace?: string): Managed<R & R2, E2, A | A2>;
/**
 * Recovers from all errors with provided Cause.
 *
 * @ets_data_first catchAllCause_
 */
export declare function catchAllCause<E, R2, E2, A2>(f: (e: C.Cause<E>) => Managed<R2, E2, A2>, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R & R2, E2, A2 | A>;
/**
 * Recovers from some or all of the error cases.
 */
export declare function catchSome_<R, E, A, R2, E2, A2>(self: Managed<R, E, A>, pf: (e: E) => O.Option<Managed<R2, E2, A2>>, __trace?: string): Managed<R & R2, E | E2, A | A2>;
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSome_
 */
export declare function catchSome<E, R2, E2, A2>(pf: (e: E) => O.Option<Managed<R2, E2, A2>>, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R & R2, E | E2, A2 | A>;
/**
 * Recovers from some or all of the error cases.
 */
export declare function catchSomeCause_<R, E, A, R2, E2, A2>(self: Managed<R, E, A>, pf: (e: C.Cause<E>) => O.Option<Managed<R2, E2, A2>>, __trace?: string): Managed<R & R2, E | E2, A | A2>;
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSomeCause_
 */
export declare function catchSomeCause<R, E, A, R2, E2, A2>(pf: (e: C.Cause<E>) => O.Option<Managed<R2, E2, A2>>, __trace?: string): (self: Managed<R, E, A>) => Managed<R & R2, E | E2, A | A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */
export declare function continueOrFailM_<R, E, A, E1, R1, E2, B>(self: Managed<R, E, A>, e: () => E1, pf: (a: A) => O.Option<Managed<R1, E2, B>>, __trace?: string): Managed<R & R1, E | E1 | E2, B>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailM_
 */
export declare function continueOrFailM<A, E1, R1, E2, B>(e: () => E1, pf: (a: A) => O.Option<Managed<R1, E2, B>>, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R & R1, E1 | E2 | E, B>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */
export declare function continueOrFail_<R, E, A, E1, B>(self: Managed<R, E, A>, e: () => E1, pf: (a: A) => O.Option<B>, __trace?: string): Managed<R, E | E1, B>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFail_
 */
export declare function continueOrFail<A, E1, B>(e: () => E1, pf: (a: A) => O.Option<B>, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R, E1 | E, B>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */
export declare function provide<R>(r: R, __trace?: string): <E, A, R0>(next: Managed<R & R0, E, A>) => Managed<R0, E, A>;
/**
 * Executes the second effect and then provides its output as an environment to this effect
 *
 * @ets_data_first compose_
 */
export declare function compose<A, E2, B>(that: Managed<A, E2, B>, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R, E2 | E, B>;
/**
 * Executes the second effect and then provides its output as an environment to this effect
 */
export declare function compose_<R, E, A, E2, B>(self: Managed<R, E, A>, that: Managed<A, E2, B>, __trace?: string): Managed<R, E | E2, B>;
/**
 * Returns an effect whose failure and success have been lifted into an
 * `Either`. The resulting effect cannot fail
 */
export declare function either<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, never, E.Either<E, A>>;
/**
 * Returns a Managed that ignores errors raised by the acquire effect and
 * runs it repeatedly until it eventually succeeds.
 */
export declare function eventually<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, never, A>;
/**
 * Zips this effect with its environment
 */
export declare function first<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, E, [A, R]>;
/**
 * Effectfully map the error channel
 */
export declare function chainError_<R, E, A, R2, E2>(self: Managed<R, E, A>, f: (e: E) => RIO<R2, E2>, __trace?: string): Managed<R & R2, E2, A>;
/**
 * Effectfully map the error channel
 *
 * @ets_data_first chainError_
 */
export declare function chainError<E, R2, E2>(f: (e: E) => RIO<R2, E2>, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R & R2, E2, A>;
/**
 * Flip the error and result
 */
export declare function flip<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, A, E>;
/**
 * Flip the error and result, then apply an effectful function to the effect
 */
export declare function flipWith_<R, E, A, R2, E1, A1>(self: Managed<R, E, A>, f: (_: Managed<R, A, E>) => Managed<R2, A1, E1>, __trace?: string): Managed<R2, E1, A1>;
/**
 * Flip the error and result, then apply an effectful function to the effect
 *
 * @ets_data_first flipWith_
 */
export declare function flipWith<R, E, A, R2, E1, A1>(f: (_: Managed<R, A, E>) => Managed<R2, A1, E1>, __trace?: string): (self: Managed<R, E, A>) => Managed<R2, E1, A1>;
/**
 * Returns an effect that performs the outer effect first, followed by the
 * inner effect, yielding the value of the inner effect.
 *
 * This method can be used to "flatten" nested effects.
 */
export declare function flatten<R2, E2, R, E, A>(self: Managed<R2, E2, Managed<R, E, A>>, __trace?: string): Managed<R2 & R, E2 | E, A>;
/**
 * Returns an effect that performs the outer effect first, followed by the
 * inner effect, yielding the value of the inner effect.
 *
 * This method can be used to "flatten" nested effects.
 */
export declare function flattenM<R2, E2, R, E, A>(self: Managed<R2, E2, T.Effect<R, E, A>>, __trace?: string): Managed<R2 & R, E2 | E, A>;
/**
 * A more powerful version of `fold` that allows recovering from any kind of failure except interruptions.
 */
export declare function foldCause_<R, E, A, B, C>(self: Managed<R, E, A>, f: (e: C.Cause<E>) => B, g: (a: A) => C, __trace?: string): Managed<R, never, B | C>;
/**
 * A more powerful version of `fold` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCause_
 */
export declare function foldCause<E, A, B, C>(f: (e: C.Cause<E>) => B, g: (a: A) => C, __trace?: string): <R>(self: Managed<R, E, A>) => Managed<R, never, B | C>;
/**
 * Returns a new effect that ignores the success or failure of this effect.
 */
export declare function ignore<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, never, void>;
/**
 * Returns whether this managed effect is a failure.
 */
export declare function isFailure<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, never, boolean>;
/**
 * Returns whether this managed effect is a success.
 */
export declare function isSuccess<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, never, boolean>;
/**
 * Depending on the environment execute this or the other effect
 *
 * @ets_data_first join_
 */
export declare function join<R1, E1, A1>(that: Managed<R1, E1, A1>, __trace?: string): <R, E, A>(self: Managed<R, E, A>) => Managed<E.Either<R, R1>, E1 | E, A1 | A>;
/**
 * Depending on the environment execute this or the other effect
 */
export declare function join_<R, E, A, R1, E1, A1>(self: Managed<R, E, A>, that: Managed<R1, E1, A1>, __trace?: string): Managed<E.Either<R, R1>, E | E1, A | A1>;
/**
 * Depending on provided environment returns either this one or the other effect.
 *
 * @ets_data_first joinEither_
 */
export declare function joinEither<R2, E2, A2>(that: Managed<R2, E2, A2>, __trace?: string): <R, E, A>(self: Managed<R, E, A>) => Managed<E.Either<R, R2>, E2 | E, E.Either<A, A2>>;
/**
 * Depending on provided environment returns either this one or the other effect.
 */
export declare function joinEither_<R, E, A, R2, E2, A2>(self: Managed<R, E, A>, that: Managed<R2, E2, A2>, __trace?: string): Managed<E.Either<R, R2>, E | E2, E.Either<A, A2>>;
/**
 * Join self selectively with C
 */
export declare function identityLeft<C>(__trace?: string): <R, E, A>(self: Managed<R, E, A>) => Managed<E.Either<R, C>, E, E.Either<A, C>>;
/**
 * Lifts a synchronous side-effect into a `Managed[R, E, A]`,
 * translating any thrown exceptions into typed failed effects using onThrow.
 */
export declare function tryCatch<E, A>(f: () => A, onThrow: (u: unknown) => E, __trace?: string): Managed<unknown, E, A>;
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @ets_data_first mapTryCatch_
 */
export declare function mapTryCatch<E2, A, B>(onThrow: (u: unknown) => E2, f: (a: A) => B, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R, E2 | E, B>;
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 */
export declare function mapTryCatch_<R, E, E2, A, B>(self: Managed<R, E, A>, onThrow: (u: unknown) => E2, f: (a: A) => B, __trace?: string): Managed<R, E | E2, B>;
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 */
export declare function mapEffect_<R, E, A, B>(self: Managed<R, E, A>, f: (a: A) => B, __trace?: string): Managed<R, unknown, B>;
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @ets_data_first mapEffect_
 */
export declare function mapEffect<A, B>(f: (a: A) => B, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R, unknown, B>;
/**
 * Preallocates the managed resource, resulting in a Managed that reserves
 * and acquires immediately and cannot fail. You should take care that you
 * are not interrupted between running preallocate and actually acquiring
 * the resource as you might leak otherwise.
 */
export declare function preallocate<R, E, A>(self: Managed<R, E, A>, __trace?: string): T.Effect<R, E, UIO<A>>;
/**
 * Preallocates the managed resource inside an outer managed, resulting in a
 * Managed that reserves and acquires immediately and cannot fail.
 */
export declare function preallocateManaged<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, E, UIO<A>>;
/**
 * Provides a layer to the `Managed`, which translates it to another level.
 *
 * @ets_data_first provideLayer_
 */
export declare function provideLayer<R2, E2, R>(layer: L.Layer<R2, E2, R>, __trace?: string): <E, A>(self: Managed<R, E, A>) => Managed<R2, E2 | E, A>;
/**
 * Provides a layer to the `Managed`, which translates it to another level.
 */
export declare function provideLayer_<R, E, A, R2, E2>(self: Managed<R, E, A>, layer: L.Layer<R2, E2, R>, __trace?: string): Managed<R2, E | E2, A>;
/**
 * Splits the environment into two parts, providing one part using the
 * specified layer and leaving the remainder `R0`.
 */
export declare function provideSomeLayer<R2, E2, R>(layer: L.Layer<R2, E2, R>, __trace?: string): <R0, E, A>(self: Managed<R & R0, E, A>) => Managed<R0 & R2, E2 | E, A>;
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first refineOrDieWith_
 */
export declare function refineOrDieWith<E, E1>(pf: (e: E) => O.Option<E1>, f: (e: E) => unknown, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R, E1, A>;
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 */
export declare function refineOrDieWith_<R, A, E, E1>(self: Managed<R, E, A>, pf: (e: E) => O.Option<E1>, f: (e: E) => unknown, __trace?: string): Managed<R, E1, A>;
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 * @ets_data_first refineOrDie_
 */
export declare function refineOrDie<E, E1>(pf: (e: E) => O.Option<E1>, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R, E1, A>;
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */
export declare function refineOrDie_<R, A, E, E1>(self: Managed<R, E, A>, pf: (e: E) => O.Option<E1>, __trace?: string): Managed<R, E1, A>;
/**
 * Returns a managed that dies with the specified `unknown`. This method
 * can be used for terminating a fiber because a defect has been
 * detected in the code.
 */
export declare function die(e: unknown, __trace?: string): Managed<unknown, never, never>;
/**
 * Returns a managed that dies with the specified `unknown`. This method
 * can be used for terminating a fiber because a defect has been
 * detected in the code.
 */
export declare function dieWith(e: () => unknown, __trace?: string): Managed<unknown, never, never>;
/**
 * Returns an effect that dies with a [[java.lang.RuntimeException]] having the
 * specified text message. This method can be used for terminating a fiber
 * because a defect has been detected in the code.
 */
export declare function dieMessage(message: string, __trace?: string): Managed<unknown, never, never>;
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 *
 * @ets_data_first rejectM_
 */
export declare function rejectM<A, R1, E1>(pf: (a: A) => O.Option<Managed<R1, E1, E1>>, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R & R1, E1 | E, A>;
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 */
export declare function rejectM_<R, E, A, R1, E1>(self: Managed<R, E, A>, pf: (a: A) => O.Option<Managed<R1, E1, E1>>, __trace?: string): Managed<R & R1, E | E1, A>;
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 *
 * @ets_data_first reject_
 */
export declare function reject<A, E1>(pf: (a: A) => O.Option<E1>, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R, E1 | E, A>;
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 */
export declare function reject_<R, E, A, E1>(self: Managed<R, E, A>, pf: (a: A) => O.Option<E1>, __trace?: string): Managed<R, E | E1, A>;
/**
 * Runs all the finalizers associated with this scope. This is useful to
 * conceptually "close" a scope when composing multiple managed effects.
 * Note that this is only safe if the result of this managed effect is valid
 * outside its scope.
 */
export declare function release<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, E, A>;
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 */
export declare function retryOrElseEither_<R, E, A, R1, O, R2, E2, A2>(self: Managed<R, E, A>, policy: Schedule<R1, E, O>, orElse: (e: E, o: O) => Managed<R2, E2, A2>, __trace?: string): Managed<R & R1 & R2 & HasClock, E2, E.Either<A2, A>>;
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 *
 * @ets_data_first retryOrElseEither_
 */
export declare function retryOrElseEither<E, R1, O, R2, E2, A2>(policy: Schedule<R1, E, O>, orElse: (e: E, o: O) => Managed<R2, E2, A2>, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R & R1 & R2 & HasClock, E2, E.Either<A2, A>>;
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 */
export declare function retryOrElse_<R, E, A, R1, O, R2, E2, A2>(self: Managed<R, E, A>, policy: Schedule<R1, E, O>, orElse: (e: E, o: O) => Managed<R2, E2, A2>, __trace?: string): Managed<R & R1 & R2 & HasClock, E2, A | A2>;
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @ets_data_first retryOrElse_
 */
export declare function retryOrElse<E, R1, O, R2, E2, A2>(policy: Schedule<R1, E, O>, orElse: (e: E, o: O) => Managed<R2, E2, A2>, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R & R1 & R2 & HasClock, E2, A2 | A>;
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 */
export declare function retry_<R, E, A, R1, O>(self: Managed<R, E, A>, policy: Schedule<R1, E, O>, __trace?: string): Managed<R & R1 & HasClock, E, A>;
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 *
 * @ets_data_first retry_
 */
export declare function retry<R1, E, O>(policy: Schedule<R1, E, O>, __trace?: string): <R, A>(self: Managed<R, E, A>) => Managed<R & R1 & HasClock, E, A>;
/**
 * Returns an effect that semantically runs the effect on a fiber,
 * producing an `Exit` for the completion value of the fiber.
 */
export declare function result<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, never, Ex.Exit<E, A>>;
/**
 * Exposes the full cause of failure of this effect.
 */
export declare function sandbox<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, Cause<E>, A>;
/**
 * The inverse operation to `sandbox`. Submerges the full cause of failure.
 */
export declare function unsandbox<R, E, A>(self: Managed<R, C.Cause<E>, A>): Managed<R, E, A>;
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 *
 * @ets_data_first sandboxWith_
 */
export declare function sandboxWith<R, E, A, R2, E2, B>(f: (_: Managed<R, C.Cause<E>, A>) => Managed<R2, C.Cause<E2>, B>): (self: Managed<R, E, A>) => Managed<R2, E2, B>;
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 */
export declare function sandboxWith_<R, E, A, R2, E2, B>(self: Managed<R, E, A>, f: (_: Managed<R, C.Cause<E>, A>) => Managed<R2, C.Cause<E2>, B>): Managed<R2, E2, B>;
/**
 * Zips this effect with its environment
 */
export declare function second<R, E, A>(self: Managed<R, E, A>): Managed<R, E, [R, A]>;
/**
 * Converts an option on values into an option on errors.
 */
export declare function some<R, E, A>(self: Managed<R, E, O.Option<A>>): Managed<R, O.Option<E>, A>;
/**
 * Extracts the optional value, or returns the given 'orElse'.
 *
 * @ets_data_first someOrElse_
 */
export declare function someOrElse<B>(orElse: () => B): <R, E, A>(self: Managed<R, E, Option<A>>) => Managed<R, E, B | A>;
/**
 * Extracts the optional value, or returns the given 'orElse'.
 */
export declare function someOrElse_<R, E, A, B>(self: Managed<R, E, O.Option<A>>, orElse: () => B): Managed<R, E, A | B>;
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 *
 * @ets_data_first someOrElseM_
 */
export declare function someOrElseM<R1, E1, B>(orElse: Managed<R1, E1, B>): <R, E, A>(self: Managed<R, E, Option<A>>) => Managed<R & R1, E1 | E, B | A>;
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 */
export declare function someOrElseM_<R, E, A, R1, E1, B>(self: Managed<R, E, O.Option<A>>, orElse: Managed<R1, E1, B>): Managed<R & R1, E | E1, A | B>;
/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @ets_data_first someOrFail_
 */
export declare function someOrFail<E1>(e: () => E1): <R, E, A>(self: Managed<R, E, Option<A>>) => Managed<R, E1 | E, A>;
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */
export declare function someOrFail_<R, E, A, E1>(self: Managed<R, E, O.Option<A>>, e: () => E1): Managed<R, E | E1, A>;
/**
 * Extracts the optional value, or fails with a `NoSuchElementException`
 */
export declare function someOrFailException<R, E, A>(self: Managed<R, E, O.Option<A>>): Managed<R, E | NoSuchElementException, A>;
/**
 * Returns an effect that effectfully peeks at the failure or success of the acquired resource.
 */
export declare function tapBoth_<R, E, A, R1, E1, R2, E2, X, Y>(self: Managed<R, E, A>, f: (e: E) => Managed<R1, E1, X>, g: (a: A) => Managed<R2, E2, Y>): Managed<R & R1 & R2, E | E1 | E2, A>;
/**
 * Returns an effect that effectfully peeks at the failure or success of the acquired resource.
 *
 * @ets_data_first tapBoth_
 */
export declare function tapBoth<E, A, R1, E1, R2, E2, X, Y>(f: (e: E) => Managed<R1, E1, X>, g: (a: A) => Managed<R2, E2, Y>): <R>(self: Managed<R, E, A>) => Managed<R & R1 & R2, E | E1 | E2, A>;
/**
 * Returns an effect that effectually peeks at the cause of the failure of
 * the acquired resource.
 */
export declare function tapCause_<R, E, A, R1, E1, X>(self: Managed<R, E, A>, f: (c: Cause<E>) => Managed<R1, E1, X>): Managed<R & R1, E | E1, A>;
/**
 * Returns an effect that effectually peeks at the cause of the failure of
 * the acquired resource.
 *
 * @ets_data_first tapCause_
 */
export declare function tapCause<E, R1, E1, X>(f: (c: Cause<E>) => Managed<R1, E1, X>): <R, A>(self: Managed<R, E, A>) => Managed<R & R1, E | E1, A>;
/**
 * Returns an effect that effectfully peeks at the failure of the acquired resource.
 */
export declare function tapError_<R, E, A, R1, E1, X>(self: Managed<R, E, A>, f: (e: E) => Managed<R1, E1, X>): Managed<R & R1, E | E1, A>;
/**
 * Returns an effect that effectfully peeks at the failure of the acquired resource.
 *
 * @ets_data_first tapError_
 */
export declare function tapError<E, R1, E1, X>(f: (e: E) => Managed<R1, E1, X>): <R, A>(self: Managed<R, E, A>) => Managed<R & R1, E | E1, A>;
/**
 * Like `tap`, but uses a function that returns a Effect value rather than a
 * Managed value.
 *
 * @ets_data_first tapM_
 */
export declare function tapM<A, R1, E1, X>(f: (a: A) => Effect<R1, E1, X>): <R, E>(self: Managed<R, E, A>) => Managed<R & R1, E1 | E, A>;
/**
 * Like `tap`, but uses a function that returns a Effect value rather than a
 * Managed value.
 */
export declare function tapM_<R, E, A, R1, E1, X>(self: Managed<R, E, A>, f: (a: A) => Effect<R1, E1, X>): Managed<R & R1, E | E1, A>;
/**
 * Returns a new effect that executes this one and times the acquisition of the resource.
 */
export declare function timed<R, E, A>(self: Managed<R, E, A>): Managed<R & HasClock, E, Tp.Tuple<[number, A]>>;
/**
 * Returns an effect that will timeout this resource, returning `None` if the
 * timeout elapses before the resource was reserved and acquired.
 * If the reservation completes successfully (even after the timeout) the release action will be run on a new fiber.
 * `Some` will be returned if acquisition and reservation complete in time
 */
export declare function timeout_<R, E, A>(self: Managed<R, E, A>, d: number): Managed<R & HasClock, E, Option<A>>;
/**
 * Returns an effect that will timeout this resource, returning `None` if the
 * timeout elapses before the resource was reserved and acquired.
 * If the reservation completes successfully (even after the timeout) the release action will be run on a new fiber.
 * `Some` will be returned if acquisition and reservation complete in time
 *
 * @ets_data_first timeout_
 */
export declare function timeout(d: number): <R, E, A>(self: Managed<R, E, A>) => Managed<R & HasClock, E, Option<A>>;
/**
 * Constructs a layer from this managed resource.
 *
 * @ets_data_first toLayer_
 */
export declare function toLayer<A>(tag: Tag<A>): <R, E>(self: Managed<R, E, A>) => L.Layer<R, E, Has<A>>;
/**
 * Constructs a layer from this managed resource.
 */
export declare function toLayer_<R, E, A>(self: Managed<R, E, A>, tag: Tag<A>): L.Layer<R, E, Has<A>>;
/**
 * Constructs a layer from this managed resource, which must return one or
 * more services.
 */
export declare function toLayerMany<Tags extends Tag<any>[]>(...tags: Tags): <R, E>(self: Managed<R, E, UnionToIntersection<{ [k in keyof Tags & number]: [Tags[k]] extends [Tag<infer A>] ? Has<A> : never; }[number]>>) => L.Layer<R, E, UnionToIntersection<{ [k_1 in keyof Tags & number]: [Tags[k_1]] extends [Tag<infer A_1>] ? Has<A_1> : never; }[number]>>;
/**
 * Return unit while running the effect
 */
export declare function asUnit<R, E, A>(self: Managed<R, E, A>): Managed<R, E, void>;
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 *
 * @ets_data_first unlessM_
 */
export declare function unlessM<R1, E1>(b: Managed<R1, E1, boolean>): <R, E, A>(self: Managed<R, E, A>) => Managed<R1 & R, E1 | E, void>;
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 */
export declare function unlessM_<R, E, A, R1, E1>(self: Managed<R, E, A>, b: Managed<R1, E1, boolean>): Managed<R1 & R, E1 | E, void>;
/**
 * The moral equivalent of `if (!p) exp`
 *
 * @ets_data_first unless_
 */
export declare function unless(b: () => boolean): <R, E, A>(self: Managed<R, E, A>) => Managed<R, E, void>;
/**
 * The moral equivalent of `if (!p) exp`
 */
export declare function unless_<R, E, A>(self: Managed<R, E, A>, b: () => boolean): Managed<R, E, void>;
/**
 * Maps this effect to the specified constant while preserving the
 * effects of this effect.
 */
export declare function as_<R, E, A, B>(self: Managed<R, E, A>, b: B): Managed<R, E, B>;
/**
 * Maps this effect to the specified constant while preserving the
 * effects of this effect.
 *
 * @ets_data_first as_
 */
export declare function as<B>(b: B): <R, E, A>(self: Managed<R, E, A>) => Managed<R, E, B>;
/**
 * Maps the success value of this effect to an optional value.
 */
export declare function asSome<R, E, A>(self: Managed<R, E, A>): Managed<R, E, Option<A>>;
/**
 * Maps the error value of this effect to an optional value.
 */
export declare function asSomeError<R, E, A>(self: Managed<R, E, A>): Managed<R, Option<E>, A>;
/**
 * Maps the success value of this effect to a service.
 *
 * @ets_data_first asService_
 */
export declare function asService<A>(tag: Tag<A>): <R, E>(self: Managed<R, E, A>) => Managed<R, E, Has<A>>;
/**
 * Maps the success value of this effect to a service.
 */
export declare function asService_<R, E, A>(self: Managed<R, E, A>, tag: Tag<A>): Managed<R, E, Has<A>>;
/**
 * Executes the this effect and then provides its output as an environment to the second effect
 */
export declare function andThen_<R, E, A, E1, B>(self: Managed<R, E, A>, that: Managed<A, E1, B>): Managed<R, E | E1, B>;
/**
 * Executes the this effect and then provides its output as an environment to the second effect
 *
 * @ets_data_first andThen_
 */
export declare function andThen<A, E1, B>(that: Managed<A, E1, B>): <R, E>(self: Managed<R, E, A>) => Managed<R, E1 | E, B>;
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */
export declare function bimap<E, A, E1, A1>(f: (e: E) => E1, g: (a: A) => A1): <R>(self: Managed<R, E, A>) => Managed<R, E1, A1>;
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
export declare function bimap_<R, E, A, E1, A1>(self: Managed<R, E, A>, f: (e: E) => E1, g: (a: A) => A1): Managed<R, E1, A1>;
/**
 * Joins with environment passing self selectively on the right side
 */
export declare function right<C>(): <R, E, A>(self: Managed<R, E, A>) => Managed<E.Either<C, R>, E, E.Either<C, A>>;
/**
 * Joins with environment passing self selectively on the left side
 */
export declare function left<C>(): <R, E, A>(self: Managed<R, E, A>) => Managed<E.Either<R, C>, E, E.Either<A, C>>;
/**
 * Effectfully accesses the environment of the effect.
 */
export declare function access<R0, A>(f: (_: R0) => A, __trace?: string): RIO<R0, A>;
/**
 * Effectfully accesses the environment of the effect.
 */
export declare function accessManaged<R0, R, E, A>(f: (_: R0) => Managed<R, E, A>): Managed<R & R0, E, A>;
/**
 * Effectfully accesses the environment of the effect.
 */
export declare function accessM<R0, R, E, A>(f: (_: R0) => Effect<R, E, A>): Managed<R & R0, E, A>;
/**
 * Access a record of services with the required Service Entries
 */
export declare function accessServicesM<SS extends Record<string, Tag<any>>>(s: SS): <R = unknown, E = never, B = unknown>(f: (a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => Managed<R, E, B>) => Managed<R & UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : unknown; }[keyof SS]>, E, B>;
/**
 * Access a tuple of services with the required Service Entries monadically
 */
export declare function accessServicesTM<SS extends Tag<any>[]>(...s: SS): <R = unknown, E = never, B = unknown>(f: (...a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => Managed<R, E, B>) => Managed<R & UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : never; }[keyof SS & number]>, E, B>;
/**
 * Access a tuple of services with the required Service Entries
 */
export declare function accessServicesT<SS extends Tag<any>[]>(...s: SS): <B = unknown>(f: (...a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => B) => RIO<UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : never; }[keyof SS & number]>, B>;
/**
 * Access a record of services with the required Service Entries
 */
export declare function accessServices<SS extends Record<string, Tag<any>>>(s: SS): <B>(f: (a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => B) => RIO<UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : unknown; }[keyof SS]>, B>;
/**
 * Access a service with the required Service Entry
 */
export declare function accessServiceM<T>(s: Tag<T>): <R, E, B>(f: (a: T) => Managed<R, E, B>) => Managed<R & Has<T>, E, B>;
/**
 * Access a service with the required Service Entry
 */
export declare function accessService<T>(s: Tag<T>): <B>(f: (a: T) => B) => Managed<Has<T>, never, B>;
/**
 * Accesses the specified service in the environment of the effect.
 */
export declare function service<T>(s: Tag<T>): Managed<Has<T>, never, T>;
/**
 * Accesses the specified services in the environment of the effect.
 */
export declare function services<Ts extends readonly Tag<any>[]>(...s: Ts): RIO<UnionToIntersection<{ [k in keyof Ts]: [Ts[k]] extends [Tag<infer T>] ? Has<T> : never; }[number]>, Readonly<{ [k_1 in keyof Ts]: [Ts[k_1]] extends [Tag<infer T_1>] ? T_1 : never; }>>;
/**
 * Provides the service with the required Service Entry
 */
export declare function provideServiceM<T>(_: Tag<T>): <R, E>(f: Managed<R, E, T>) => <R1, E1, A1>(ma: Managed<R1 & Has<T>, E1, A1>) => Managed<R & R1, E | E1, A1>;
/**
 * Provides the service with the required Service Entry
 */
export declare function provideService<T>(_: Tag<T>): (f: T) => <R1, E1, A1>(ma: Managed<R1 & Has<T>, E1, A1>) => Managed<R1, E1, A1>;
/**
 * Replaces the service with the required Service Entry
 *
 * @ets_data_first replaceServiceM_
 */
export declare function replaceServiceM<R, E, T>(_: Tag<T>, f: (_: T) => Managed<R, E, T>): <R1, E1, A1>(ma: Managed<R1 & Has<T>, E1, A1>) => Managed<R & R1 & Has<T>, E | E1, A1>;
/**
 * Replaces the service with the required Service Entry
 */
export declare function replaceServiceM_<R, E, T, R1, E1, A1>(ma: Managed<R1 & Has<T>, E1, A1>, _: Tag<T>, f: (_: T) => Managed<R, E, T>): Managed<R & R1 & Has<T>, E | E1, A1>;
/**
 * Replaces the service with the required Service Entry
 *
 * @ets_data_first replaceService_
 */
export declare function replaceService<T>(_: Tag<T>, f: (_: T) => T): <R1, E1, A1>(ma: Managed<R1 & Has<T>, E1, A1>) => Managed<R1 & Has<T>, E1, A1>;
/**
 * Replaces the service with the required Service Entry
 */
export declare function replaceService_<R1, E1, A1, T>(ma: Managed<R1 & Has<T>, E1, A1>, _: Tag<T>, f: (_: T) => T): Managed<R1 & Has<T>, E1, A1>;
/**
 * The moral equivalent of `if (p) exp` when `p` has side-effects
 */
export declare function whenM<R1, E1>(b: Managed<R1, E1, boolean>): <R, E, A>(self: Managed<R, E, A>) => Managed<R1 & R, E1 | E, void>;
/**
 * The moral equivalent of `if (p) exp`
 */
export declare function when(b: () => boolean): <R, E, A>(self: Managed<R, E, A>) => Managed<R, E, void>;
/**
 * A more powerful version of `withEarlyRelease` that allows specifying an
 * exit value in the event of early release.
 */
export declare function withEarlyReleaseExit_<R, E, A>(self: Managed<R, E, A>, exit: Ex.Exit<E, A>): Managed<R, E, Tp.Tuple<[T.UIO<any>, A]>>;
/**
 * A more powerful version of `withEarlyRelease` that allows specifying an
 * exit value in the event of early release.
 *
 * @ets_data_first withEarlyReleaseExit_
 */
export declare function withEarlyReleaseExit<E, A>(exit: Ex.Exit<E, A>): <R>(self: Managed<R, E, A>) => Managed<R, E, Tp.Tuple<[T.UIO<any>, A]>>;
/**
 * Returns an effect that succeeds with the `Fiber.Id` of the caller.
 */
export declare const fiberId: Managed<unknown, never, FiberID>;
/**
 * Modifies this `Managed` to provide a canceler that can be used to eagerly
 * execute the finalizer of this `Managed`. The canceler will run
 * uninterruptibly with an exit value indicating that the effect was
 * interrupted, and if completed will cause the regular finalizer to not run.
 */
export declare function withEarlyRelease<R, E, A>(self: Managed<R, E, A>): Managed<R, E, Tp.Tuple<[T.UIO<any>, A]>>;
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 */
export declare function zipLeft_<R, E, A, R2, E2, A2>(a: Managed<R, E, A>, b: Managed<R2, E2, A2>): Managed<R & R2, E | E2, A>;
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeft_
 */
export declare function zipLeft<R2, E2, A2>(b: Managed<R2, E2, A2>): <R, E, A>(a: Managed<R, E, A>) => Managed<R & R2, E2 | E, A>;
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 */
export declare function zipLeftPar_<R, E, A, R2, E2, A2>(a: Managed<R, E, A>, b: Managed<R2, E2, A2>): Managed<R & R2, E | E2, A>;
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeftPar_
 */
export declare function zipLeftPar<R2, E2, A2>(b: Managed<R2, E2, A2>): <R, E, A>(a: Managed<R, E, A>) => Managed<R & R2, E2 | E, A>;
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 */
export declare function zipRight_<R, E, A, R2, E2, A2>(a: Managed<R, E, A>, b: Managed<R2, E2, A2>): Managed<R & R2, E | E2, A2>;
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRight_
 */
export declare function zipRight<R2, E2, A2>(b: Managed<R2, E2, A2>): <R, E, A>(a: Managed<R, E, A>) => Managed<R & R2, E2 | E, A2>;
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 */
export declare function zipRightPar_<R, E, A, R2, E2, A2>(a: Managed<R, E, A>, b: Managed<R2, E2, A2>): Managed<R & R2, E | E2, A2>;
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRightPar_
 */
export declare function zipRightPar<R2, E2, A2>(b: Managed<R2, E2, A2>): <R, E, A>(a: Managed<R, E, A>) => Managed<R & R2, E2 | E, A2>;
/**
 * Parallely zips this effects
 */
export declare function zipPar_<R, E, A, R2, E2, A2>(a: Managed<R, E, A>, b: Managed<R2, E2, A2>): Managed<R & R2, E | E2, [A, A2]>;
/**
 * Parallely zips this effects
 *
 * @ets_data_first zipPar_
 */
export declare function zipPar<R2, E2, A2>(b: Managed<R2, E2, A2>): <R, E, A>(a: Managed<R, E, A>) => Managed<R & R2, E2 | E, [A, A2]>;
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
export declare function create<R, E, A>(effect: T.Effect<Tp.Tuple<[R, RM.ReleaseMap]>, E, Tp.Tuple<[RM.Finalizer, A]>>): Managed<R, E, A>;
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true, and the given E as error otherwise
 */
export declare function cond_<E, A>(pred: boolean, result: () => A, error: () => E): IO<E, A>;
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true, and the given E as error otherwise
 *
 * @ets_data_first cond_
 */
export declare function cond<E, A>(result: () => A, error: () => E): (pred: boolean) => IO<E, A>;
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEachUnit_`.
 */
export declare function forEachUnitPar_<R, E, A, B>(as: Iterable<A>, f: (a: A) => Managed<R, E, B>, __trace?: string): Managed<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEachUnit_`.
 *
 * @ets_data_first forEachUnitPar_
 */
export declare function forEachUnitPar<R, E, A, B>(f: (a: A) => Managed<R, E, B>, __trace?: string): (as: Iterable<A>) => Managed<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEachUnit_`.
 */
export declare function forEachUnitParN_<R, E, A, B>(as: Iterable<A>, n: number, f: (a: A) => Managed<R, E, B>, __trace?: string): Managed<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEachUnit_`.
 *
 * @ets_data_first forEachUnitParN_
 */
export declare function forEachUnitParN<R, E, A, B>(n: number, f: (a: A) => Managed<R, E, B>): (as: Iterable<A>) => Managed<R, E, void>;
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @ets_data_first collect_
 */
export declare function collect<A, R, E, B>(f: (a: A) => Managed<R, Option<E>, B>): (self: Iterable<A>) => Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 */
export declare function collect_<A, R, E, B>(self: Iterable<A>, f: (a: A) => Managed<R, Option<E>, B>): Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * @ets_data_first collectPar_
 */
export declare function collectPar<A, R, E, B>(f: (a: A) => Managed<R, Option<E>, B>): (self: Iterable<A>) => Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 */
export declare function collectPar_<A, R, E, B>(self: Iterable<A>, f: (a: A) => Managed<R, Option<E>, B>): Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 */
export declare function collectParN_<A, R, E, B>(self: Iterable<A>, n: number, f: (a: A) => Managed<R, Option<E>, B>): Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectParN_
 */
export declare function collectParN<A, R, E, B>(n: number, f: (a: A) => Managed<R, Option<E>, B>): (self: Iterable<A>) => Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */
export declare function collectAll<R, E, A>(as: Iterable<Managed<R, E, A>>, __trace?: string): Managed<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 */
export declare function collectAllPar<R, E, A>(as: Iterable<Managed<R, E, A>>, __trace?: string): Managed<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllParN_
 */
export declare function collectAllParN(n: number, __trace?: string): <R, E, A>(as: Iterable<Managed<R, E, A>>) => Managed<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 */
export declare function collectAllParN_<R, E, A>(as: Iterable<Managed<R, E, A>>, n: number, __trace?: string): Managed<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */
export declare function collectAllUnit<R, E, A>(as: Iterable<Managed<R, E, A>>, __trace?: string): Managed<R, E, void>;
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 */
export declare function collectAllUnitPar<R, E, A>(as: Iterable<Managed<R, E, A>>, __trace?: string): Managed<R, E, void>;
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllUnitParN_
 */
export declare function collectAllUnitParN(n: number, __trace?: string): <R, E, A>(as: Iterable<Managed<R, E, A>>) => Managed<R, E, void>;
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 */
export declare function collectAllUnitParN_<R, E, A>(as: Iterable<Managed<R, E, A>>, n: number, __trace?: string): Managed<R, E, void>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */
export declare function collectAllWith_<R, E, A, B>(as: Iterable<Managed<R, E, A>>, pf: (a: A) => O.Option<B>, __trace?: string): Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */
export declare function collectAllWith<A, B>(pf: (a: A) => O.Option<B>, __trace?: string): <R, E>(as: Iterable<Managed<R, E, A>>) => Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */
export declare function collectAllWithPar_<R, E, A, B>(as: Iterable<Managed<R, E, A>>, pf: (a: A) => O.Option<B>, __trace?: string): Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWithPar_
 */
export declare function collectAllWithPar<A, B>(pf: (a: A) => O.Option<B>, __trace?: string): <R, E>(as: Iterable<Managed<R, E, A>>) => Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * Unlike `collectAllWithPar`, this method will use at most up to `n` fibers.
 */
export declare function collectAllWithParN_<R, E, A, B>(as: Iterable<Managed<R, E, A>>, n: number, pf: (a: A) => O.Option<B>, __trace?: string): Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * Unlike `collectAllWithPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectAllWithParN_
 */
export declare function collectAllWithParN<A, B>(n: number, pf: (a: A) => O.Option<B>, __trace?: string): <R, E>(as: Iterable<Managed<R, E, A>>) => Managed<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate and run each effect in the structure and collect discarding failed ones.
 */
export declare function collectAllSuccesses<R, E, A>(as: Iterable<Managed<R, E, A>>, __trace?: string): Managed<R, never, Chunk.Chunk<A>>;
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 */
export declare function collectAllSuccessesPar<R, E, A>(as: Iterable<Managed<R, E, A>>, __trace?: string): Managed<R, never, Chunk.Chunk<A>>;
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectAllSuccessesParN_
 */
export declare function collectAllSuccessesParN(n: number, __trace?: string): <R, E, A>(as: Iterable<Managed<R, E, A>>) => Managed<R, never, Chunk.Chunk<A>>;
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 */
export declare function collectAllSuccessesParN_<R, E, A>(as: Iterable<Managed<R, E, A>>, n: number, __trace?: string): Managed<R, never, Chunk.Chunk<A>>;
/**
 * Creates an effect that only executes the provided function as its
 * release action.
 */
export declare function finalizerExit<R, X>(f: (exit: Ex.Exit<any, any>) => T.RIO<R, X>, __trace?: string): RIO<R, void>;
/**
 * Creates an effect that only executes the provided finalizer as its
 * release action.
 */
export declare function finalizer<R, X>(f: T.RIO<R, X>, __trace?: string): RIO<R, void>;
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */
export declare function reduce_<A, Z, R, E>(i: Iterable<A>, zero: Z, f: (z: Z, a: A) => Managed<R, E, Z>, __trace?: string): Managed<R, E, Z>;
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduce_
 */
export declare function reduce<Z, R, E, A>(zero: Z, f: (z: Z, a: A) => Managed<R, E, Z>, __trace?: string): (i: Iterable<A>) => Managed<R, E, Z>;
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */
export declare function reduceRight_<A, Z, R, E>(i: Iterable<A>, zero: Z, f: (a: A, z: Z) => Managed<R, E, Z>, __trace?: string): Managed<R, E, Z>;
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduceRight_
 */
export declare function reduceRight<Z, R, E, A>(zero: Z, f: (a: A, z: Z) => Managed<R, E, Z>): (i: Iterable<A>) => Managed<R, E, Z>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 */
export declare function reduceAll_<R, E, A>(as: NA.NonEmptyArray<Managed<R, E, A>>, f: (acc: A, a: A) => A): Managed<R, E, A>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 *
 * @ets_data_first reduceAll_
 */
export declare function reduceAll<A>(f: (acc: A, a: A) => A): <R, E>(as: NA.NonEmptyArray<Managed<R, E, A>>) => Managed<R, E, A>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 */
export declare function reduceAllPar_<R, E, A>(as: NA.NonEmptyArray<Managed<R, E, A>>, f: (acc: A, a: A) => A): Managed<R, E, A>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 *
 * @ets_data_first reduceAllPar_
 */
export declare function reduceAllPar<A>(f: (acc: A, a: A) => A): <R, E>(as: NA.NonEmptyArray<Managed<R, E, A>>) => Managed<R, E, A>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 */
export declare function reduceAllParN_<R, E, A>(as: NA.NonEmptyArray<Managed<R, E, A>>, n: number, f: (acc: A, a: A) => A): Managed<R, E, A>;
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 *
 * @ets_data_first reduceAllParN_
 */
export declare function reduceAllParN<A>(n: number, f: (acc: A, a: A) => A): <R, E>(as: NA.NonEmptyArray<Managed<R, E, A>>) => Managed<R, E, A>;
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 *
 * @ets_data_first mergeAll_
 */
export declare function mergeAll<A, B>(zero: B, f: (b: B, a: A) => B): <R, E>(as: Iterable<Managed<R, E, A>>) => Managed<R, E, B>;
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 */
export declare function mergeAll_<R, E, A, B>(as: Iterable<Managed<R, E, A>>, zero: B, f: (b: B, a: A) => B): Managed<R, E, B>;
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
export declare function mergeAllPar<A, B>(zero: B, f: (b: B, a: A) => B): <R, E>(as: Iterable<Managed<R, E, A>>) => Managed<R, E, B>;
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
export declare function mergeAllPar_<R, E, A, B>(as: Iterable<Managed<R, E, A>>, zero: B, f: (b: B, a: A) => B): Managed<R, E, B>;
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
export declare function mergeAllParN<A, B>(n: number, zero: B, f: (b: B, a: A) => B): <R, E>(as: Iterable<Managed<R, E, A>>) => Managed<R, E, B>;
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
export declare function mergeAllParN_<R, E, A, B>(as: Iterable<Managed<R, E, A>>, n: number, zero: B, f: (b: B, a: A) => B): Managed<R, E, B>;
/**
 * A scope in which Managed values can be safely allocated. Passing a managed
 * resource to the `apply` method will return an effect that allocates the resource
 * and returns it with an early-release handle.
 */
export interface Scope {
    <R, E, A>(ma: Managed<R, E, A>): T.Effect<R, E, Tp.Tuple<[RM.Finalizer, A]>>;
}
/**
 * Creates a scope in which resources can be safely allocated into together with a release action.
 */
export declare const scope: Managed<unknown, never, Scope>;
/**
 * Locally installs a supervisor and an effect that succeeds with all the
 * children that have been forked in the returned effect.
 */
export declare function withChildren<R, E, A>(get: (io: T.Effect<unknown, never, SS.SortedSet<F.Runtime<any, any>>>) => Managed<R, E, A>): Managed<R, E, A>;
/**
 * Unwraps a `Managed` that is inside an `Effect`.
 */
export declare function unwrap<R, E, A>(fa: T.Effect<R, E, Managed<R, E, A>>): Managed<R, E, A>;
/**
 * Creates a `Managed` from an `AutoCloseable` resource. The resource's `close`
 * method will be used as the release action.
 */
export declare function fromAutoClosable<R, E, A extends {
    readonly close: () => void;
}>(fa: T.Effect<R, E, A>): Managed<R, E, A>;
/**
 * Creates a `Managed` from an `AutoCloseable` resource. The resource's `close`
 * method will be used as the release action.
 */
export declare function fromAutoClosableM<R, E, R1, A extends {
    readonly close: T.Effect<R1, never, any>;
}>(fa: T.Effect<R, E, A>): Managed<R & R1, E, A>;
/**
 * Returns an effect that is interrupted as if by the fiber calling this
 * method.
 */
export declare const interrupt: Managed<unknown, never, never>;
/**
 * Returns an effect that is interrupted as if by the specified fiber.
 */
export declare function interruptAs(id: FiberID): Managed<unknown, never, never>;
/**
 * Low level expose internal trace pusher
 */
export declare function exposeTracer<R, E, A>(f: (tracer: (trace?: string) => void) => Managed<R, E, A>): Managed<R, E, A>;
//# sourceMappingURL=api.d.ts.map