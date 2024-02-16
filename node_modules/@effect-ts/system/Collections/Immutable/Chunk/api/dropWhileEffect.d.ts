import type { Effect } from "../../../../Effect/effect.js";
import * as Chunk from "../core.js";
/**
 * Drops all elements so long as the predicate returns true.
 */
export declare function dropWhileEffect_<R, E, A>(self: Chunk.Chunk<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, Chunk.Chunk<A>>;
/**
 * Drops all elements so long as the predicate returns true.
 *
 * @ets_data_first dropWhileEffect_
 */
export declare function dropWhileEffect<R, E, A>(f: (a: A) => Effect<R, E, boolean>): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<A>>;
//# sourceMappingURL=dropWhileEffect.d.ts.map