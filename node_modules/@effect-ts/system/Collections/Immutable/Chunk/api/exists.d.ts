import type * as Chunk from "../core.js";
/**
 * Determines whether a predicate is satisfied for at least one element of this chunk.
 */
export declare function exists_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): boolean;
/**
 * Determines whether a predicate is satisfied for at least one element of this chunk.
 *
 * @ets_data_first exists_
 */
export declare function exists<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => boolean;
//# sourceMappingURL=exists.d.ts.map