import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Stream } from "./definitions.js";
/**
 * Statefully maps over the elements of this stream to produce new elements.
 */
export declare function mapAccum_<R, E, Z, O, O1>(self: Stream<R, E, O>, z: Z, f: (z: Z, o: O) => Tp.Tuple<[Z, O1]>): Stream<R, E, O1>;
/**
 * Statefully maps over the elements of this stream to produce new elements.
 *
 * @ets_data_first mapAccum_
 */
export declare function mapAccum<Z, O, O1>(z: Z, f: (z: Z, o: O) => Tp.Tuple<[Z, O1]>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O1>;
//# sourceMappingURL=mapAccum.d.ts.map