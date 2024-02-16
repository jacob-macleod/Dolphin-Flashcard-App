import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Adds an effect to consumption of every element of the stream.
 */
export declare function tap_<R, R1, E, E1, A, Z>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, Z>): C.Stream<R & R1, E | E1, A>;
/**
 * Adds an effect to consumption of every element of the stream.
 *
 * @ets_data_first tap_
 */
export declare function tap<R1, E1, A, Z>(f: (a: A) => T.Effect<R1, E1, Z>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A>;
//# sourceMappingURL=tap.d.ts.map