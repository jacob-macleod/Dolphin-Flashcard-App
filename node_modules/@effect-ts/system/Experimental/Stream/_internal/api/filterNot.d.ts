import type { Predicate, Refinement } from "../../../../Function/index.js";
import type * as C from "../core.js";
/**
 * Filters this stream by the specified predicate, removing all elements for
 * which the predicate evaluates to true.
 */
export declare function filterNot_<R, E, A, B extends A>(self: C.Stream<R, E, A>, pred: Refinement<A, B>): C.Stream<R, E, B>;
export declare function filterNot_<R, E, A>(self: C.Stream<R, E, A>, pred: Predicate<A>): C.Stream<R, E, A>;
/**
 * Filters this stream by the specified predicate, removing all elements for
 * which the predicate evaluates to true.
 *
 * @ets_data_first filterNot_
 */
export declare function filterNot<A, B extends A>(pred: Refinement<A, B>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, B>;
export declare function filterNot<A>(pred: Predicate<A>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=filterNot.d.ts.map