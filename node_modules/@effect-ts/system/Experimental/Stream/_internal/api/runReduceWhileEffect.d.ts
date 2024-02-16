import * as T from "../../../../Effect/index.js";
import type { Predicate } from "../../../../Function/index.js";
import type * as C from "../core.js";
/**
 * Executes an effectful fold over the stream of values.
 * Stops the fold early when the condition is not fulfilled.
 */
export declare function runReduceWhileEffect_<R, R1, E, E1, A, S>(self: C.Stream<R, E, A>, s: S, cont: Predicate<S>, f: (s: S, a: A) => T.Effect<R1, E1, S>): T.Effect<R & R1, E | E1, S>;
/**
 * Executes an effectful fold over the stream of values.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first runReduceWhileEffect_
 */
export declare function runReduceWhileEffect<R1, E1, A, S>(s: S, cont: Predicate<S>, f: (s: S, a: A) => T.Effect<R1, E1, S>): <R, E>(self: C.Stream<R, E, A>) => T.Effect<R & R1, E1 | E, S>;
//# sourceMappingURL=runReduceWhileEffect.d.ts.map