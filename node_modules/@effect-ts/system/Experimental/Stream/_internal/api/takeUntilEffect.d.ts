import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Takes all elements of the stream until the specified effectual predicate
 * evaluates to `true`.
 */
export declare function takeUntilEffect_<R, R1, E, E1, A>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, boolean>): C.Stream<R & R1, E | E1, A>;
/**
 * Takes all elements of the stream until the specified effectual predicate
 * evaluates to `true`.
 *
 * @ets_data_first takeUntilEffect_
 */
export declare function takeUntilEffect<R1, E1, A>(f: (a: A) => T.Effect<R1, E1, boolean>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A>;
//# sourceMappingURL=takeUntilEffect.d.ts.map