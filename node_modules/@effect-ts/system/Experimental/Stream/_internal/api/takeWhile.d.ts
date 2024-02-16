import type { Predicate } from "../../../../Function/index.js";
import * as C from "../core.js";
/**
 * Takes all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */
export declare function takeWhile_<R, E, A>(self: C.Stream<R, E, A>, f: Predicate<A>): C.Stream<R, E, A>;
/**
 * Takes all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 *
 * @ets_data_first takeWhile_
 */
export declare function takeWhile<A>(f: Predicate<A>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=takeWhile.d.ts.map