import { Stream } from "./definitions.js";
/**
 * Maps each element of this stream to another stream and returns the non-deterministic merge
 * of those streams, executing up to `n` inner streams concurrently. When a new stream is created
 * from an element of the source stream, the oldest executing stream is cancelled. Up to `bufferSize`
 * elements of the produced streams may be buffered in memory by this operator.
 */
export declare function chainParSwitch<R1, E1, O, O2>(n: number, f: (o: O) => Stream<R1, E1, O2>, bufferSize?: number): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O2>;
//# sourceMappingURL=chainParSwitch.d.ts.map