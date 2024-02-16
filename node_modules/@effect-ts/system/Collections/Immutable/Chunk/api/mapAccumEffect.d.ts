import type { Effect } from "../../../../Effect/effect.js";
import * as Tp from "../../Tuple/index.js";
import * as Chunk from "../core.js";
/**
 * Statefully and effectfully maps over the elements of this chunk to produce
 * new elements.
 */
export declare function mapAccumEffect_<A, B, R, E, S>(self: Chunk.Chunk<A>, s: S, f: (s: S, a: A) => Effect<R, E, Tp.Tuple<[S, B]>>): Effect<R, E, Tp.Tuple<[S, Chunk.Chunk<B>]>>;
/**
 * Statefully and effectfully maps over the elements of this chunk to produce
 * new elements.
 *
 * @ets_data_first mapAccumEffect_
 */
export declare function mapAccumEffect<A, B, R, E, S>(s: S, f: (s: S, a: A) => Effect<R, E, Tp.Tuple<[S, B]>>): (self: Chunk.Chunk<A>) => Effect<R, E, Tp.Tuple<[S, Chunk.Chunk<B>]>>;
//# sourceMappingURL=mapAccumEffect.d.ts.map