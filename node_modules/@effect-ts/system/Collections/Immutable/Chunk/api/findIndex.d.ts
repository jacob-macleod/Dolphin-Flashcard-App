import * as O from "../../../../Option/index.js";
import type * as Chunk from "../core.js";
/**
 * Returns the index of the first element that satisfies the predicate.
 */
export declare function findIndex_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): O.Option<number>;
/**
 * Returns the index of the first element that satisfies the predicate.
 *
 * @ets_data_first findIndex_
 */
export declare function findIndex<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => O.Option<number>;
//# sourceMappingURL=findIndex.d.ts.map