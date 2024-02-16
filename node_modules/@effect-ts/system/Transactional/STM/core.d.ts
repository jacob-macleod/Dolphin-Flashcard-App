import "../../Operator/index.js";
import * as T from "../../Effect/index.js";
import * as E from "../../Either/index.js";
import type { Predicate, Refinement } from "../../Function/index.js";
import { NoSuchElementException } from "../../GlobalExceptions/index.js";
import * as O from "../../Option/index.js";
import * as P from "./_internal/primitives.js";
export { catchAll, catchAll_, chain, chain_, ensuring, ensuring_, fail, failWith, foldM, foldM_, map, map_, provideSome, provideSome_, retry, STM, STMEffect, STMFailException, STMRetryException, succeed, succeedWith, unit, die, dieWith } from "./_internal/primitives.js";
export { _catch as catch };
export declare const MaxFrames = 200;
/**
 * Accesses the environment of the transaction.
 */
export declare function access<R, A>(f: (r: R) => A): P.STM<R, never, A>;
/**
 * Accesses the environment of the transaction to perform a transaction.
 */
export declare function accessM<R0, R, E, A>(f: (r: R0) => P.STM<R, E, A>): P.STM<R & R0, E, A>;
/**
 * Submerges the error case of an `Either` into the `STM`. The inverse
 * operation of `STM.either`.
 */
export declare function absolve<R, E, E1, A>(z: P.STM<R, E, E.Either<E1, A>>): P.STM<R, E | E1, A>;
/**
 * Propagates the given environment to self.
 */
export declare function andThen_<R, E, A, E1, B>(self: P.STM<R, E, A>, that: P.STM<A, E1, B>): P.STM<R, E | E1, B>;
/**
 * Propagates the given environment to self.
 *
 * @ets_data_first andThen_
 */
export declare function andThen<A, E1, B>(that: P.STM<A, E1, B>): <R, E>(self: P.STM<R, E, A>) => P.STM<R, E | E1, B>;
/**
 * Maps the success value of this effect to the specified constant value.
 */
export declare function as_<R, E, A, B>(self: P.STM<R, E, A>, b: B): P.STM<R, E, B>;
/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @ets_data_first as_
 */
export declare function as<A, B>(b: B): <R, E>(self: P.STM<R, E, A>) => P.STM<R, E, B>;
/**
 * Maps the success value of this effect to an optional value.
 */
export declare function asSome<R, E, A>(self: P.STM<R, E, A>): P.STM<R, E, O.Option<A>>;
/**
 * Maps the error value of this effect to an optional value.
 */
export declare function asSomeError<R, E, A>(self: P.STM<R, E, A>): P.STM<R, O.Option<E>, A>;
/**
 * Returns an `STM` effect whose P.failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
export declare function bimap_<R, E, A, E1, B>(self: P.STM<R, E, A>, g: (e: E) => E1, f: (a: A) => B): P.STM<R, E1, B>;
/**
 * Returns an `STM` effect whose P.failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */
export declare function bimap<R, E, A, E1, B>(g: (e: E) => E1, f: (a: A) => B): (self: P.STM<R, E, A>) => P.STM<R, E1, B>;
/**
 * Recovers from specified error.
 *
 * @ets_data_first catch_
 */
declare function _catch<N extends keyof E, K extends E[N] & string, E, R1, E1, A1>(tag: N, k: K, f: (e: Extract<E, {
    [n in N]: K;
}>) => P.STM<R1, E1, A1>, __trace?: string): <R, A>(self: P.STM<R, E, A>) => P.STM<R & R1, E1 | Exclude<E, { [n in N]: K; }>, A1 | A>;
/**
 * Recovers from specified error.
 */
export declare function catch_<N extends keyof E, K extends E[N] & string, E, R, A, R1, E1, A1>(self: P.STM<R, E, A>, tag: N, k: K, f: (e: Extract<E, {
    [n in N]: K;
}>) => P.STM<R1, E1, A1>): P.STM<R & R1, Exclude<E, {
    [n in N]: K;
}> | E1, A | A1>;
/**
 * Recovers from specified error.
 *
 * @ets_data_first catchTag_
 */
export declare function catchTag<K extends E["_tag"] & string, E extends {
    _tag: string;
}, R1, E1, A1>(k: K, f: (e: Extract<E, {
    _tag: K;
}>) => P.STM<R1, E1, A1>, __trace?: string): <R, A>(self: P.STM<R, E, A>) => P.STM<R & R1, E1 | Exclude<E, {
    _tag: K;
}>, A1 | A>;
/**
 * Recovers from specified error.
 */
export declare function catchTag_<K extends E["_tag"] & string, E extends {
    _tag: string;
}, R, A, R1, E1, A1>(self: P.STM<R, E, A>, k: K, f: (e: Extract<E, {
    _tag: K;
}>) => P.STM<R1, E1, A1>): P.STM<R & R1, Exclude<E, {
    _tag: K;
}> | E1, A | A1>;
/**
 * Recovers from some or all of the error cases.
 */
export declare function catchSome_<R, E, A, R1, E1, B>(self: P.STM<R, E, A>, f: (e: E) => O.Option<P.STM<R1, E1, B>>): P.STM<R1 & R, E | E1, A | B>;
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSome_
 */
export declare function catchSome<E, R1, E1, B>(f: (e: E) => O.Option<P.STM<R1, E1, B>>): <R, A>(self: P.STM<R, E, A>) => P.STM<R1 & R, E | E1, A | B>;
/**
 * Simultaneously filters and flatMaps the value produced by this effect.
 * Continues on the effect returned from pf.
 */
export declare function continueOrRetryM_<R, E, A, R2, E2, A2>(fa: P.STM<R, E, A>, pf: (a: A) => O.Option<P.STM<R2, E2, A2>>): P.STM<R2 & R, E | E2, A2>;
/**
 * Simultaneously filters and flatMaps the value produced by this effect.
 * Continues on the effect returned from pf.
 *
 * @ets_data_first continueOrRetryM_
 */
export declare function continueOrRetryM<A, R2, E2, A2>(pf: (a: A) => O.Option<P.STM<R2, E2, A2>>): <R, E>(fa: P.STM<R, E, A>) => P.STM<R2 & R, E | E2, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */
export declare function continueOrRetry_<R, E, A, A2>(fa: P.STM<R, E, A>, pf: (a: A) => O.Option<A2>): P.STM<R, E, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrRetry_
 */
export declare function continueOrRetry<A, A2>(pf: (a: A) => O.Option<A2>): <R, E>(fa: P.STM<R, E, A>) => P.STM<R, E, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */
export declare function continueOrFailM_<R, E, E1, A, R2, E2, A2>(fa: P.STM<R, E, A>, e: E1, pf: (a: A) => O.Option<P.STM<R2, E2, A2>>): P.STM<R2 & R, E | E1 | E2, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailM_
 */
export declare function continueOrFailM<E1, A, R2, E2, A2>(e: E1, pf: (a: A) => O.Option<P.STM<R2, E2, A2>>): <R, E>(fa: P.STM<R, E, A>) => P.STM<R2 & R, E1 | E2 | E, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */
export declare function continueOrFail_<R, E, E1, A, A2>(fa: P.STM<R, E, A>, e: E1, pf: (a: A) => O.Option<A2>): P.STM<R, E | E1, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFail_
 */
export declare function continueOrFail<E1, A, A2>(e: E1, pf: (a: A) => O.Option<A2>): <R, E>(fa: P.STM<R, E, A>) => P.STM<R, E1 | E, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */
export declare function continueOrFailWithM_<R, E, E1, A, R2, E2, A2>(fa: P.STM<R, E, A>, e: () => E1, pf: (a: A) => O.Option<P.STM<R2, E2, A2>>): P.STM<R2 & R, E | E1 | E2, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailWithM_
 */
export declare function continueOrFailWithM<E1, A, R2, E2, A2>(e: () => E1, pf: (a: A) => O.Option<P.STM<R2, E2, A2>>): <R, E>(fa: P.STM<R, E, A>) => P.STM<R2 & R, E1 | E2 | E, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */
export declare function continueOrFailWith_<R, E, E1, A, A2>(fa: P.STM<R, E, A>, e: () => E1, pf: (a: A) => O.Option<A2>): P.STM<R, E | E1, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFailWith_
 */
export declare function continueOrFailWith<E1, A, A2>(e: () => E1, pf: (a: A) => O.Option<A2>): <R, E>(fa: P.STM<R, E, A>) => P.STM<R, E1 | E, A2>;
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @ets_data_first chainError_
 */
export declare function chainError<E, R2, E2>(f: (e: E) => P.STM<R2, never, E2>): <R, A>(self: P.STM<R, E, A>) => P.STM<R2 & R, E2, A>;
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 */
export declare function chainError_<R, E, A, R2, E2>(self: P.STM<R, E, A>, f: (e: E) => P.STM<R2, never, E2>): P.STM<R2 & R, E2, A>;
/**
 * Checks the condition, and if it's true, returns unit, otherwise, retries.
 */
export declare function checkWith(predicate: () => boolean): P.STM<unknown, never, void>;
/**
 * Checks the condition, and if it's true, returns unit, otherwise, retries.
 */
export declare function check(predicate: boolean): P.STM<unknown, never, void>;
/**
 * Propagates self environment to that.
 */
export declare function compose_<R, E, A, R1, E1>(self: P.STM<R, E, A>, that: P.STM<R1, E1, R>): P.STM<R1, E | E1, A>;
/**
 * Propagates self environment to that.
 *
 * @ets_data_first compose_
 */
export declare function compose<R, R1, E1>(that: P.STM<R1, E1, R>): <E, A>(self: P.STM<R, E, A>) => P.STM<R1, E1 | E, A>;
/**
 * Commits this transaction atomically.
 */
export declare function commit<R, E, A>(self: P.STM<R, E, A>): T.Effect<R, E, A>;
/**
 * Commits this transaction atomically, regardless of whether the transaction
 * is a success or a failure.
 */
export declare function commitEither<R, E, A>(self: P.STM<R, E, A>): T.Effect<R, E, A>;
/**
 * Kills the fiber running the effect with a `RuntimeError` that contains
 * the specified message.
 */
export declare function dieMessage(message: string): P.STM<unknown, never, never>;
/**
 * Kills the fiber running the effect with a `RuntimeError` that contains
 * the specified message.
 */
export declare function dieMessageWith(message: () => string): P.STM<unknown, never, never>;
/**
 * Converts the failure channel into an `Either`.
 */
export declare function either<R, E, A>(self: P.STM<R, E, A>): P.STM<R, never, E.Either<E, A>>;
/**
 * Retrieves the environment inside an stm.
 */
export declare function environment<R>(): P.STM<R, never, R>;
/**
 * Returns an effect that ignores errors and runs repeatedly until it eventually succeeds.
 */
export declare function eventually<R, E, A>(self: P.STM<R, E, A>): P.STM<R, never, A>;
/**
 * Dies with specified `unknown` if the predicate fails.
 *
 * @ets_data_first filterOrDie_
 */
export declare function filterOrDie<A, B extends A>(p: Refinement<A, B>, dieWith: (a: Exclude<A, B>) => unknown): <R, E>(fa: P.STM<R, E, A>) => P.STM<R, E, B>;
export declare function filterOrDie<A>(p: Predicate<A>, dieWith: (a: A) => unknown): <R, E>(fa: P.STM<R, E, A>) => P.STM<R, E, A>;
/**
 * Dies with specified `unknown` if the predicate fails.
 */
export declare function filterOrDie_<R, E, A, B extends A>(fa: P.STM<R, E, A>, p: Refinement<A, B>, dieWith: (a: Exclude<A, B>) => unknown): P.STM<R, E, B>;
export declare function filterOrDie_<R, E, A>(fa: P.STM<R, E, A>, p: Predicate<A>, dieWith: (a: A) => unknown): P.STM<R, E, A>;
/**
 * Fails with `failWith` if the predicate fails.
 *
 * @ets_data_first filterOrFail_
 */
export declare function filterOrFail<A, B extends A, E1>(p: Refinement<A, B>, failWith: (a: Exclude<A, B>) => E1): <R, E>(fa: P.STM<R, E, A>) => P.STM<R, E | E1, B>;
export declare function filterOrFail<A, E1>(p: Predicate<A>, failWith: (a: A) => E1): <R, E>(fa: P.STM<R, E, A>) => P.STM<R, E | E1, A>;
/**
 * Fails with `failWith` if the predicate fails.
 */
export declare function filterOrFail_<R, E, E1, A, B extends A>(fa: P.STM<R, E, A>, p: Refinement<A, B>, failWith: (a: Exclude<A, B>) => E1): P.STM<R, E | E1, B>;
export declare function filterOrFail_<R, E, E1, A>(fa: P.STM<R, E, A>, p: Predicate<A>, failWith: (a: A) => E1): P.STM<R, E | E1, A>;
/**
 * Applies `or` if the predicate fails.
 *
 * @ets_data_first filterOrElse_
 */
export declare function filterOrElse<A, B extends A, R2, E2, A2>(p: Refinement<A, B>, or: (a: Exclude<A, B>) => P.STM<R2, E2, A2>): <R, E>(fa: P.STM<R, E, A>) => P.STM<R & R2, E | E2, B | A2>;
export declare function filterOrElse<A, R2, E2, A2>(p: Predicate<A>, or: (a: A) => P.STM<R2, E2, A2>): <R, E>(fa: P.STM<R, E, A>) => P.STM<R & R2, E | E2, A | A2>;
/**
 * Applies `or` if the predicate fails.
 */
export declare function filterOrElse_<R, E, A, B extends A, R2, E2, A2>(fa: P.STM<R, E, A>, p: Refinement<A, B>, or: (a: Exclude<A, B>) => P.STM<R2, E2, A2>): P.STM<R & R2, E | E2, B | A2>;
export declare function filterOrElse_<R, E, A, R2, E2, A2>(fa: P.STM<R, E, A>, p: Predicate<A>, or: (a: A) => P.STM<R2, E2, A2>): P.STM<R & R2, E | E2, A | A2>;
/**
 * Dies with a `Error` having the specified text message
 * if the predicate fails.
 *
 * @ets_data_first filterOrDieMessage_
 */
export declare function filterOrDieMessage<A, B extends A>(p: Refinement<A, B>, message: (a: Exclude<A, B>) => string): <R, E>(fa: P.STM<R, E, A>) => P.STM<R, E, B>;
export declare function filterOrDieMessage<A>(p: Predicate<A>, message: (a: A) => string): <R, E>(fa: P.STM<R, E, A>) => P.STM<R, E, A>;
/**
 * Dies with a `Error` having the specified text message
 * if the predicate fails.
 */
export declare function filterOrDieMessage_<R, E, A, B extends A>(fa: P.STM<R, E, A>, p: Refinement<A, B>, message: (a: Exclude<A, B>) => string): P.STM<R, E, B>;
export declare function filterOrDieMessage_<R, E, A>(fa: P.STM<R, E, A>, p: Predicate<A>, message: (a: A) => string): P.STM<R, E, A>;
/**
 * Returns an effect that swaps the error/success cases. This allows you to
 * use all methods on the error channel, possibly before flipping back.
 */
export declare function flip<R, E, A>(self: P.STM<R, E, A>): P.STM<R, A, E>;
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 *
 * @ets_data_first flipWith_
 */
export declare function flipWith<R, E, A, R2, E2, A2>(f: (self: P.STM<R, A, E>) => P.STM<R2, A2, E2>): (self: P.STM<R, E, A>) => P.STM<R2, E2, A2>;
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 */
export declare function flipWith_<R, E, A, R2, E2, A2>(self: P.STM<R, E, A>, f: (self: P.STM<R, A, E>) => P.STM<R2, A2, E2>): P.STM<R2, E2, A2>;
/**
 * Folds over the `STM` effect, handling both P.failure and success, but not
 * retry.
 */
export declare function fold_<R, E, A, B, C>(self: P.STM<R, E, A>, g: (e: E) => C, f: (a: A) => B): P.STM<R, never, B | C>;
/**
 * Folds over the `STM` effect, handling both P.failure and success, but not
 * retry.
 *
 * @ets_data_first fold_
 */
export declare function fold<E, A, B, C>(g: (e: E) => C, f: (a: A) => B): <R>(self: P.STM<R, E, A>) => P.STM<R, never, B | C>;
/**
 * Flattens out a nested `STM` effect.
 */
export declare function flatten<R, E, R1, E1, B>(self: P.STM<R, E, P.STM<R1, E1, B>>): P.STM<R1 & R, E | E1, B>;
/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @ets_data_first flattenErrorOptionWith_
 */
export declare function flattenErrorOptionWith<E2>(def: () => E2): <R, E, A>(self: P.STM<R, O.Option<E>, A>) => P.STM<R, E2 | E, A>;
/**
 * Unwraps the optional error, defaulting to the provided value.
 */
export declare function flattenErrorOptionWith_<R, E, A, E2>(self: P.STM<R, O.Option<E>, A>, def: () => E2): P.STM<R, E | E2, A>;
/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @ets_data_first flattenErrorOption_
 */
export declare function flattenErrorOption<E2>(def: E2): <R, E, A>(self: P.STM<R, O.Option<E>, A>) => P.STM<R, E2 | E, A>;
/**
 * Unwraps the optional error, defaulting to the provided value.
 */
export declare function flattenErrorOption_<R, E, A, E2>(self: P.STM<R, O.Option<E>, A>, def: E2): P.STM<R, E | E2, A>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns a transactional effect that produces a new `ReadonlyArray<B>`.
 */
export declare function forEach_<A, R, E, B>(it: Iterable<A>, f: (a: A) => P.STM<R, E, B>): P.STM<R, E, readonly B[]>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns a transactional effect that produces a new `ReadonlyArray<B>`.
 *
 * @ets_data_first forEach_
 */
export declare function forEach<A, R, E, B>(f: (a: A) => P.STM<R, E, B>): (it: Iterable<A>) => P.STM<R, E, readonly B[]>;
/**
 * Lifts an `Either` into a `STM`.
 */
export declare function fromEitherWith<E, A>(e: () => E.Either<E, A>): P.STM<unknown, E, A>;
/**
 * Lifts an `Either` into a `STM`.
 */
export declare function fromEither<E, A>(e: E.Either<E, A>): P.STM<unknown, E, A>;
/**
 * Unwraps the optional success of this effect, but can fail with an None value.
 */
export declare function get<R, E, A>(self: P.STM<R, E, O.Option<A>>): P.STM<R, O.Option<E>, A>;
/**
 * Returns a successful effect with the head of the list if the list is
 * non-empty or fails with the error `None` if the list is empty.
 */
export declare function head<R, E, A>(self: P.STM<R, E, Iterable<A>>): P.STM<R, O.Option<E>, A>;
/**
 * Returns a new effect that ignores the success or failure of this effect.
 */
export declare function ignore<R, E, A>(self: P.STM<R, E, A>): P.STM<R, never, void>;
/**
 * Returns whether this effect is a failure.
 */
export declare function isFailure<R, E, A>(self: P.STM<R, E, A>): P.STM<R, never, boolean>;
/**
 * Returns whether this effect is a success.
 */
export declare function isSuccess<R, E, A>(self: P.STM<R, E, A>): P.STM<R, never, boolean>;
/**
 * Returns a successful effect if the value is `Left`, or fails with the error `None`.
 */
export declare function left<R, E, B, C>(self: P.STM<R, E, E.Either<B, C>>): P.STM<R, O.Option<E>, B>;
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 */
export declare function leftOrFail_<R, E, B, C, E1>(self: P.STM<R, E, E.Either<B, C>>, orFail: (c: C) => E1): P.STM<R, E | E1, B>;
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 *
 * @ets_data_first leftOrFail_
 */
export declare function leftOrFail<C, E1>(orFail: (c: C) => E1): <R, E, B>(self: P.STM<R, E, E.Either<B, C>>) => P.STM<R, E1 | E, B>;
/**
 * Returns a successful effect if the value is `Left`, or fails with a `NoSuchElementException`.
 */
export declare function leftOrFailException<R, E, B, C>(self: P.STM<R, E, E.Either<B, C>>): P.STM<R, NoSuchElementException | E, B>;
/**
 * Depending on provided environment returns either this one or the other effect.
 *
 * @ets_data_first join_
 */
export declare function join<R1, E1, A1>(that: P.STM<R1, E1, A1>): <R, E, A>(self: P.STM<R, E, A>) => P.STM<E.Either<R, R1>, E1 | E, A1 | A>;
/**
 * Depending on provided environment returns either this one or the other effect.
 */
export declare function join_<R, E, A, R1, E1, A1>(self: P.STM<R, E, A>, that: P.STM<R1, E1, A1>): P.STM<E.Either<R, R1>, E | E1, A | A1>;
/**
 * Depending on provided environment returns either this one or the other effect.
 */
export declare function joinEither_<R, E, A, R1, E1, A1>(self: P.STM<R, E, A>, that: P.STM<R1, E1, A1>): P.STM<E.Either<R, R1>, E | E1, E.Either<A, A1>>;
/**
 * Depending on provided environment returns either this one or the other effect.
 */
export declare function joinEither<R, E, A, R1, E1, A1>(that: P.STM<R1, E1, A1>): (self: P.STM<R, E, A>) => P.STM<E.Either<R, R1>, E | E1, E.Either<A, A1>>;
/**
 * Maps from one error type to another.
 */
export declare function mapError_<R, E, A, E1>(self: P.STM<R, E, A>, f: (a: E) => E1): P.STM<R, E1, A>;
/**
 * Maps from one error type to another.
 *
 * @ets_data_first mapError_
 */
export declare function mapError<E, E1>(f: (a: E) => E1): <R, A>(self: P.STM<R, E, A>) => P.STM<R, E1, A>;
/**
 * Provides the transaction its required environment, which eliminates
 * its dependency on `R`.
 */
export declare function provideAll_<R, E, A>(self: P.STM<R, E, A>, r: R): P.STM<unknown, E, A>;
/**
 * Provides the transaction its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */
export declare function provideAll<R>(r: R): <E, A>(self: P.STM<R, E, A>) => P.STM<unknown, E, A>;
/**
 * Repeats this `STM` effect until its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatUntil` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryUntil` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually satisfy the predicate.
 */
export declare function repeatUntil_<R, E, A>(self: P.STM<R, E, A>, f: (a: A) => boolean): P.STM<R, E, A>;
/**
 * Repeats this `STM` effect until its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatUntil` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryUntil` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually satisfy the predicate.
 *
 * @ets_data_first repeatUntil_
 */
export declare function repeatUntil<A>(f: (a: A) => boolean): <R, E>(self: P.STM<R, E, A>) => P.STM<R, E, A>;
/**
 * Repeats this `STM` effect while its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatWhile` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryWhile` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually not satisfy the predicate.
 */
export declare function repeatWhile_<R, E, A>(self: P.STM<R, E, A>, f: (a: A) => boolean): P.STM<R, E, A>;
/**
 * Repeats this `STM` effect while its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatWhile` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryWhile` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually not satisfy the predicate.
 *
 * @ets_data_first repeatWhile_
 */
export declare function repeatWhile<R, E, A>(f: (a: A) => boolean): (self: P.STM<R, E, A>) => P.STM<R, E, A>;
/**
 * Suspends creation of the specified transaction lazily.
 */
export declare function suspend<R, E, A>(f: () => P.STM<R, E, A>): P.STM<R, E, A>;
/**
 * "Peeks" at the success of transactional effect.
 */
export declare function tap_<R, E, A, R1, E1, B>(self: P.STM<R, E, A>, f: (a: A) => P.STM<R1, E1, B>): P.STM<R1 & R, E | E1, A>;
/**
 * "Peeks" at the success of transactional effect.
 *
 * @ets_data_first tap_
 */
export declare function tap<A, R1, E1, B>(f: (a: A) => P.STM<R1, E1, B>): <R, E>(self: P.STM<R, E, A>) => P.STM<R1 & R, E | E1, A>;
/**
 * Returns an effect with the value on the left part.
 */
export declare function toLeftWith<A>(a: () => A): P.STM<unknown, never, E.Either<A, never>>;
/**
 * Returns an effect with the value on the left part.
 */
export declare function toLeft<A>(a: A): P.STM<unknown, never, E.Either<A, never>>;
/**
 * Sequentially zips this value with the specified one, combining the values
 * using the specified combiner function.
 */
export declare function zipWith_<R, E, A, R1, E1, B, C>(self: P.STM<R, E, A>, that: P.STM<R1, E1, B>, f: (a: A, b: B) => C): P.STM<R1 & R, E | E1, C>;
/**
 * Sequentially zips this value with the specified one, combining the values
 * using the specified combiner function.
 *
 * @ets_data_first zipWith_
 */
export declare function zipWith<A, R1, E1, B, C>(that: P.STM<R1, E1, B>, f: (a: A, b: B) => C): <R, E>(self: P.STM<R, E, A>) => P.STM<R1 & R, E | E1, C>;
//# sourceMappingURL=core.d.ts.map