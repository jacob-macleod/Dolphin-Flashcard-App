import * as O from "../../../../Option/index.js";
import * as Chunk from "../core.js";
/**
 * Returns the last index of the element that satisfies the predicate.
 */
export declare function findLastIndex_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): O.Option<number>;
/**
 * Returns the last index of the element that satisfies the predicate.
 *
 * @ets_data_first findLastIndex_
 */
export declare function findLastIndex<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => O.Option<number>;
//# sourceMappingURL=findLastIndex.d.ts.map