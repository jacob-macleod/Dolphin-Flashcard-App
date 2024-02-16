import type { Effect } from "../../../../Effect/effect.js";
import type * as Chunk from "../core.js";
/**
 * Effectfully maps the elements of this chunk in parallel purely for the effects.
 */
export declare function mapEffectUnitPar_<A, R, E, B>(self: Chunk.Chunk<A>, f: (a: A) => Effect<R, E, B>): Effect<R, E, void>;
/**
 * Effectfully maps the elements of this chunk in parallel purely for the effects.
 *
 * @ets_data_first mapEffectUnitPar_
 */
export declare function mapEffectUnitPar<A, R, E, B>(f: (a: A) => Effect<R, E, B>): (self: Chunk.Chunk<A>) => Effect<R, E, void>;
//# sourceMappingURL=mapEffectUnitParN.d.ts.map