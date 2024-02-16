/**
 * adapted from https://github.com/gcanti/fp-ts
 */
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Lazy, Predicate, Refinement } from "../Function/core.js";
import type { Option } from "../Option/core.js";
import * as St from "../Structural/index.js";
/**
 * Definitions
 */
export declare class Left<E> {
    readonly left: E;
    readonly _tag = "Left";
    constructor(left: E);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
}
export declare class Right<A> {
    readonly right: A;
    readonly _tag = "Right";
    constructor(right: A);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
}
export declare type Either<E, A> = Left<E> | Right<A>;
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 */
export declare function right<A>(a: A): Either<never, A>;
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 */
export declare function rightW<A, E = never>(a: A): Either<E, A>;
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 */
export declare function left<E>(e: E): Either<E, never>;
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 */
export declare function leftW<E, A = never>(e: E): Either<E, A>;
/**
 * Widen left side `Either[E, A] => Either[E | E1, A]`
 */
export declare function widenE<E1>(): <E, A>(self: Either<E, A>) => Either<E1 | E, A>;
/**
 * Widen right side `Either[E, A] => Either[E, A | A1]`
 */
export declare function widenA<A1>(): <E, A>(self: Either<E, A>) => Either<E, A1 | A>;
/**
 * Alternatively construct `that` if `self` is left
 */
export declare function alt_<E, E2, A, A2>(self: Either<E, A>, that: () => Either<E2, A2>): Either<E | E2, A | A2>;
/**
 * Alternatively construct `that` if `self` is left
 *
 * @ets_data_first alt_
 */
export declare function alt<E, A>(that: () => Either<E, A>): <E2, A2>(self: Either<E2, A2>) => Either<E | E2, A | A2>;
/**
 * Classic Applicative
 */
export declare function ap_<E, A, B, E2>(fab: Either<E, (a: A) => B>, fa: Either<E2, A>): Either<E | E2, B>;
/**
 * Classic Applicative
 *
 * @ets_data_first ap_
 */
export declare function ap<E, A>(fa: Either<E, A>): <E2, B>(fab: Either<E2, (a: A) => B>) => Either<E | E2, B>;
/**
 * Apply both and return both
 */
export declare function zip_<E2, A, E, B>(fa: Either<E2, A>, fb: Either<E, B>): Either<E | E2, Tp.Tuple<[A, B]>>;
/**
 * Apply both and return both
 *
 * @ets_data_first zip_
 */
export declare function zip<E, B>(fb: Either<E, B>): <E2, A>(fa: Either<E2, A>) => Either<E | E2, Tp.Tuple<[A, B]>>;
/**
 * Apply both and return first
 *
 * @ets_data_first zipFirst_
 */
export declare function zipFirst<E, B>(fb: Either<E, B>): <E2, A>(fa: Either<E2, A>) => Either<E | E2, A>;
/**
 * Apply both and return first
 */
export declare function zipFirst_<E2, A, E, B>(fa: Either<E2, A>, fb: Either<E, B>): Either<E | E2, A>;
/**
 * Apply both and return second
 *
 * @ets_data_first zipSecond_
 */
export declare function zipSecond<E, B>(fb: Either<E, B>): <E2, A>(fa: Either<E2, A>) => Either<E | E2, B>;
/**
 * Apply both and return second
 */
export declare function zipSecond_<E2, A, E, B>(fa: Either<E2, A>, fb: Either<E, B>): Either<E | E2, B>;
/**
 * Maps both left and right
 */
export declare function bimap_<E, A, G, B>(fea: Either<E, A>, f: (e: E) => G, g: (a: A) => B): Either<G, B>;
/**
 * Maps both left and right
 *
 * @ets_data_first bimap_
 */
export declare function bimap<E, G, A, B>(f: (e: E) => G, g: (a: A) => B): (fa: Either<E, A>) => Either<G, B>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare function chain_<E, A, B, E2>(fa: Either<E, A>, f: (a: A) => Either<E2, B>): Either<E | E2, B>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first chain_
 */
export declare function chain<E, A, B>(f: (a: A) => Either<E, B>): <E2>(ma: Either<E2, A>) => Either<E | E2, B>;
/**
 * Like chain but ignores the constructed outout
 *
 * @ets_data_first tap_
 */
export declare function tap<E, A, B>(f: (a: A) => Either<E, B>): <E2>(ma: Either<E2, A>) => Either<E | E2, A>;
/**
 * Like chain but ignores the constructed outout
 */
export declare function tap_<E2, E, A, B>(ma: Either<E2, A>, f: (a: A) => Either<E, B>): Either<E | E2, A>;
/**
 * Self embed `Either[E, A]` into `Either[E, Either[E, A]]`
 */
export declare function duplicate<E, A>(ma: Either<E, A>): Either<E, Either<E, A>>;
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @ets_data_first exists_
 */
export declare function exists<A>(predicate: Predicate<A>): <E>(ma: Either<E, A>) => boolean;
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 */
export declare function exists_<E, A>(ma: Either<E, A>, predicate: Predicate<A>): boolean;
/**
 * Apply `Either[E, A] => B` in case `self` is `Right` returning `Either[E, B]`
 */
export declare function extend_<E, A, B>(self: Either<E, A>, f: (wa: Either<E, A>) => B): Either<E, B>;
/**
 * Apply `Either[E, A] => B` in case `self` is `Right` returning `Either[E, B]`
 *
 * @ets_data_first extend_
 */
export declare function extend<E, A, B>(f: (fa: Either<E, A>) => B): (self: Either<E, A>) => Either<E, B>;
/**
 * Apply predicate to `A` and construct `E` in case the predicate is `false`
 *
 * @ets_data_first filterOrElse_
 */
export declare function filterOrElse<E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <E2>(ma: Either<E2, A>) => Either<E | E2, B>;
export declare function filterOrElse<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <E2>(ma: Either<E2, A>) => Either<E | E2, A>;
/**
 * Apply predicate to `A` and construct `E` in case the predicate is `false`
 */
export declare function filterOrElse_<E, E2, A, B extends A>(ma: Either<E2, A>, refinement: Refinement<A, B>, onFalse: (a: A) => E): Either<E | E2, B>;
export declare function filterOrElse_<E, E2, A>(ma: Either<E2, A>, predicate: Predicate<A>, onFalse: (a: A) => E): Either<E | E2, A>;
/**
 * Flatten nested `Either[E, Either[E1, A]]` into `Either[E | E1, A]`
 */
export declare function flatten<E, E2, A>(mma: Either<E, Either<E2, A>>): Either<E | E2, A>;
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @ets_data_first fold_
 */
export declare function fold<E, A, B, C>(onLeft: (e: E) => B, onRight: (a: A) => C): (ma: Either<E, A>) => B | C;
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 */
export declare function fold_<E, A, B, C>(ma: Either<E, A>, onLeft: (e: E) => B, onRight: (a: A) => C): B | C;
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @ets_data_first fromNullable_
 */
export declare function fromNullable<E>(e: Lazy<E>): <A>(a: A) => Either<E, NonNullable<A>>;
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 */
export declare function fromNullable_<A, E>(a: A, e: Lazy<E>): Either<E, NonNullable<A>>;
/**
 * Construct `Either[E, A]` from `Option[A]` constructing `E` with `onNone`
 *
 * @ets_data_first fromOption_
 */
export declare function fromOption<E>(onNone: () => E): <A>(ma: Option<A>) => Either<E, A>;
/**
 * Construct `Either[E, A]` from `Option[A]` constructing `E` with `onNone`
 */
export declare function fromOption_<A, E>(ma: Option<A>, onNone: () => E): Either<E, A>;
/**
 * Construct `Either[E, A]` by applying a predicate to `A` and constructing
 * `E` if the predicate is false
 *
 * @ets_data_first fromPredicate_
 */
export declare function fromPredicate<E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Either<E, B>;
export declare function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<E, A>;
/**
 * Construct `Either[E, A]` by applying a predicate to `A` and constructing
 * `E` if the predicate is false
 */
export declare function fromPredicate_<E, A, B extends A>(a: A, refinement: Refinement<A, B>, onFalse: (a: A) => E): Either<E, B>;
export declare function fromPredicate_<E, A>(a: A, predicate: Predicate<A>, onFalse: (a: A) => E): Either<E, A>;
/**
 * Get `A` or in case self is left return `onLeft` result
 *
 * @ets_data_first getOrElse_
 */
export declare function getOrElse<E, A>(onLeft: (e: E) => A): <B>(self: Either<E, B>) => A | B;
/**
 * Get `A` or in case self is left return `onLeft` result
 */
export declare function getOrElse_<E, A, B>(self: Either<E, B>, onLeft: (e: E) => A): A | B;
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 */
export declare function isLeft<E, A>(ma: Either<E, A>): ma is Left<E>;
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 */
export declare function isRight<E, A>(ma: Either<E, A>): ma is Right<A>;
/**
 * Use `A => B` to transform `Either[E, A]` to `Either[E, B]`
 */
export declare function map_<E, A, B>(fa: Either<E, A>, f: (a: A) => B): Either<E, B>;
/**
 * Use `A => B` to transform `Either[E, A]` to `Either[E, B]`
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B): <E>(fa: Either<E, A>) => Either<E, B>;
/**
 * Use `E => E1` to transform `Either[E, A]` to `Either[E1, A]`
 */
export declare function mapLeft_<E, A, G>(fea: Either<E, A>, f: (e: E) => G): Either<G, A>;
/**
 * Use `E => E1` to transform `Either[E, A]` to `Either[E1, A]`
 *
 * @ets_data_first mapLeft_
 */
export declare function mapLeft<E, G>(f: (e: E) => G): <A>(fa: Either<E, A>) => Either<G, A>;
/**
 * Merges `Left<E> | Right<B>` into `A | B`
 */
export declare function merge<E, A>(self: Either<E, A>): E | A;
/**
 * Alternatively run onLeft
 *
 * @ets_data_first orElse_
 */
export declare function orElse<E, A, M>(onLeft: (e: E) => Either<M, A>): <B>(ma: Either<E, B>) => Either<M, A | B>;
/**
 * Alternatively run onLeft
 */
export declare function orElse_<E, A, B, M>(ma: Either<E, A>, onLeft: (e: E) => Either<M, B>): Either<M, A | B>;
/**
 * Alternatively run onLeft returning
 *
 * @ets_data_first orElseEither_
 */
export declare function orElseEither<E, B, M>(onLeft: (e: E) => Either<M, B>): <A>(ma: Either<E, A>) => Either<M, Either<A, B>>;
/**
 * Alternatively run onLeft returning
 */
export declare function orElseEither_<E, A, B, M>(ma: Either<E, A>, onLeft: (e: E) => Either<M, B>): Either<M, Either<A, B>>;
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 */
export declare function parseJSON_<E>(s: string, onError: (reason: unknown) => E): Either<E, unknown>;
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @ets_data_first parseJSON_
 */
export declare function parseJSON<E>(onError: (reason: unknown) => E): (s: string) => Either<E, unknown>;
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 */
export declare function stringifyJSON_<E>(u: unknown, onError: (reason: unknown) => E): Either<E, string>;
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @ets_data_first stringifyJSON_
 */
export declare function stringifyJSON<E>(onError: (reason: unknown) => E): (u: unknown) => Either<E, string>;
/**
 * Inverts `Either[E, A]` into `Either[A, E]`
 */
export declare function swap<E, A>(ma: Either<E, A>): Either<A, E>;
/**
 * Default value for the `onError` argument of `tryCatch`
 */
export declare function toError(e: unknown): Error;
/**
 * Constructs a new `Either` from a function that might throw
 */
export declare function tryCatch<E, A>(f: Lazy<A>, onError: (e: unknown) => E): Either<E, A>;
/**
 * Compact types `Either<E, A> | Either<E2, B> = Either<E | E2, A | B>`
 *
 * @ets_optimize identity
 */
export declare function compact<E extends Either<any, any>>(_: E): [E] extends [Either<infer L, infer R>] ? Either<L, R> : E;
/**
 * Reduce a value `b` through an `Either`
 */
export declare function reduce_<E, A, B>(fa: Either<E, A>, b: B, f: (b: B, a: A) => B): B;
/**
 * Reduce a value `b` through an `Either`
 *
 * @ets_data_first reduce_
 */
export declare function reduce<A, B>(b: B, f: (b: B, a: A) => B): <E>(fa: Either<E, A>) => B;
/**
 * Reduce a value `b` through an `Either` in inverted order
 *
 * @ets_data_first reduceRight_
 */
export declare function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): <E>(fa: Either<E, A>) => B;
/**
 * Reduce a value `b` through an `Either` in inverted order
 */
export declare function reduceRight_<E, A, B>(fa: Either<E, A>, b: B, f: (a: A, b: B) => B): B;
//# sourceMappingURL=core.d.ts.map