import type { Refinement } from "../../../../Function/index.js";
import * as Chunk from "../core.js";
/**
 * Returns a filtered subset of this chunk.
 */
export declare function filter_<A, B extends A>(self: Chunk.Chunk<A>, f: Refinement<A, B>): Chunk.Chunk<B>;
export declare function filter_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): Chunk.Chunk<A>;
/**
 * Returns a filtered subset of this chunk.
 *
 * @ets_data_first filter_
 */
export declare function filter<A, B extends A>(f: Refinement<A, B>): (self: Chunk.Chunk<A>) => Chunk.Chunk<B>;
export declare function filter<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => Chunk.Chunk<A>;
//# sourceMappingURL=filter.d.ts.map