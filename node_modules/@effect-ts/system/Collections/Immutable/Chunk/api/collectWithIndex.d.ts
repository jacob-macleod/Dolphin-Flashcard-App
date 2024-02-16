import * as O from "../../../../Option/index.js";
import * as Chunk from "../core.js";
/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 */
export declare function collectWithIndex_<A, B>(self: Chunk.Chunk<A>, f: (index: number, a: A) => O.Option<B>): Chunk.Chunk<B>;
/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 *
 * @ets_data_first collectWithIndex_
 */
export declare function collectWithIndex<A, B>(f: (index: number, a: A) => O.Option<B>): (self: Chunk.Chunk<A>) => Chunk.Chunk<B>;
//# sourceMappingURL=collectWithIndex.d.ts.map