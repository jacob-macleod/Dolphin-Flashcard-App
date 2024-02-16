import type { Effect } from "../../../../Effect/effect.js";
import type * as Chunk from "../core.js";
/**
 * Effectfully maps the elements of this chunk in parallel.
 */
export declare function mapMParEffect_<A, R, E, B>(self: Chunk.Chunk<A>, n: number, f: (a: A) => Effect<R, E, B>): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Effectfully maps the elements of this chunk in parallel.
 *
 * @ets_data_first mapMParEffect_
 */
export declare function mapMParEffect<A, R, E, B>(n: number, f: (a: A) => Effect<R, E, B>): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<B>>;
//# sourceMappingURL=mapEffectParN.d.ts.map