import * as A from "@effect-ts/system/Collections/Immutable/Array";
import type { NonEmptyArray } from "@effect-ts/system/Collections/Immutable/NonEmptyArray";
import type { Associative } from "../../../Associative/index.js";
import type { Equal } from "../../../Equal/index.js";
import * as Ord from "../../../Ord/index.js";
import type { URI } from "../../../Prelude/index.js";
import * as P from "../../../Prelude/index.js";
import type { Show } from "../../../Show/index.js";
export * from "@effect-ts/system/Collections/Immutable/NonEmptyArray";
/**
 * `ForEachWithIndex`'s `forEachWithIndexF` function
 */
export declare const forEachWithIndexF: P.ForEachWithIndexFn<[URI<"NonEmptyArray", {}>], P.Auto>;
/**
 * `ForEach`'s `forEachF` function
 */
export declare const forEachF: P.ForeachFn<[URI<"NonEmptyArray", {}>], P.Auto>;
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `NonEmptyArray<A>`.
 */
export declare function elem<A>(E: Equal<A>): (a: A) => (as: NonEmptyArray<A>) => boolean;
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `NonEmptyArray<A>`.
 */
export declare function elem_<A>(E: Equal<A>): (as: NonEmptyArray<A>, a: A) => boolean;
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function difference_<A>(E: Equal<A>): (xs: NonEmptyArray<A>, ys: NonEmptyArray<A>) => A.Array<A>;
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function difference<A>(E: Equal<A>): (ys: NonEmptyArray<A>) => (xs: NonEmptyArray<A>) => A.Array<A>;
/**
 * Derives an `Equal` over the `NonEmptyArray` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */
export declare function getEqual<A>(E: Equal<A>): Equal<NonEmptyArray<A>>;
/**
 * Returns a `Ord` for `NonEmptyArray<A>` given `Ord<A>`
 */
export declare function getOrd<A>(O: Ord.Ord<A>): Ord.Ord<NonEmptyArray<A>>;
/**
 * Returns a `Show` for `NonEmptyArray<A>` given `Show<A>`
 */
export declare function getShow<A>(S: Show<A>): Show<NonEmptyArray<A>>;
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function intersection_<A>(E: Equal<A>): (xs: NonEmptyArray<A>, ys: NonEmptyArray<A>) => A.Array<A>;
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function intersection<A>(E: Equal<A>): (ys: NonEmptyArray<A>) => (xs: NonEmptyArray<A>) => A.Array<A>;
/**
 * Fold Identity with a mapping function
 */
export declare function foldMap<M>(M: Associative<M>): <A>(f: (a: A) => M) => (fa: NonEmptyArray<A>) => M;
/**
 * Fold Identity with a mapping function
 */
export declare function foldMap_<M>(M: Associative<M>): <A>(fa: NonEmptyArray<A>, f: (a: A) => M) => M;
/**
 * Fold Identity with a mapping function that consider also the index
 */
export declare function foldMapWithIndex<M>(M: Associative<M>): <A>(f: (i: number, a: A) => M) => (fa: NonEmptyArray<A>) => M;
/**
 * Fold Identity with a mapping function that consider also the index
 */
export declare function foldMapWithIndex_<M>(M: Associative<M>): <A>(fa: NonEmptyArray<A>, f: (i: number, a: A) => M) => M;
/**
 * Sort the elements of an array in increasing order
 */
export declare function sort<A>(O: Ord.Ord<A>): (as: NonEmptyArray<A>) => NonEmptyArray<A>;
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 */
export declare function sortBy<A>(ords: NonEmptyArray<Ord.Ord<A>>): (as: NonEmptyArray<A>) => NonEmptyArray<A>;
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */
export declare function union<A>(E: Equal<A>): (xs: NonEmptyArray<A>, ys: NonEmptyArray<A>) => NonEmptyArray<A>;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 */
export declare function uniq<A>(E: Equal<A>): (as: NonEmptyArray<A>) => NonEmptyArray<A>;
/**
 * Get an Associative instance for NonEmptyArray
 */
export declare function getAssociative<A>(): Associative<NonEmptyArray<A>>;
//# sourceMappingURL=operations.d.ts.map