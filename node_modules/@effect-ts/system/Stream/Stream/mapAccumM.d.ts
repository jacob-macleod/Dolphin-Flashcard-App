import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 *
 * @ets_data_first mapAccumM_
 */
export declare function mapAccumM<Z, O, R1, E1, O1>(z: Z, f: (z: Z, o: O) => T.Effect<R1, E1, Tp.Tuple<[Z, O1]>>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O1>;
/**
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 */
export declare function mapAccumM_<R, E, Z, O, R1, E1, O1>(self: Stream<R, E, O>, z: Z, f: (z: Z, o: O) => T.Effect<R1, E1, Tp.Tuple<[Z, O1]>>): Stream<R & R1, E | E1, O1>;
//# sourceMappingURL=mapAccumM.d.ts.map