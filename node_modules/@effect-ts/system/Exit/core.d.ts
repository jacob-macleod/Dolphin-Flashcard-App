import * as C from "../Cause/core.js";
import { FiberFailure } from "../Cause/errors.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import * as E from "../Either/index.js";
import type { FiberID } from "../Fiber/id.js";
import * as O from "../Option/index.js";
import type { Exit } from "./exit.js";
import { Failure, Success } from "./exit.js";
export { Exit, Failure, Success } from "./exit.js";
/**
 * Applicative's ap
 */
export declare function ap_<E, A, B>(fa: Exit<E, A>, fab: Exit<E, (a: A) => B>): Exit<E, B>;
/**
 * Applicative's ap
 *
 * @ets_data_first ap_
 */
export declare function ap<E, A>(fa: Exit<E, A>): <B>(fab: Exit<E, (a: A) => B>) => Exit<E, B>;
/**
 * Replaces the success value with the one provided.
 */
export declare function as_<E, B>(exit: Exit<E, unknown>, b: B): Exit<E, B>;
/**
 * Replaces the success value with the one provided.
 *
 * @ets_data_first as_
 */
export declare function as<B>(b: B): <E>(exit: Exit<E, unknown>) => Exit<E, B>;
/**
 * Maps over both the error and value type.
 */
export declare function bimap_<E, E1, A, A1>(exit: Exit<E, A>, f: (e: E) => E1, g: (a: A) => A1): Exit<E1, A1>;
/**
 * Maps over both the error and value type.
 *
 * @ets_data_first bimap_
 */
export declare function bimap<E, E1, A, A1>(f: (e: E) => E1, g: (a: A) => A1): (exit: Exit<E, A>) => Exit<E1, A1>;
/**
 * Flat maps over the value type.
 */
export declare function chain_<E, A, A1, E1>(exit: Exit<E, A>, f: (a: A) => Exit<E1, A1>): Exit<E | E1, A1>;
/**
 * Flat maps over the value type.
 *
 * @ets_data_first chain_
 */
export declare function chain<A, A1, E1>(f: (a: A) => Exit<E1, A1>): <E>(exit: Exit<E, A>) => Exit<E1 | E, A1>;
/**
 * Collects all the success states and merges sequentially the causes
 */
export declare function collectAll<E, A>(...exits: readonly Exit<E, A>[]): O.Option<Exit<E, readonly A[]>>;
/**
 * Zips this together with the specified result using the combination functions.
 */
export declare function zipWith_<E, E1, A, B, C>(exit: Exit<E, A>, that: Exit<E1, B>, f: (a: A, b: B) => C, g: (e: C.Cause<E>, e1: C.Cause<E1>) => C.Cause<E | E1>): Exit<E | E1, C>;
/**
 * Zips this together with the specified result using the combination functions.
 *
 * @ets_data_first zipWith_
 */
export declare function zipWith<E, E1, A, B, C>(that: Exit<E1, B>, f: (a: A, b: B) => C, g: (e: C.Cause<E>, e1: C.Cause<E1>) => C.Cause<E | E1>): (exit: Exit<E, A>) => Exit<E | E1, C>;
/**
 * Collects all the success states and merges the causes in parallel
 */
export declare function collectAllPar<E, A>(...exits: readonly Exit<E, A>[]): O.Option<Exit<E, readonly A[]>>;
/**
 * Construct an Exit with an unchecked cause containing the specified error
 */
export declare function die(error: unknown): Exit<never, never>;
/**
 * Returns f(a) if the exit is successful
 */
export declare function exists_<A, E>(exit: Exit<E, A>, f: (a: A) => boolean): boolean;
/**
 * Returns f(a) if the exit is successful
 *
 * @ets_data_first exists_
 */
export declare function exists<A>(f: (a: A) => boolean): <E>(exit: Exit<E, A>) => boolean;
/**
 * Constructs a failed exit with the specified checked error
 */
export declare function fail<E>(e: E): Exit<E, never>;
/**
 * Constructs a failed exit with the specified cause
 */
export declare function failCause<E>(cause: C.Cause<E>): Exit<E, never>;
/**
 * Flatten nested Exits
 */
export declare function flatten<E, E1, A>(exit: Exit<E, Exit<E1, A>>): Exit<E | E1, A>;
/**
 * Folds over the value or cause.
 */
export declare function fold_<E, A, Z1, Z2>(exit: Exit<E, A>, failed: (e: C.Cause<E>) => Z1, succeed: (a: A) => Z2): Z1 | Z2;
/**
 * Folds over the value or cause.
 *
 * @ets_data_first fold_
 */
export declare function fold<E, A, Z1, Z2>(failed: (e: C.Cause<E>) => Z1, succeed: (a: A) => Z2): (exit: Exit<E, A>) => Z1 | Z2;
/**
 * Embeds Either's Error & Success in an Exit
 */
export declare function fromEither<E, A>(e: E.Either<E, A>): Exit<E, A>;
/**
 * Embeds an option result into an Exit with the specified error using onNone
 */
export declare function fromOption<E>(onNone: () => E): <A>(a: O.Option<A>) => Exit<E, A>;
/**
 * Get successful result falling back to orElse result in case of failure
 */
export declare function getOrElse_<E, A, A1>(exit: Exit<E, A>, orElse: (_: C.Cause<E>) => A1): A | A1;
/**
 * Get successful result falling back to orElse result in case of failure
 *
 * @ets_data_first getOrElse_
 */
export declare function getOrElse<E, A1>(orElse: (_: C.Cause<E>) => A1): <A>(exit: Exit<E, A>) => A1 | A;
/**
 * Constructs a failed exit with the specified cause
 */
export declare function halt<E>(cause: C.Cause<E>): Exit<E, never>;
/**
 * Constructs an exit with the specified interruption state
 */
export declare function interrupt(id: FiberID): Exit<never, never>;
/**
 * Returns if Exit contains an interruption state
 */
export declare function interrupted<E, A>(exit: Exit<E, A>): exit is Failure<E>;
/**
 * Maps over the value type.
 */
export declare function map_<E, A, A1>(exit: Exit<E, A>, f: (a: A) => A1): Exit<E, A1>;
/**
 * Maps over the value type.
 *
 * @ets_data_first map_
 */
export declare function map<A, A1>(f: (a: A) => A1): <E>(exit: Exit<E, A>) => Exit<E, A1>;
/**
 * Maps over the error type.
 */
export declare function mapError_<E, E1, A>(exit: Exit<E, A>, f: (e: E) => E1): Exit<E1, A>;
/**
 * Maps over the error type.
 *
 * @ets_data_first mapError_
 */
export declare function mapError<E, E1>(f: (e: E) => E1): <A>(exit: Exit<E, A>) => Exit<E1, A>;
/**
 * Maps over the cause type.
 */
export declare function mapErrorCause_<E, E1, A>(exit: Exit<E, A>, f: (e: C.Cause<E>) => C.Cause<E1>): Exit<E1, A>;
/**
 * Maps over the cause type.
 *
 * @ets_data_first mapErrorCause_
 */
export declare function mapErrorCause<E, E1>(f: (e: C.Cause<E>) => C.Cause<E1>): <A>(exit: Exit<E, A>) => Exit<E1, A>;
/**
 * Replaces the error value with the one provided.
 */
export declare function orElseFail_<E, E1, A>(exit: Exit<E, A>, e: E1): Exit<E1, A>;
/**
 * Replaces the error value with the one provided.
 *
 * @ets_data_first orElseFail_
 */
export declare function orElseFail<E1>(e: E1): <E, A>(exit: Exit<E, A>) => Exit<E1, A>;
/**
 * Construct a succeeded exit with the specified value
 */
export declare function succeed<A>(a: A): Exit<never, A>;
/**
 * Returns if an exit is succeeded
 */
export declare function succeeded<E, A>(exit: Exit<E, A>): exit is Success<A>;
/**
 * Converts the `Exit` to an `Either<FiberFailure, A>`, by wrapping the
 * cause in `FiberFailure` (if the result is failed).
 */
export declare function toEither<E, A>(exit: Exit<E, A>): E.Either<FiberFailure<E>, A>;
/**
 * Discards the value.
 */
export declare const unit: Exit<never, void>;
/**
 * Sequentially zips the this result with the specified result or else returns the failed `Cause[E1]`
 */
export declare function zip_<E, E1, A, B>(exit: Exit<E, A>, that: Exit<E1, B>): Exit<E | E1, Tp.Tuple<[A, B]>>;
/**
 * Sequentially zips the this result with the specified result or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zip_
 */
export declare function zip<E1, B>(that: Exit<E1, B>): <E, A>(exit: Exit<E, A>) => Exit<E1 | E, Tp.Tuple<[A, B]>>;
/**
 * Sequentially zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 */
export declare function zipLeft_<E, E1, A, B>(exit: Exit<E, A>, that: Exit<E1, B>): Exit<E | E1, A>;
/**
 * Sequentially zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipLeft_
 */
export declare function zipLeft<E1, B>(that: Exit<E1, B>): <E, A>(exit: Exit<E, A>) => Exit<E1 | E, A>;
/**
 * Parallelly zips the this result with the specified result or else returns the failed `Cause[E1]`
 */
export declare function zipPar_<E, E1, A, B>(exit: Exit<E, A>, that: Exit<E1, B>): Exit<E | E1, Tp.Tuple<[A, B]>>;
/**
 * Parallelly zips the this result with the specified result or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipPar_
 */
export declare function zipPar<E1, B>(that: Exit<E1, B>): <E, A>(exit: Exit<E, A>) => Exit<E1 | E, Tp.Tuple<[A, B]>>;
/**
 * Parallelly zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 */
export declare function zipParLeft_<E, E1, A, B>(exit: Exit<E, A>, that: Exit<E1, B>): Exit<E | E1, A>;
/**
 * Parallelly zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipParLeft_
 */
export declare function zipParLeft<E1, B>(that: Exit<E1, B>): <E, A>(exit: Exit<E, A>) => Exit<E1 | E, A>;
/**
 * Parallelly zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 */
export declare function zipParRight_<E, E1, A, B>(exit: Exit<E, A>, that: Exit<E1, B>): Exit<E | E1, B>;
/**
 * Parallelly zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipParRight_
 */
export declare function zipParRight<E1, B>(that: Exit<E1, B>): <E, A>(exit: Exit<E, A>) => Exit<E1 | E, B>;
/**
 * Sequentially zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 */
export declare function zipRight_<E, A, E1, B>(exit: Exit<E, A>, that: Exit<E1, B>): Exit<E | E1, B>;
/**
 * Sequentially zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipRight_
 */
export declare function zipRight<E1, B>(that: Exit<E1, B>): <E, A>(exit: Exit<E, A>) => Exit<E1 | E, B>;
/**
 * Returns an untraced exit value.
 */
export declare function untraced<E, A>(self: Exit<E, A>): Exit<E, A>;
/**
 * Asserts an exit is a failure
 */
export declare function assertsFailure<E, A>(exit: Exit<E, A>): asserts exit is Failure<E>;
/**
 * Maps over both the error and value type.
 */
export declare function mapBoth_<E, E1, A, A1>(self: Exit<E, A>, f: (e: E) => E1, g: (a: A) => A1): Exit<E1, A1>;
/**
 * Maps over both the error and value type.
 *
 * @ets_data_first mapBoth_
 */
export declare function mapBoth<E, E1, A, A1>(f: (e: E) => E1, g: (a: A) => A1): (self: Exit<E, A>) => Exit<E1, A1>;
//# sourceMappingURL=core.d.ts.map