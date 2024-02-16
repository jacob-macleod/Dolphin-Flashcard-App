import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results.
 *
 * See also `Stream#scanM`.
 */
export declare function scanReduceM_<R, R1, E, E1, O, O1 extends O>(self: Stream<R, E, O>, f: (o1: O1, o: O) => T.Effect<R1, E1, O1>): Stream<R & R1, E | E1, O1>;
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results.
 *
 * See also `Stream#scanM`.
 */
export declare function scanReduceM<R1, E1, O, O1 extends O>(f: (o1: O1, o: O) => T.Effect<R1, E1, O1>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O1>;
//# sourceMappingURL=scanReduceM.d.ts.map