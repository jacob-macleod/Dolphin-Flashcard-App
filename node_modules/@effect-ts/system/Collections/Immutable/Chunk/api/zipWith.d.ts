import type { Chunk } from "../definition.js";
/**
 * Zips this chunk with the specified chunk using the specified combiner.
 */
export declare function zipWith_<A, B, C>(self: Chunk<A>, that: Chunk<B>, f: (a: A, b: B) => C): Chunk<C>;
/**
 * Zips this chunk with the specified chunk using the specified combiner.
 *
 * @ets_data_first zipWith_
 */
export declare function zipWith<A, B, C>(that: Chunk<B>, f: (a: A, b: B) => C): (self: Chunk<A>) => Chunk<C>;
//# sourceMappingURL=zipWith.d.ts.map