import type { Predicate } from "../../../../Function/index.js";
import type * as C from "../core.js";
/**
 * Drops all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */
export declare function dropWhile_<R, E, A>(self: C.Stream<R, E, A>, f: Predicate<A>): C.Stream<R, E, A>;
/**
 * Drops all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 *
 * @ets_data_first dropWhile_
 */
export declare function dropWhile<A>(f: Predicate<A>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=dropWhile.d.ts.map