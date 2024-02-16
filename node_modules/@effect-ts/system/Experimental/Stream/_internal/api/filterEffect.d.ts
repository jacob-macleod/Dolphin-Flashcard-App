import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Effectfully filters the elements emitted by this stream.
 */
export declare function filterEffect_<R, R1, E, E1, A>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, boolean>): C.Stream<R & R1, E | E1, A>;
/**
 * Effectfully filters the elements emitted by this stream.
 *
 * @ets_data_first filterEffect_
 */
export declare function filterEffect<R1, E1, A>(f: (a: A) => T.Effect<R1, E1, boolean>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A>;
//# sourceMappingURL=filterEffect.d.ts.map