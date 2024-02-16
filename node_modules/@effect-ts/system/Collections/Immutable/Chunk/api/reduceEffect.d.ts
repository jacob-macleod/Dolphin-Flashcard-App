import type { Effect } from "../../../../Effect/effect.js";
import type * as Chunk from "../core.js";
/**
 * Folds over the elements in this chunk from the left.
 */
export declare function reduceEffect_<A, R, E, S>(self: Chunk.Chunk<A>, s: S, f: (s: S, a: A) => Effect<R, E, S>): Effect<R, E, S>;
/**
 * Folds over the elements in this chunk from the left.
 *
 * @ets_data_first reduceEffect_
 */
export declare function reduceEffect<A, R, E, S>(s: S, f: (s: S, a: A) => Effect<R, E, S>): (self: Chunk.Chunk<A>) => Effect<R, E, S>;
//# sourceMappingURL=reduceEffect.d.ts.map