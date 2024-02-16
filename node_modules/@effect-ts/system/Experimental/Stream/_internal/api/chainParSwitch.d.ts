import * as C from "../core.js";
/**
 * Maps each element of this stream to another stream and returns the non-deterministic merge
 * of those streams, executing up to `n` inner streams concurrently. When a new stream is created
 * from an element of the source stream, the oldest executing stream is cancelled. Up to `bufferSize`
 * elements of the produced streams may be buffered in memory by this operator.
 */
export declare function chainParSwitch_<R, R1, E, E1, A, B>(self: C.Stream<R, E, A>, f: (a: A) => C.Stream<R1, E1, B>, n: number, bufferSize?: number): C.Stream<R & R1, E | E1, B>;
/**
 * Maps each element of this stream to another stream and returns the non-deterministic merge
 * of those streams, executing up to `n` inner streams concurrently. When a new stream is created
 * from an element of the source stream, the oldest executing stream is cancelled. Up to `bufferSize`
 * elements of the produced streams may be buffered in memory by this operator.
 *
 * @ets_data_first chainParSwitch_
 */
export declare function chainParSwitch<R1, E1, A, B>(f: (a: A) => C.Stream<R1, E1, B>, n: number, bufferSize?: number): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, B>;
//# sourceMappingURL=chainParSwitch.d.ts.map