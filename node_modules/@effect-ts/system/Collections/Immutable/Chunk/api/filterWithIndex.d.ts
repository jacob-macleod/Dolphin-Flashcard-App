import type { PredicateWithIndex, RefinementWithIndex } from "../../../../Utils/index.js";
import * as Chunk from "../core.js";
/**
 * Returns a filtered subset of this chunk.
 */
export declare function filterWithIndex_<A, B extends A>(self: Chunk.Chunk<A>, f: RefinementWithIndex<number, A, B>): Chunk.Chunk<B>;
export declare function filterWithIndex_<A>(self: Chunk.Chunk<A>, f: PredicateWithIndex<number, A>): Chunk.Chunk<A>;
/**
 * Returns a filtered subset of this chunk.
 *
 * @ets_data_first filterWithIndex_
 */
export declare function filterWithIndex<A, B extends A>(f: RefinementWithIndex<number, A, B>): (self: Chunk.Chunk<A>) => Chunk.Chunk<B>;
export declare function filterWithIndex<A>(f: PredicateWithIndex<number, A>): (self: Chunk.Chunk<A>) => Chunk.Chunk<A>;
//# sourceMappingURL=filterWithIndex.d.ts.map