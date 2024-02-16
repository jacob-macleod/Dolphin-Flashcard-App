import type * as Chunk from "../core.js";
/**
 * Iterate over the chunk applying f
 */
export declare function forEach_<A, U>(self: Chunk.Chunk<A>, f: (a: A) => U): void;
/**
 * Iterate over the chunk applying f
 *
 * @ets_data_first forEach_
 */
export declare function forEach<A, U>(f: (a: A) => U): (self: Chunk.Chunk<A>) => void;
//# sourceMappingURL=forEach.d.ts.map