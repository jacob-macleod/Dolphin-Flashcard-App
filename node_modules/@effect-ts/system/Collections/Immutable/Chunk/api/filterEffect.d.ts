import type { Effect } from "../../../../Effect/effect.js";
import * as Chunk from "../core.js";
/**
 * Filters this chunk by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 */
export declare function filterEffect_<R, E, A>(self: Chunk.Chunk<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, Chunk.Chunk<A>>;
/**
 * Filters this chunk by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 *
 * @ets_data_first filterEffect_
 */
export declare function filterEffect<R, E, A>(f: (a: A) => Effect<R, E, boolean>): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<A>>;
//# sourceMappingURL=filterEffect.d.ts.map