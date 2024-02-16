import type { Effect } from "../../../../Effect/effect.js";
import type * as Chunk from "../core.js";
/**
 * Effectfully maps the elements of this chunk in parallel purely for the effects.
 */
export declare function mapEffectUnitParN_<A, R, E, B>(self: Chunk.Chunk<A>, n: number, f: (a: A) => Effect<R, E, B>): Effect<R, E, void>;
/**
 * Effectfully maps the elements of this chunk in parallel purely for the effects.
 *
 * @ets_data_first mapEffectUnitParN_
 */
export declare function mapEffectUnitParN<A, R, E, B>(n: number, f: (a: A) => Effect<R, E, B>): (self: Chunk.Chunk<A>) => Effect<R, E, void>;
//# sourceMappingURL=mapEffectUnitPar.d.ts.map