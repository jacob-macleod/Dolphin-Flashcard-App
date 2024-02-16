import type * as Chunk from "../core.js";
/**
 * Folds over the elements in this chunk from the left.
 */
export declare function reduce_<A, S>(self: Chunk.Chunk<A>, s: S, f: (s: S, a: A) => S): S;
/**
 * Folds over the elements in this chunk from the left.
 *
 * @ets_data_first reduce_
 */
export declare function reduce<A, S>(s: S, f: (s: S, a: A) => S): (self: Chunk.Chunk<A>) => S;
//# sourceMappingURL=reduce.d.ts.map