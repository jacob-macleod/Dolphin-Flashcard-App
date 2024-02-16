import type * as Chunk from "../core.js";
/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 */
export declare function forAll_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): boolean;
/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 *
 * @ets_data_first forAll_
 */
export declare function forAll<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => boolean;
//# sourceMappingURL=forAll.d.ts.map