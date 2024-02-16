import * as Chunk from "../core.js";
/**
 * Takes all elements so long as the predicate returns true.
 */
export declare function takeWhile_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): Chunk.Chunk<A>;
/**
 * Takes all elements so long as the predicate returns true.
 *
 * @ets_data_first takeWhile_
 */
export declare function takeWhile<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => Chunk.Chunk<A>;
//# sourceMappingURL=takeWhile.d.ts.map