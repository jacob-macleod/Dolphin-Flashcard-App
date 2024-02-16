import type { Predicate, Refinement } from "../../../../Function/index.js";
import * as C from "../core.js";
/**
 * Finds the first element emitted by this stream that satisfies the provided predicate.
 */
export declare function find_<R, E, A, B extends A>(self: C.Stream<R, E, A>, f: Refinement<A, B>): C.Stream<R, E, B>;
export declare function find_<R, E, A>(self: C.Stream<R, E, A>, f: Predicate<A>): C.Stream<R, E, A>;
/**
 * Finds the first element emitted by this stream that satisfies the provided predicate.
 * @ets_data_first find_
 */
export declare function find<A>(f: Predicate<A>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=find.d.ts.map