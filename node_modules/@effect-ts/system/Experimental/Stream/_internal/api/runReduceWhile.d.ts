import * as T from "../../../../Effect/index.js";
import type { Predicate } from "../../../../Function/index.js";
import type * as C from "../core.js";
/**
 * Reduces the elements in the stream to a value of type `S`.
 * Stops the fold early when the condition is not fulfilled.
 */
export declare function runReduceWhile_<R, E, A, S>(self: C.Stream<R, E, A>, s: S, cont: Predicate<S>, f: (s: S, a: A) => S): T.Effect<R, E, S>;
/**
 * Reduces the elements in the stream to a value of type `S`.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first runReduceWhile_
 */
export declare function runReduceWhile<A, S>(s: S, cont: Predicate<S>, f: (s: S, a: A) => S): <R, E>(self: C.Stream<R, E, A>) => T.Effect<R, E, S>;
//# sourceMappingURL=runReduceWhile.d.ts.map