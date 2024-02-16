import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Effectfully filters the elements emitted by this stream.
 */
export declare function filterM_<R, R1, E, E1, O>(self: Stream<R, E, O>, f: (o: O) => T.Effect<R1, E1, boolean>): Stream<R & R1, E | E1, O>;
/**
 * Effectfully filters the elements emitted by this stream.
 */
export declare function filterM<R1, E1, O>(f: (o: O) => T.Effect<R1, E1, boolean>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O>;
//# sourceMappingURL=filterM.d.ts.map