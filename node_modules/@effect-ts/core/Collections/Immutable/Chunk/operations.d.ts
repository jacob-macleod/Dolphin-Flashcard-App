import * as Chunk from "@effect-ts/system/Collections/Immutable/Chunk";
import * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import type { Predicate } from "@effect-ts/system/Function";
import type { Either } from "../../../Either/index.js";
import type { Equal } from "../../../Equal/index.js";
import type { Identity } from "../../../Identity/index.js";
import type { ChunkURI } from "../../../Modules/index.js";
import * as Ord from "../../../Ord/index.js";
import type { URI } from "../../../Prelude/index.js";
import * as P from "../../../Prelude/index.js";
import type { Show } from "../../../Show/index.js";
import type { PredicateWithIndex } from "../../../Utils/index.js";
export * from "@effect-ts/system/Collections/Immutable/Chunk";
/**
 * `ForEachWithIndex`'s `forEachWithIndexF` function
 */
export declare const forEachWithIndexF: P.ForEachWithIndexFn<[URI<"Chunk", {}>], P.Auto>;
/**
 * `ForEach`'s `forEachF` function
 */
export declare const forEachF: P.ForeachFn<[URI<"Chunk", {}>], P.Auto>;
/**
 * `ForEach`'s `forEachF` function
 */
export declare const forEachF_: P.ForeachFn_<[URI<ChunkURI>]>;
/**
 * `Wilt`'s `separateF` function
 */
export declare const separateF: P.Wilt<[URI<"Chunk", {}>], P.Auto>;
/**
 * `Wilt`'s `separateF` function
 */
export declare const separateWithIndexF: P.WiltWithIndex<[URI<"Chunk", {}>], P.Auto>;
/**
 * `Wither`'s `compactF` function
 */
export declare const compactF: P.Wither<[URI<"Chunk", {}>], P.Auto>;
/**
 * `WitherWithIndex`'s `compactWithIndexF` function
 */
export declare const compactWithIndexF: P.WitherWithIndex<[URI<"Chunk", {}>], P.Auto>;
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Chunk<A>`.
 *
 * @ets_data_first elem_
 */
export declare function elem<A>(E: Equal<A>, a: A): (as: Chunk.Chunk<A>) => boolean;
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Chunk<A>`.
 */
export declare function elem_<A>(as: Chunk.Chunk<A>, E: Equal<A>, a: A): boolean;
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function difference_<A>(xs: Chunk.Chunk<A>, E: Equal<A>, ys: Chunk.Chunk<A>): Chunk.Chunk<A>;
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @ets_data_first difference_
 */
export declare function difference<A>(E: Equal<A>, ys: Chunk.Chunk<A>): (xs: Chunk.Chunk<A>) => Chunk.Chunk<A>;
/**
 * Derives an `Equal` over the `Chunk` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */
export declare function getEqual<A>(E: Equal<A>): Equal<Chunk.Chunk<A>>;
/**
 * Returns a `Identity` for `Chunk<A>`
 */
export declare function getIdentity<A>(): Identity<Chunk.Chunk<A>>;
/**
 * Returns a `Ord` for `Chunk<A>` given `Ord<A>`
 */
export declare function getOrd<A>(O: Ord.Ord<A>): Ord.Ord<Chunk.Chunk<A>>;
/**
 * Returns a `Show` for `Chunk<A>` given `Show<A>`
 */
export declare function getShow<A>(S: Show<A>): Show<Chunk.Chunk<A>>;
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */
export declare function intersection_<A>(xs: Chunk.Chunk<A>, E: Equal<A>, ys: Chunk.Chunk<A>): Chunk.Chunk<A>;
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @ets_data_first intersection_
 */
export declare function intersection<A>(E: Equal<A>, ys: Chunk.Chunk<A>): (xs: Chunk.Chunk<A>) => Chunk.Chunk<A>;
/**
 * Fold Identity with a mapping function
 */
export declare function foldMap<M>(M: Identity<M>): <A>(f: (a: A) => M) => (fa: Chunk.Chunk<A>) => M;
/**
 * Fold Identity with a mapping function
 */
export declare function foldMap_<M, A>(fa: Chunk.Chunk<A>, M: Identity<M>, f: (a: A) => M): M;
/**
 * Fold Identity with a mapping function that consider also the index
 */
export declare function foldMapWithIndex<M>(M: Identity<M>): <A>(f: (i: number, a: A) => M) => (fa: Chunk.Chunk<A>) => M;
/**
 * Fold Identity with a mapping function that consider also the index
 */
export declare function foldMapWithIndex_<M, A>(fa: Chunk.Chunk<A>, M: Identity<M>, f: (i: number, a: A) => M): M;
/**
 * Sort the elements of an array in increasing order
 *
 * @ets_data_first sort_
 */
export declare function sort<A>(O: Ord.Ord<A>): (as: Chunk.Chunk<A>) => Chunk.Chunk<A>;
/**
 * Sort the elements of an array in increasing order
 */
export declare function sort_<A>(as: Chunk.Chunk<A>, O: Ord.Ord<A>): Chunk.Chunk<A>;
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 *
 * @ets_data_first sortBy_
 */
export declare function sortBy<A>(ords: Array<Ord.Ord<A>>): (as: Chunk.Chunk<A>) => Chunk.Chunk<A>;
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 */
export declare function sortBy_<A>(as: Chunk.Chunk<A>, ords: Array<Ord.Ord<A>>): Chunk.Chunk<A>;
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */
export declare function union_<A>(xs: Chunk.Chunk<A>, E: Equal<A>, ys: Chunk.Chunk<A>): Chunk.Chunk<A>;
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 *
 * @ets_data_first union_
 */
export declare function union<A>(E: Equal<A>, ys: Chunk.Chunk<A>): (xs: Chunk.Chunk<A>) => Chunk.Chunk<A>;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 */
export declare function uniq_<A>(as: Chunk.Chunk<A>, E: Equal<A>): Chunk.Chunk<A>;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @ets_data_first uniq_
 */
export declare function uniq<A>(E: Equal<A>): (as: Chunk.Chunk<A>) => Chunk.Chunk<A>;
/**
 * Separate elements based on a apredicate
 *
 * @ets_data_first partition_
 */
export declare function partition<A>(predicate: Predicate<A>): (fa: Chunk.Chunk<A>) => Tp.Tuple<[Chunk.Chunk<A>, Chunk.Chunk<A>]>;
/**
 * Separate elements based on a apredicate
 */
export declare function partition_<A>(fa: Chunk.Chunk<A>, predicate: Predicate<A>): Tp.Tuple<[Chunk.Chunk<A>, Chunk.Chunk<A>]>;
/**
 * Separate elements based on a map function that also carry the index
 */
export declare function partitionMapWithIndex_<A, B, C>(fa: Chunk.Chunk<A>, f: (i: number, a: A) => Either<B, C>): Tp.Tuple<[Chunk.Chunk<B>, Chunk.Chunk<C>]>;
/**
 * Separate elements based on a map function that also carry the index
 *
 * @ets_data_first partitionMapWithIndex_
 */
export declare function partitionMapWithIndex<A, B, C>(f: (i: number, a: A) => Either<B, C>): (fa: Chunk.Chunk<A>) => Tp.Tuple<[Chunk.Chunk<B>, Chunk.Chunk<C>]>;
/**
 * Separate elements based on a predicate that also carry the index
 *
 * @ets_data_first partitionWithIndex
 */
export declare function partitionWithIndex<A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: Chunk.Chunk<A>) => Tp.Tuple<[Chunk.Chunk<A>, Chunk.Chunk<A>]>;
/**
 * Separate elements based on a predicate that also carry the index
 */
export declare function partitionWithIndex_<A>(fa: Chunk.Chunk<A>, predicateWithIndex: PredicateWithIndex<number, A>): Tp.Tuple<[Chunk.Chunk<A>, Chunk.Chunk<A>]>;
//# sourceMappingURL=operations.d.ts.map