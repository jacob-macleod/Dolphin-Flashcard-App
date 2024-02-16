import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Executes an effectful fold over the stream of values.
 */
export declare function runReduceEffect_<R, R1, E, E1, A, S>(self: C.Stream<R, E, A>, s: S, f: (s: S, a: A) => T.Effect<R1, E1, S>): T.Effect<R & R1, E | E1, S>;
/**
 * Executes an effectful fold over the stream of values.
 *
 * @ets_data_first runReduceEffect_
 */
export declare function runReduceEffect<R1, E1, A, S>(s: S, f: (s: S, a: A) => T.Effect<R1, E1, S>): <R, E>(self: C.Stream<R, E, A>) => T.Effect<R & R1, E1 | E, S>;
//# sourceMappingURL=runReduceEffect.d.ts.map