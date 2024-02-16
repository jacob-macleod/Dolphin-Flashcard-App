import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Adds an effect to consumption of every element of the stream.
 */
export declare function tap_<R, R1, E, E1, O, X>(self: Stream<R, E, O>, f: (o: O) => T.Effect<R1, E1, X>): Stream<R & R1, E | E1, O>;
/**
 * Adds an effect to consumption of every element of the stream.
 */
export declare function tap<R, R1, E, E1, O, X>(f: (o: O) => T.Effect<R1, E1, X>): (self: Stream<R, E, O>) => Stream<R & R1, E | E1, O>;
//# sourceMappingURL=tap.d.ts.map