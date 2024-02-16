import type * as Chunk from "../core.js";
/**
 * Folds over the elements in this chunk from the right.
 */
export declare function reduceRightWithIndex_<A, S>(self: Chunk.Chunk<A>, s: S, f: (index: number, a: A, s: S) => S): S;
/**
 * Folds over the elements in this chunk from the right.
 *
 * @ets_data_first reduceRightWithIndex_
 */
export declare function reduceRightWithIndex<A, S>(s: S, f: (index: number, a: A, s: S) => S): (self: Chunk.Chunk<A>) => S;
//# sourceMappingURL=reduceRightWithIndex.d.ts.map