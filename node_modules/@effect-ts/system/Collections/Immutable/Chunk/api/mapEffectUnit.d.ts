import type { Effect } from "../../../../Effect/effect.js";
import type * as Chunk from "../core.js";
/**
 * Effectfully maps the elements of this chunk purely for the effects.
 */
export declare function mapEffectUnit_<A, R, E, B>(self: Chunk.Chunk<A>, f: (a: A) => Effect<R, E, B>): Effect<R, E, void>;
/**
 * Effectfully maps the elements of this chunk purely for the effects.
 *
 * @ets_data_first mapEffectUnit_
 */
export declare function mapEffectUnit<A, R, E, B>(f: (a: A) => Effect<R, E, B>): (self: Chunk.Chunk<A>) => Effect<R, E, void>;
//# sourceMappingURL=mapEffectUnit.d.ts.map