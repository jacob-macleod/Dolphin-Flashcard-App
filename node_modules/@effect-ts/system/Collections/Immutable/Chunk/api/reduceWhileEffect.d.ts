import type { Effect } from "../../../../Effect/effect.js";
import type * as Chunk from "../core.js";
/**
 * Folds over the elements in this chunk from the left.
 * Stops the fold early when the condition is not fulfilled.
 */
export declare function reduceWhileEffect_<A, R, E, S>(self: Chunk.Chunk<A>, s: S, pred: (s: S) => boolean, f: (s: S, a: A) => Effect<R, E, S>): Effect<R, E, S>;
/**
 * Folds over the elements in this chunk from the left.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first reduceWhileEffect_
 */
export declare function reduceWhileEffect<A, R, E, S>(s: S, pred: (s: S) => boolean, f: (s: S, a: A) => Effect<R, E, S>): (self: Chunk.Chunk<A>) => Effect<R, E, S>;
//# sourceMappingURL=reduceWhileEffect.d.ts.map