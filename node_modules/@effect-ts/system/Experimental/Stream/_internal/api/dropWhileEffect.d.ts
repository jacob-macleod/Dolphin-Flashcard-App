import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Drops all elements of the stream for as long as the specified predicate
 * produces an effect that evalutates to `true`
 *
 * @see `dropWhile`
 */
export declare function dropWhileEffect_<R, R1, E, E1, A>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, boolean>): C.Stream<R & R1, E | E1, A>;
/**
 * Drops all elements of the stream for as long as the specified predicate
 * produces an effect that evalutates to `true`
 *
 * @see `dropWhile`
 *
 * @ets_data_first dropWhileEffect_
 */
export declare function dropWhileEffect<R1, E1, A>(f: (a: A) => T.Effect<R1, E1, boolean>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A>;
//# sourceMappingURL=dropWhileEffect.d.ts.map