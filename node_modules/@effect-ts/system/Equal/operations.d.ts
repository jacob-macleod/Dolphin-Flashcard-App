import type * as A from "../Collections/Immutable/Array/index.js";
import type * as Tp from "../Collections/Immutable/Tuple/index.js";
import type * as E from "../Either/index.js";
import type { ForcedTuple } from "../Utils/index.js";
import type { Equal } from "./definition.js";
/**
 * Constructs an `Equal[A]` from a function. The instance will be optimized
 * to first compare the values for reference equality and then compare the
 * values for value equality.
 */
export declare function makeEqual<A>(f: (x: A, y: A) => boolean): Equal<A>;
/**
 * Equality for `Any` values. Note that since values of type `Any` contain
 * no information, all values of type `Any` can be treated as equal to each
 * other.
 */
export declare const any: Equal<unknown>;
/**
 * Equality for `Nothing` values. Note that since there are not values of
 * type `Nothing` the `equals` method of this instance can never be called
 * but it can be useful in deriving instances for more complex types.
 */
export declare const never: Equal<never>;
/**
 * Constructs an `Equal[(A, B)]` given an `Equal[A]` and `Equal[B]` by first
 * comparing the `A` values for equality and then comparing the `B` values
 * for equality, if necessary.
 */
export declare function both<B>(fb: Equal<B>): <A>(fa: Equal<A>) => Equal<Tp.Tuple<[A, B]>>;
/**
 * Constructs an `Equal[Either[A, B]]` given an `Equal[A]` and an
 * `Equal[B]`. The instance will compare the `Either[A, B]` values and if
 * both are `Right` or `Left` compare them for equality.
 */
export declare function orElseEither<B>(fb: () => Equal<B>): <A>(fa: Equal<A>) => Equal<E.Either<A, B>>;
/**
 * Constructs an `Equal[B]` given an `Equal[A]` and a function `f` to
 * transform a `B` value into an `A` value. The instance will convert each
 * `B` value into an `A` and the compare the `A` values for equality.
 */
export declare function contramap<A, B>(f: (a: B) => A): (fa: Equal<A>) => Equal<B>;
/**
 * Constructs an `Equal[A]` that uses the default notion of equality
 * embodied in the implementation of `equals` for values of type `A`.
 */
export declare function strict<A>(): Equal<A>;
/**
 * Equality for `number` values.
 */
export declare const number: Equal<number>;
/**
 * Equality for `string` values.
 */
export declare const string: Equal<string>;
/**
 * Equality for `symbol` values.
 */
export declare const symbol: Equal<symbol>;
/**
 * Equality for `boolean` values.
 */
export declare const boolean: Equal<boolean>;
/**
 * Equality for `Date` values.
 */
export declare const date: Equal<Date>;
/**
 * Derives an `Equal[Array[A]]` given an `Equal[A]`.
 */
export declare function array<A>(EqA: Equal<A>): Equal<A.Array<A>>;
/**
 * Given a tuple of `Equal`s returns a `Equal` for the tuple
 */
export declare function tuple<T extends ReadonlyArray<Equal<any>>>(...eqs: T): Equal<ForcedTuple<{
    [K in keyof T]: T[K] extends Equal<infer A> ? A : never;
}>>;
/**
 * Given a struct of `Equal`s returns a `Equal` for the struct
 */
export declare function struct<O extends Record<string, any>>(eqs: {
    [K in keyof O]: Equal<O[K]>;
}): Equal<O>;
//# sourceMappingURL=operations.d.ts.map