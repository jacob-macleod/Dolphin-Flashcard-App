import * as E from "../Either/index.js";
import type { FiberID } from "../Fiber/id.js";
import type { Trace } from "../Fiber/index.js";
import * as S from "../IO/index.js";
import * as O from "../Option/index.js";
import type { Cause } from "./cause.js";
export { combinePar, Cause, die, empty, fail, interrupt, combineSeq, traced, isEmpty } from "./cause.js";
/**
 * Applicative's ap
 */
export declare function ap<A>(fa: Cause<A>): <B>(fab: Cause<(a: A) => B>) => Cause<B>;
/**
 * Substitute the E in the cause
 */
export declare function as<E1>(e: E1): (cause: Cause<unknown>) => Cause<E1>;
/**
 * Builds a Cause depending on the result of another
 */
export declare function chain_<E, E1>(cause: Cause<E>, f: (_: E) => Cause<E1>): Cause<E1>;
/**
 * Builds a Cause depending on the result of another
 */
export declare function chain<E, E1>(f: (_: E) => Cause<E1>): (cause: Cause<E>) => Cause<E1>;
/**
 * Builds a Cause depending on the result of another
 */
export declare function chainSafe_<E, E1>(cause: Cause<E>, f: (_: E) => Cause<E1>): S.IO<Cause<E1>>;
/**
 * Equivalent to chain((a) => Fail(f(a)))
 */
export declare function map_<E, E1>(cause: Cause<E>, f: (e: E) => E1): Cause<E1>;
/**
 * Equivalent to chain((a) => Fail(f(a)))
 */
export declare function map<E, E1>(f: (e: E) => E1): (cause: Cause<E>) => Cause<E1>;
/**
 * Determines if this cause contains or is equal to the specified cause.
 */
export declare function contains<E, E1 extends E = E>(that: Cause<E1>): (cause: Cause<E>) => boolean;
/**
 * Determines if this cause contains or is equal to the specified cause.
 */
export declare function containsSafe<E, E1 extends E = E>(that: Cause<E1>): (cause: Cause<E>) => S.IO<boolean>;
/**
 * Extracts a list of non-recoverable errors from the `Cause`.
 */
export declare function defects<E>(cause: Cause<E>): readonly unknown[];
/**
 * Returns the `Error` associated with the first `Die` in this `Cause` if
 * one exists.
 */
export declare function dieOption<E>(cause: Cause<E>): O.Option<unknown>;
/**
 * Returns if a cause contains a defect
 */
export declare function died<E>(cause: Cause<E>): boolean;
/**
 * Returns the `E` associated with the first `Fail` in this `Cause` if one
 * exists.
 */
export declare function failureOption<E>(cause: Cause<E>): O.Option<E>;
/**
 * Returns if the cause has a failure in it
 */
export declare function failed<E>(cause: Cause<E>): boolean;
/**
 * Retrieve the first checked error on the `Left` if available,
 * if there are no checked errors return the rest of the `Cause`
 * that is known to contain only `Die` or `Interrupt` causes.
 * */
export declare function failureOrCause<E>(cause: Cause<E>): E.Either<E, Cause<never>>;
/**
 * Produces a list of all recoverable errors `E` in the `Cause`.
 */
export declare function failures<E>(cause: Cause<E>): readonly E[];
/**
 * Remove all `Die` causes that the specified partial function is defined at,
 * returning `Some` with the remaining causes or `None` if there are no
 * remaining causes.
 */
export declare function stripSomeDefects(f: (_: unknown) => O.Option<unknown>): <E>(cause: Cause<E>) => O.Option<Cause<E>>;
/**
 * Remove all `Die` causes that the specified partial function is defined at,
 * returning `Some` with the remaining causes or `None` if there are no
 * remaining causes.
 */
export declare function stripSomeDefects_<E>(cause: Cause<E>, f: (_: unknown) => O.Option<unknown>): O.Option<Cause<E>>;
/**
 * Filter out all `Die` causes according to the specified function,
 * returning `Some` with the remaining causes or `None` if there are no
 * remaining causes.
 */
export declare function stripSomeDefectsSafe<E>(cause: Cause<E>, f: (_: unknown) => O.Option<unknown>): S.IO<O.Option<Cause<E>>>;
/**
 * Finds the first result matching f
 */
export declare function find<Z, E>(f: (cause: Cause<E>) => O.Option<Z>): (cause: Cause<E>) => O.Option<Z>;
/**
 * Finds the first result matching f
 */
export declare function findSafe<Z, E>(f: (cause: Cause<E>) => O.Option<Z>): (cause: Cause<E>) => S.IO<O.Option<Z>>;
/**
 * Equivalent to chain(identity)
 */
export declare const flatten: <E>(cause: Cause<Cause<E>>) => Cause<E>;
/**
 * Folds over a cause
 */
export declare function fold<E, Z>(empty: () => Z, failCase: (_: E) => Z, dieCase: (_: unknown) => Z, interruptCase: (_: FiberID) => Z, thenCase: (_: Z, __: Z) => Z, bothCase: (_: Z, __: Z) => Z, tracedCase: (_: Z, __: Trace) => Z): (cause: Cause<E>) => Z;
/**
 * Folds over a cause
 */
export declare function foldSafe<E, Z>(empty: () => Z, failCase: (_: E) => Z, dieCase: (_: unknown) => Z, interruptCase: (_: FiberID) => Z, thenCase: (_: Z, __: Z) => Z, bothCase: (_: Z, __: Z) => Z, tracedCase: (_: Z, __: Trace) => Z): (cause: Cause<E>) => S.IO<Z>;
/**
 * Accumulates a state over a Cause
 */
export declare function reduceLeft<Z>(z: Z): <E>(f: (z: Z, cause: Cause<E>) => O.Option<Z>) => (cause: Cause<E>) => Z;
/**
 * Returns if the cause contains an interruption in it
 */
export declare function interrupted<E>(cause: Cause<E>): boolean;
/**
 * Returns the `FiberID` associated with the first `Interrupt` in this `Cause` if one
 * exists.
 */
export declare function interruptOption<E>(cause: Cause<E>): O.Option<FiberID>;
/**
 * Determines if the `Cause` contains only interruptions and not any `Die` or
 * `Fail` causes.
 */
export declare function interruptedOnly<E>(cause: Cause<E>): boolean;
/**
 * Returns a set of interruptors, fibers that interrupted the fiber described
 * by this `Cause`.
 */
export declare function interruptors<E>(cause: Cause<E>): readonly FiberID[];
/**
 * Remove all `Fail` and `Interrupt` nodes from this `Cause`,
 * return only `Die` cause/finalizer defects.
 */
export declare function keepDefectsSafe<E>(cause: Cause<E>): S.IO<O.Option<Cause<never>>>;
/**
 * Remove all `Fail` and `Interrupt` nodes from this `Cause`,
 * return only `Die` cause/finalizer defects.
 */
export declare function keepDefects<E>(cause: Cause<E>): O.Option<Cause<never>>;
/**
 * Converts the specified `Cause<Either<E, A>>` to an `Either<Cause<E>, A>`.
 */
export declare function sequenceCauseEither<E, A>(c: Cause<E.Either<E, A>>): E.Either<Cause<E>, A>;
/**
 * Converts the specified `Cause<Either<E, A>>` to an `Either<Cause<E>, A>`.
 */
export declare function sequenceCauseEitherSafe<E, A>(c: Cause<E.Either<E, A>>): S.IO<E.Either<Cause<E>, A>>;
/**
 * Converts the specified `Cause<Option<E>>` to an `Option<Cause<E>>` by
 * recursively stripping out any failures with the error `None`.
 */
export declare function sequenceCauseOptionSafe<E>(c: Cause<O.Option<E>>): S.IO<O.Option<Cause<E>>>;
/**
 * Converts the specified `Cause<Option<E>>` to an `Option<Cause<E>>` by
 * recursively stripping out any failures with the error `None`.
 */
export declare function sequenceCauseOption<E>(c: Cause<O.Option<E>>): O.Option<Cause<E>>;
/**
 * Squashes a `Cause` down to a single `Throwable`, chosen to be the
 * "most important" `Throwable`.
 */
export declare function squash<E>(f: (e: E) => unknown): (cause: Cause<E>) => unknown;
/**
 * Discards all typed failures kept on this `Cause`.
 */
export declare function stripFailures<E>(cause: Cause<E>): Cause<never>;
/**
 * Discards all typed failures kept on this `Cause`.
 */
export declare function stripFailuresSafe<E>(cause: Cause<E>): S.IO<Cause<never>>;
/**
 * Discards all typed failures kept on this `Cause`.
 */
export declare function stripInterrupts<E>(cause: Cause<E>): Cause<E>;
/**
 * Discards all typed failures kept on this `Cause`.
 */
export declare function stripInterruptsSafe<E>(cause: Cause<E>): S.IO<Cause<E>>;
/**
 * Returns a `Cause` that has been stripped of all tracing information.
 */
export declare function untraced<E>(cause: Cause<E>): Cause<E>;
/**
 * Returns a `Cause` that has been stripped of all tracing information.
 */
export declare function untracedSafe<E>(cause: Cause<E>): S.IO<Cause<E>>;
/**
 * Converts the specified `Cause<Either<E, A>>` to an `Either<Cause<E>, A>` by
 * recursively stripping out any failures with the error `None`.
 */
export declare function flipCauseOption<E>(c: Cause<O.Option<E>>): O.Option<Cause<E>>;
//# sourceMappingURL=core.d.ts.map