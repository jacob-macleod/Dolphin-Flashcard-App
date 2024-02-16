import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Returns this stream if the specified condition is satisfied, otherwise returns an empty stream.
 */
export declare function whenEffect_<R, R1, E, E1, A>(self: C.Stream<R, E, A>, b: T.Effect<R1, E1, boolean>): C.Stream<R1 & R, E | E1, A>;
/**
 * Returns this stream if the specified condition is satisfied, otherwise returns an empty stream.
 *
 * @ets_data_first whenEffect_
 */
export declare function whenEffect<R1, E1>(b: T.Effect<R1, E1, boolean>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R1 & R, E1 | E, A>;
//# sourceMappingURL=whenEffect.d.ts.map