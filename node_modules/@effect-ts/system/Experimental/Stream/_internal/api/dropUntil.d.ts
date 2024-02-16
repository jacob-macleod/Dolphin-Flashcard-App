import type { Predicate } from "../../../../Function/index.js";
import type * as C from "../core.js";
/**
 * Drops all elements of the stream until the specified predicate evaluates
 * to `true`.
 */
export declare function dropUntil_<R, E, A>(self: C.Stream<R, E, A>, f: Predicate<A>): C.Stream<R, E, A>;
/**
 * Drops all elements of the stream until the specified predicate evaluates
 * to `true`.
 *
 * @ets_data_first dropUntil_
 */
export declare function dropUntil<A>(f: Predicate<A>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=dropUntil.d.ts.map