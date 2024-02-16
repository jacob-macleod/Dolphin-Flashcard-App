import type * as Chunk from "../core.js";
/**
 * Returns the first index for which the given predicate is satisfied after or at some given index.
 */
export declare function indexWhereFrom_<A>(self: Chunk.Chunk<A>, from: number, f: (a: A) => boolean): number;
/**
 * Returns the first index for which the given predicate is satisfied after or at some given index.
 *
 * @ets_data_first indexWhereFrom_
 */
export declare function indexWhereFrom<A>(from: number, f: (a: A) => boolean): (self: Chunk.Chunk<A>) => number;
//# sourceMappingURL=indexWhereFrom.d.ts.map