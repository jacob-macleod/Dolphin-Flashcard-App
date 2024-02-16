import type { Effect } from "../../../../Effect/effect.js";
import type * as Chunk from "../core.js";
/**
 * Effectfully maps the elements of this chunk.
 */
export declare function mapEffect_<A, R, E, B>(self: Chunk.Chunk<A>, f: (a: A) => Effect<R, E, B>): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Effectfully maps the elements of this chunk.
 *
 * @ets_data_first mapEffect_
 */
export declare function mapEffect<A, R, E, B>(f: (a: A) => Effect<R, E, B>): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<B>>;
//# sourceMappingURL=mapEffect.d.ts.map