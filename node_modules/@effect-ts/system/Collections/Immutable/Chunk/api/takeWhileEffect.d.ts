import type { Effect } from "../../../../Effect/effect.js";
import * as Chunk from "../core.js";
/**
 * Takes all elements so long as the effectual predicate returns true.
 */
export declare function takeWhileEffect_<R, E, A>(self: Chunk.Chunk<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, Chunk.Chunk<A>>;
/**
 * Takes all elements so long as the effectual predicate returns true.
 *
 * @ets_data_first takeWhileEffect_
 */
export declare function takeWhileEffect<R, E, A>(f: (a: A) => Effect<R, E, boolean>): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<A>>;
//# sourceMappingURL=takeWhileEffect.d.ts.map