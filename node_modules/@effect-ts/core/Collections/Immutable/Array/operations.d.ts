import type { Array } from "@effect-ts/system/Collections/Immutable/Array";
import type { Predicate } from "@effect-ts/system/Function";
import type { Either } from "../../../Either/index.js";
import type { Equal } from "../../../Equal/index.js";
import type { Identity } from "../../../Identity/index.js";
import * as Ord from "../../../Ord/index.js";
import type { URI } from "../../../Prelude/index.js";
import * as P from "../../../Prelude/index.js";
import type { Show } from "../../../Show/index.js";
import type { PredicateWithIndex } from "../../../Utils/index.js";
import * as Tp from "../Tuple/index.js";
export * from "@effect-ts/system/Collections/Immutable/Array";
/**
 * `ForEachWithIndex`'s `forEachWithIndexF` function
 */
export declare const forEachWithIndexF: P.ForEachWithIndexFn<[URI<"Array", {}>], P.Auto>;
/**
 * `ForEach`'s `forEachF` function
 */
export declare const forEachF: P.ForeachFn<[URI<"Array", {}>], P.Auto>;
/**
 * `Wilt`'s `separateF` function
 */
export declare const separateF: P.Wilt<[URI<"Array", {}>], P.Auto>;
/**
 * `Wilt`'s `separateF` function
 */
export declare const separateWithIndexF: P.WiltWithIndex<[URI<"Array", {}>], P.Auto>;
/**
 * `Wither`'s `compactF` function
 */
export declare const compactF: P.Wither<[URI<"Array", {}>], P.Auto>;
/**
 * `WitherWithIndex`'s `compactWithIndexF` function
 */
export declare const compactWithIndexF: P.WitherWithIndex<[URI<"Array", {}>], P.Auto>;
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 */
export declare function elem<A>(E: Equal<A>): (a: A) => (as: Array<A>) => boolean;
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 */
export declare function elem_<A>(E: Equal<A>): (as: Array<A>, a: A) => boolean;
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function difference_<A>(E: Equal<A>): (xs: Array<A>, ys: Array<A>) => Array<A>;
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function difference<A>(E: Equal<A>): (ys: Array<A>) => (xs: Array<A>) => Array<A>;
/**
 * Derives an `Equal` over the `Array` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */
export declare function getEqual<A>(E: Equal<A>): Equal<Array<A>>;
/**
 * Returns a `Identity` for `Array<A>`
 */
export declare function getIdentity<A>(): Identity<Array<A>>;
/**
 * Returns a `Ord` for `Array<A>` given `Ord<A>`
 */
export declare function getOrd<A>(O: Ord.Ord<A>): Ord.Ord<Array<A>>;
/**
 * Returns a `Show` for `Array<A>` given `Show<A>`
 */
export declare function getShow<A>(S: Show<A>): Show<Array<A>>;
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function intersection_<A>(E: Equal<A>): (xs: Array<A>, ys: Array<A>) => Array<A>;
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function intersection<A>(E: Equal<A>): (ys: Array<A>) => (xs: Array<A>) => Array<A>;
/**
 * Fold Identity with a mapping function
 */
export declare function foldMap<M>(M: Identity<M>): <A>(f: (a: A) => M) => (fa: readonly A[]) => M;
/**
 * Fold Identity with a mapping function
 */
export declare function foldMap_<M>(M: Identity<M>): <A>(fa: readonly A[], f: (a: A) => M) => M;
/**
 * Fold Identity with a mapping function that consider also the index
 */
export declare function foldMapWithIndex<M>(M: Identity<M>): <A>(f: (i: number, a: A) => M) => (fa: readonly A[]) => M;
/**
 * Fold Identity with a mapping function that consider also the index
 */
export declare function foldMapWithIndex_<M>(M: Identity<M>): <A>(fa: readonly A[], f: (i: number, a: A) => M) => M;
/**
 * Sort the elements of an array in increasing order
 */
export declare function sort<A>(O: Ord.Ord<A>): (as: Array<A>) => Array<A>;
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 */
export declare function sortBy<A>(ords: Array<Ord.Ord<A>>): (as: Array<A>) => Array<A>;
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */
export declare function union_<A>(E: Equal<A>): (xs: Array<A>, ys: Array<A>) => Array<A>;
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */
export declare function union<A>(E: Equal<A>): (ys: Array<A>) => (xs: Array<A>) => Array<A>;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 */
export declare function uniq<A>(E: Equal<A>): (as: Array<A>) => Array<A>;
/**
 * Separate elements based on a apredicate
 */
export declare function partition<A>(predicate: Predicate<A>): (fa: readonly A[]) => Tp.Tuple<[readonly A[], readonly A[]]>;
/**
 * Separate elements based on a apredicate
 */
export declare function partition_<A>(fa: readonly A[], predicate: Predicate<A>): Tp.Tuple<[readonly A[], readonly A[]]>;
/**
 * Separate elements based on a map function
 */
export declare function partitionMap<A, B, C>(f: (a: A) => Either<B, C>): (fa: readonly A[]) => Tp.Tuple<[readonly B[], readonly C[]]>;
/**
 * Separate elements based on a map function
 */
export declare function partitionMap_<A, B, C>(fa: readonly A[], f: (a: A) => Either<B, C>): Tp.Tuple<[readonly B[], readonly C[]]>;
/**
 * Separate elements based on a map function that also carry the index
 */
export declare function partitionMapWithIndex_<A, B, C>(fa: readonly A[], f: (i: number, a: A) => Either<B, C>): Tp.Tuple<[readonly B[], readonly C[]]>;
/**
 * Separate elements based on a map function that also carry the index
 */
export declare function partitionMapWithIndex<A, B, C>(f: (i: number, a: A) => Either<B, C>): (fa: readonly A[]) => Tp.Tuple<[readonly B[], readonly C[]]>;
/**
 * Separate elements based on a predicate that also carry the index
 */
export declare function partitionWithIndex<A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: readonly A[]) => Tp.Tuple<[readonly A[], readonly A[]]>;
/**
 * Separate elements based on a predicate that also carry the index
 */
export declare function partitionWithIndex_<A>(fa: readonly A[], predicateWithIndex: PredicateWithIndex<number, A>): Tp.Tuple<[readonly A[], readonly A[]]>;
//# sourceMappingURL=operations.d.ts.map