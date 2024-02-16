import * as Chunk from "../core.js";
/**
 * Splits this chunk into `n` equally sized chunks.
 */
export declare function split_<A>(self: Chunk.Chunk<A>, n: number): Chunk.Chunk<Chunk.Chunk<A>>;
/**
 * Splits this chunk into `n` equally sized chunks.
 *
 * @ets_data_first split_
 */
export declare function split(n: number): <A>(self: Chunk.Chunk<A>) => Chunk.Chunk<Chunk.Chunk<A>>;
//# sourceMappingURL=split.d.ts.map