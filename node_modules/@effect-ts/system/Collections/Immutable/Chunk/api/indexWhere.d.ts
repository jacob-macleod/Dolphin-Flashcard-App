import type * as Chunk from "../core.js";
/**
 * Returns the first index for which the given predicate is satisfied.
 */
export declare function indexWhere_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): number;
/**
 * Returns the first index for which the given predicate is satisfied.
 *
 * @ets_data_first indexWhere_
 */
export declare function indexWhere<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => number;
//# sourceMappingURL=indexWhere.d.ts.map