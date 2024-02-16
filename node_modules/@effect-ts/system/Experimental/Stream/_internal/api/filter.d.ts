import type { Predicate, Refinement } from "../../../../Function/index.js";
import type * as C from "../core.js";
/**
 * Filters the elements emitted by this stream using the provided function.
 */
export declare function filter_<R, E, A, B extends A>(self: C.Stream<R, E, A>, f: Refinement<A, B>): C.Stream<R, E, B>;
export declare function filter_<R, E, A>(self: C.Stream<R, E, A>, f: Predicate<A>): C.Stream<R, E, A>;
/**
 * Filters the elements emitted by this stream using the provided function.
 *
 * @ets_data_first filter_
 */
export declare function filter<A, B extends A>(f: Refinement<A, B>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, B>;
export declare function filter<A>(f: Predicate<A>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=filter.d.ts.map