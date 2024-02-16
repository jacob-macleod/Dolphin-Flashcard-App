import * as Chunk from "../core.js";
/**
 * Drops all elements so long as the predicate returns true.
 */
export declare function dropWhile_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): Chunk.Chunk<A>;
/**
 * Drops all elements so long as the predicate returns true.
 *
 * @ets_data_first dropWhile_
 */
export declare function dropWhile<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => Chunk.Chunk<A>;
//# sourceMappingURL=dropWhile.d.ts.map