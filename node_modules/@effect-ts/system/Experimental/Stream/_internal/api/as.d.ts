import type * as C from "../core.js";
/**
 * Maps the success values of this stream to the specified constant value.
 */
export declare function as_<R, E, A, A2>(self: C.Stream<R, E, A>, a2: A2): C.Stream<R, E, A2>;
/**
 * Maps the success values of this stream to the specified constant value.
 *
 * @ets_data_first as_
 */
export declare function as<A2>(a2: A2): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A2>;
//# sourceMappingURL=as.d.ts.map