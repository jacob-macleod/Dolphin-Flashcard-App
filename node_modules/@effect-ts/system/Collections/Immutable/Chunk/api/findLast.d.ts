import type { Refinement } from "../../../../Function/index.js";
import * as O from "../../../../Option/index.js";
import type * as Chunk from "../core.js";
/**
 * Returns the last element that satisfies the predicate.
 */
export declare function findLast_<A, B extends A>(self: Chunk.Chunk<A>, f: Refinement<A, B>): O.Option<B>;
export declare function findLast_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): O.Option<A>;
/**
 * Returns the last element that satisfies the predicate.
 *
 * @ets_data_first findLast_
 */
export declare function findLast<A, B extends A>(f: Refinement<A, B>): (self: Chunk.Chunk<A>) => O.Option<B>;
export declare function findLast<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => O.Option<A>;
//# sourceMappingURL=findLast.d.ts.map