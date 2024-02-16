import * as C from "../core.js";
/**
 * Transforms the errors emitted by this stream using `f`.
 */
export declare function mapError_<R, E, E1, A>(self: C.Stream<R, E, A>, f: (e: E) => E1): C.Stream<R, E1, A>;
/**
 * Transforms the errors emitted by this stream using `f`.
 *
 * @ets_data_first mapError_
 */
export declare function mapError<E, E1>(f: (e: E) => E1): <R, A>(self: C.Stream<R, E, A>) => C.Stream<R, E1, A>;
//# sourceMappingURL=mapError.d.ts.map