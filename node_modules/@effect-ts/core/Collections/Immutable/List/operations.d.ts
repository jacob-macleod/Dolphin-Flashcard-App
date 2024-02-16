import * as List from "@effect-ts/system/Collections/Immutable/List";
import type { Equal } from "../../../Equal/index.js";
import type { Identity } from "../../../Identity/index.js";
import type { Ord } from "../../../Ord/index.js";
import type { URI } from "../../../Prelude/index.js";
import * as P from "../../../Prelude/index.js";
import type { Show } from "../../../Show/index.js";
export * from "@effect-ts/system/Collections/Immutable/List";
/**
 * `ForEach`'s `forEachF` function
 */
export declare const forEachF: P.ForeachFn<[URI<"List", {}>], P.Auto>;
/**
 * Sort the given list by passing each value through the function and
 * comparing the resulting value.
 *
 * Performs a stable sort.
 *
 * @complexity O(n * log(n))
 */
export declare function sortBy<B>(O: Ord<B>): <A>(f: (a: A) => B) => (l: List.List<A>) => List.List<A>;
/**
 * Sort the given list by passing each value through the function and
 * comparing the resulting value.
 *
 * Performs a stable sort.
 *
 * @complexity O(n * log(n))
 */
export declare function sortBy_<B>(O: Ord<B>): <A>(l: List.List<A>, f: (a: A) => B) => List.List<A>;
/**
 * `Wiltable`'s `separateF` function
 */
export declare const separateF: P.Wilt<[URI<"List", {}>], P.Auto>;
/**
 * `Wither`'s `compactF` function
 */
export declare const compactF: P.Wither<[URI<"List", {}>], P.Auto>;
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 */
export declare function elem<A>(E: Equal<A>): (a: A) => (as: List.List<A>) => boolean;
/**
 * Test if a value is a member of a list. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an list of type `List<A>`.
 */
export declare function elem_<A>(E: Equal<A>): (as: List.List<A>, a: A) => boolean;
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function difference_<A>(E: Equal<A>): (xs: List.List<A>, ys: List.List<A>) => List.List<A>;
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function difference<A>(E: Equal<A>): (ys: List.List<A>) => (xs: List.List<A>) => List.List<A>;
/**
 * Derives an `Equal` over the `Array` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */
export declare function getEqual<A>(E: Equal<A>): Equal<List.List<A>>;
/**
 * Returns a `Identity` for `List<A>`
 */
export declare function getIdentity<A>(): Identity<List.List<A>>;
/**
 * Returns a `Show` for `Array<A>` given `Show<A>`
 */
export declare function getShow<A>(S: Show<A>): Show<List.List<A>>;
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first list.
 */
export declare function intersection_<A>(E: Equal<A>): (xs: List.List<A>, ys: List.List<A>) => List.List<A>;
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function intersection<A>(E: Equal<A>): (ys: List.List<A>) => (xs: List.List<A>) => List.List<A>;
/**
 * Fold Identity with a mapping function that consider also the index
 */
export declare function foldMap_<M>(M: Identity<M>): <A>(fa: List.List<A>, f: (a: A) => M) => M;
/**
 * Fold Identity with a mapping function that consider also the index
 */
export declare function foldMap<M>(M: Identity<M>): <A>(f: (a: A) => M) => (fa: List.List<A>) => M;
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */
export declare function union_<A>(E: Equal<A>): (xs: List.List<A>, ys: List.List<A>) => List.List<A>;
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */
export declare function union<A>(E: Equal<A>): (ys: List.List<A>) => (xs: List.List<A>) => List.List<A>;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 */
export declare function uniq<A>(E: Equal<A>): (as: List.List<A>) => List.List<A>;
//# sourceMappingURL=operations.d.ts.map