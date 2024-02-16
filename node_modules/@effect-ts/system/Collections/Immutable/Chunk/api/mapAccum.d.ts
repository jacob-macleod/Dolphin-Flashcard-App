import * as Tp from "../../Tuple/index.js";
import * as Chunk from "../core.js";
/**
 * Statefully maps over the chunk, producing new elements of type `B`.
 */
export declare function mapAccum_<A, B, S>(self: Chunk.Chunk<A>, s: S, f: (s: S, a: A) => Tp.Tuple<[S, B]>): Tp.Tuple<[S, Chunk.Chunk<B>]>;
/**
 * Statefully maps over the chunk, producing new elements of type `B`.
 *
 * @ets_data_first mapAccum_
 */
export declare function mapAccum<A, B, S>(s: S, f: (s: S, a: A) => Tp.Tuple<[S, B]>): (self: Chunk.Chunk<A>) => Tp.Tuple<[S, Chunk.Chunk<B>]>;
//# sourceMappingURL=mapAccum.d.ts.map