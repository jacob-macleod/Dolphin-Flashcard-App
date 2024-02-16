import type * as Chunk from "../core.js";
/**
 * Folds over the elements in this chunk from the left.
 */
export declare function reduceWithIndex_<A, S>(self: Chunk.Chunk<A>, s: S, f: (index: number, s: S, a: A) => S): S;
/**
 * Folds over the elements in this chunk from the left.
 *
 * @ets_data_first reduceWithIndex_
 */
export declare function reduceWithIndex<A, S>(s: S, f: (index: number, s: S, a: A) => S): (self: Chunk.Chunk<A>) => S;
//# sourceMappingURL=reduceWithIndex.d.ts.map