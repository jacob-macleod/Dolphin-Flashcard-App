import * as C from "../core.js";
/**
 * Maps each element of this stream to another stream and returns the
 * non-deterministic merge of those streams, executing up to `n` inner streams
 * concurrently. Up to `bufferSize` elements of the produced streams may be
 * buffered in memory by this operator.
 */
export declare function chainPar_<R, R1, E, E1, A, B>(self: C.Stream<R, E, A>, n: number, f: (a: A) => C.Stream<R1, E1, B>, bufferSize?: number): C.Stream<R & R1, E | E1, B>;
/**
 * Maps each element of this stream to another stream and returns the
 * non-deterministic merge of those streams, executing up to `n` inner streams
 * concurrently. Up to `bufferSize` elements of the produced streams may be
 * buffered in memory by this operator.
 *
 * @ets_data_first chainPar_
 */
export declare function chainPar<R1, E1, A, B>(n: number, f: (a: A) => C.Stream<R1, E1, B>, bufferSize?: number): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, B>;
//# sourceMappingURL=chainPar.d.ts.map