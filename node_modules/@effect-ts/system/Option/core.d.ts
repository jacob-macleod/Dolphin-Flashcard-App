import * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Either } from "../Either/core.js";
import type { Lazy, Predicate, Refinement } from "../Function/core.js";
import * as St from "../Structural/index.js";
import type { HasUnify } from "../Utils/index.js";
/**
 * Definitions
 */
export declare class None implements HasUnify {
    readonly _tag = "None";
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
}
export declare class Some<A> implements HasUnify {
    readonly value: A;
    readonly _tag = "Some";
    constructor(value: A);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
}
export declare type Option<A> = None | Some<A>;
/**
 * Constructs none
 */
export declare const none: Option<never>;
/**
 * Constructs none
 */
export declare function emptyOf<A>(): Option<A>;
/**
 * Constructs Some(A)
 */
export declare function some<A>(a: A): Option<A>;
/**
 * Classic applicative
 */
export declare function ap_<A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B>;
/**
 * Classic applicative
 *
 * @ets_data_first ap_
 */
export declare function ap<A>(fa: Option<A>): <B>(fab: Option<(a: A) => B>) => Option<B>;
/**
 * Zips `Option[A]` and `Option[B]` into `Option[(A, B)]`
 */
export declare function zip_<A, B>(fa: Option<A>, fb: Option<B>): Option<Tp.Tuple<[A, B]>>;
/**
 * Zips `Option[A]` and `Option[B]` into `Option[(A, B)]`
 *
 * @ets_data_first zip_
 */
export declare function zip<B>(fb: Option<B>): <A>(fa: Option<A>) => Option<Tp.Tuple<[A, B]>>;
/**
 * Apply both and return first
 *
 * @ets_data_first zipFirst_
 */
export declare function zipFirst<B>(fb: Option<B>): <A>(fa: Option<A>) => Option<A>;
/**
 * Apply both and return first
 */
export declare function zipFirst_<A, B>(fa: Option<A>, fb: Option<B>): Option<A>;
/**
 * Apply both and return second
 *
 * @ets_data_first zipSecond_
 */
export declare function zipSecond<B>(fb: Option<B>): <A>(fa: Option<A>) => Option<B>;
/**
 * Apply both and return second
 */
export declare function zipSecond_<A, B>(fa: Option<A>, fb: Option<B>): Option<B>;
/**
 * Builds a new option constructed using the value of self
 */
export declare function chain_<A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B>;
/**
 * Builds a new option constructed using the value of self
 *
 * @ets_data_first chain_
 */
export declare function chain<A, B>(f: (a: A) => Option<B>): (self: Option<A>) => Option<B>;
/**
 * Like chain but ignores the constructed outout
 *
 * @ets_data_first tap_
 */
export declare function tap<A>(f: (a: A) => Option<any>): (ma: Option<A>) => Option<A>;
/**
 * Like chain but ignores the constructed outout
 */
export declare function tap_<A>(ma: Option<A>, f: (a: A) => Option<any>): Option<A>;
/**
 * Flattens nested options
 */
export declare function flatten<A>(fa: Option<Option<A>>): Option<A>;
/**
 * Wraps this option into a second one
 */
export declare function duplicate<A>(ma: Option<A>): Option<Option<A>>;
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @ets_data_first exists_
 */
export declare function exists<A>(predicate: Predicate<A>): (ma: Option<A>) => boolean;
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 */
export declare function exists_<A>(ma: Option<A>, predicate: Predicate<A>): boolean;
/**
 * Apply `Option[A] => B` in case self is some returning `Option[B]`
 *
 * @ets_data_first extend_
 */
export declare function extend<A, B>(f: (fa: Option<A>) => B): (self: Option<A>) => Option<B>;
/**
 * Apply `Option[A] => B` in case self is some returning `Option[B]`
 */
export declare function extend_<A, B>(self: Option<A>, f: (fa: Option<A>) => B): Option<B>;
/**
 * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @ets_data_first fold_
 */
export declare function fold<A, B, C>(onNone: () => B, onSome: (a: A) => C): (ma: Option<A>) => B | C;
/**
 * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 */
export declare function fold_<A, B, C>(ma: Option<A>, onNone: () => B, onSome: (a: A) => C): B | C;
/**
 * Constructs `Option[A]` from `Either[E, A]` discarding `E`
 */
export declare function fromEither<E, A>(ma: Either<E, A>): Option<A>;
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`
 */
export declare function fromNullable<A>(a: A): Option<NonNullable<A>>;
/**
 * Returns a smart constructor based on the given predicate
 *
 * @ets_data_first fromPredicate_
 */
export declare function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>;
/**
 * Returns a smart constructor based on the given predicate
 *
 * @ets_data_first fromPredicate_
 */
export declare function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>;
/**
 * Returns a smart constructor based on the given predicate
 */
export declare function fromPredicate_<A, B extends A>(a: A, refinement: Refinement<A, B>): Option<B>;
/**
 * Returns a smart constructor based on the given predicate
 */
export declare function fromPredicate_<A>(a: A, predicate: Predicate<A>): Option<A>;
/**
 * Returns an `E` value if possible
 */
export declare function getLeft<E, A>(ma: Either<E, A>): Option<E>;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @ets_data_first getOrElse_
 */
export declare function getOrElse<B>(onNone: () => B): <A>(ma: Option<A>) => A | B;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @ets_data_first getOrElseS_
 */
export declare function getOrElseS<B>(onNone: () => B): (ma: Option<B>) => B;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 */
export declare function getOrElse_<A, B>(ma: Option<A>, onNone: () => B): A | B;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 */
export declare function getOrElseS_<A>(ma: Option<A>, onNone: () => A): A;
/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 */
export declare function getRefinement<A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B>;
/**
 * Returns an `A` value if possible
 */
export declare function getRight<E, A>(ma: Either<E, A>): Option<A>;
/**
 * Returns `true` if the option is `None`, `false` otherwise
 */
export declare function isNone<A>(fa: Option<A>): fa is None;
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 */
export declare function isSome<A>(fa: Option<A>): fa is Some<A>;
/**
 * Use `A => B` to transform `Option[A]` to `Option[B]`
 */
export declare function map_<A, B>(ma: Option<A>, f: (a: A) => B): Option<B>;
/**
 * Use `A => B` to transform `Option[A]` to `Option[B]`
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B): (fa: Option<A>) => Option<B>;
/**
 * This is `chain` + `fromNullable`, useful when working with optional values
 */
export declare function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: Option<A>) => Option<B>;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 */
export declare function toNullable<A>(ma: Option<A>): A | null;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 */
export declare function toUndefined<A>(ma: Option<A>): A | undefined;
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
 * `Some`
 */
export declare function tryCatch<A>(f: Lazy<A>): Option<A>;
export declare const PartialExceptionTypeId: unique symbol;
export declare type PartialExceptionTypeId = typeof PartialExceptionTypeId;
export declare class PartialException {
    readonly _typeId: PartialExceptionTypeId;
}
/**
 * Simulates a partial function
 */
export declare function partial<ARGS extends any[], A>(f: (miss: <X>() => X) => (...args: ARGS) => A): (...args: ARGS) => Option<A>;
//# sourceMappingURL=core.d.ts.map