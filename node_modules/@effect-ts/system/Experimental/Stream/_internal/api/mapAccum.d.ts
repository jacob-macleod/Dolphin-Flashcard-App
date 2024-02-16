import type * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as C from "../core.js";
/**
 * Statefully maps over the elements of this stream to produce new elements.
 */
export declare function mapAccum_<R, E, A, A1, S>(self: C.Stream<R, E, A>, s: S, f: (s: S, a: A) => Tp.Tuple<[S, A1]>): C.Stream<R, E, A1>;
/**
 * Statefully maps over the elements of this stream to produce new elements.
 *
 * @ets_data_first mapAccum_
 */
export declare function mapAccum<A, A1, S>(s: S, f: (s: S, a: A) => Tp.Tuple<[S, A1]>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A1>;
//# sourceMappingURL=mapAccum.d.ts.map