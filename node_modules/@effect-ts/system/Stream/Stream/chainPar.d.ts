import { Stream } from "./definitions.js";
/**
 * Maps each element of this stream to another stream and returns the
 * non-deterministic merge of those streams, executing up to `n` inner streams
 * concurrently. Up to `outputBuffer` elements of the produced streams may be
 * buffered in memory by this operator.
 */
export declare function chainPar(n: number, outputBuffer?: number): <R1, E1, O, O2>(f: (o: O) => Stream<R1, E1, O2>) => <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O2>;
//# sourceMappingURL=chainPar.d.ts.map