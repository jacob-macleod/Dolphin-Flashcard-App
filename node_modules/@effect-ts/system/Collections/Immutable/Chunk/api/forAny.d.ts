import type * as Chunk from "../core.js";
/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 */
export declare function forAny_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): boolean;
/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 *
 * @ets_data_first forAll_
 */
export declare function forAny<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => boolean;
//# sourceMappingURL=forAny.d.ts.map