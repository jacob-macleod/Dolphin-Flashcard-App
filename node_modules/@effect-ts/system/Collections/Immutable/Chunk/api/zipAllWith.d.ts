import type { Chunk } from "../definition.js";
/**
 * Zips with chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk combined using the specified function
 * `both`. If one chunk is shorter than the other uses the specified
 * function `left` or `right` to map the element that does exist to the
 * result type.
 */
export declare function zipAllWith_<A, B, C, D, E>(self: Chunk<A>, that: Chunk<B>, f: (a: A, b: B) => C, left: (a: A) => D, right: (b: B) => E): Chunk<C | D | E>;
/**
 * Zips with chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk combined using the specified function
 * `both`. If one chunk is shorter than the other uses the specified
 * function `left` or `right` to map the element that does exist to the
 * result type.
 *
 * @ets_data_first zipAllWith_
 */
export declare function zipAllWith<A, B, C, D, E>(that: Chunk<B>, f: (a: A, b: B) => C, left: (a: A) => D, right: (b: B) => E): (self: Chunk<A>) => Chunk<C | D | E>;
//# sourceMappingURL=zipAllWith.d.ts.map