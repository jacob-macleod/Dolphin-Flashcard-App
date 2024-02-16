import type { Effect } from "../../../../Effect/effect.js";
import type * as Chunk from "../core.js";
/**
 * Effectfully maps the elements of this chunk in parallel.
 */
export declare function mapEffectPar_<A, R, E, B>(self: Chunk.Chunk<A>, f: (a: A) => Effect<R, E, B>): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Effectfully maps the elements of this chunk in parallel.
 *
 * @ets_data_first mapEffectPar_
 */
export declare function mapEffectPar<A, R, E, B>(f: (a: A) => Effect<R, E, B>): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<B>>;
//# sourceMappingURL=mapEffectPar.d.ts.map