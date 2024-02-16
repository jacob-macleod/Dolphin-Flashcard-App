import type { Predicate } from "../../../../Function/index.js";
import * as C from "../core.js";
/**
 * Takes all elements of the stream until the specified predicate evaluates
 * to `true`.
 */
export declare function takeUntil_<R, E, A>(self: C.Stream<R, E, A>, f: Predicate<A>): C.Stream<R, E, A>;
/**
 * Takes all elements of the stream until the specified predicate evaluates
 * to `true`.
 *
 * @ets_data_first takeUntil_
 */
export declare function takeUntil<A>(f: Predicate<A>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=takeUntil.d.ts.map