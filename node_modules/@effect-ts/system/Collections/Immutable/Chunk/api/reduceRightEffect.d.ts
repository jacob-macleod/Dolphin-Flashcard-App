import type { Effect } from "../../../../Effect/effect.js";
import type * as Chunk from "../core.js";
/**
 * Folds over the elements in this chunk from the right.
 */
export declare function reduceRightEffect_<A, R, E, S>(self: Chunk.Chunk<A>, s: S, f: (a: A, s: S) => Effect<R, E, S>): Effect<R, E, S>;
/**
 * Folds over the elements in this chunk from the right.
 *
 * @ets_data_first reduceRightEffect_
 */
export declare function reduceRightEffect<A, R, E, S>(s: S, f: (a: A, s: S) => Effect<R, E, S>): (self: Chunk.Chunk<A>) => Effect<R, E, S>;
//# sourceMappingURL=reduceRightEffect.d.ts.map