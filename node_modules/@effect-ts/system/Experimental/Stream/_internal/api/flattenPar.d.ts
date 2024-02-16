import type * as C from "../core.js";
/**
 * Flattens a stream of streams into a stream by executing a non-deterministic
 * concurrent merge. Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` elements may be buffered by this operator.
 */
export declare function flattenPar_<R, R1, E, E1, A>(self: C.Stream<R, E, C.Stream<R1, E1, A>>, n: number, outputBuffer?: number): C.Stream<R & R1, E | E1, A>;
/**
 * Flattens a stream of streams into a stream by executing a non-deterministic
 * concurrent merge. Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` elements may be buffered by this operator.
 *
 * @ets_data_first flattenPar_
 */
export declare function flattenPar(n: number, outputBuffer?: number): <R, R1, E, E1, A>(self: C.Stream<R, E, C.Stream<R1, E1, A>>) => C.Stream<R & R1, E | E1, A>;
//# sourceMappingURL=flattenPar.d.ts.map