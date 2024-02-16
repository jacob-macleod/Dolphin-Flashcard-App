import type { Stream } from "./definitions.js";
/**
 * Flattens a stream of streams into a stream by executing a non-deterministic
 * concurrent merge. Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` elements may be buffered by this operator.
 */
export declare function flattenPar_<R, R1, E, E1, O1>(self: Stream<R, E, Stream<R1, E1, O1>>, n: number, outputBuffer?: number): Stream<R & R1, E | E1, O1>;
/**
 * Flattens a stream of streams into a stream by executing a non-deterministic
 * concurrent merge. Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` elements may be buffered by this operator.
 */
export declare function flattenPar(n: number, outputBuffer?: number): <R, R1, E, E1, O1>(self: Stream<R, E, Stream<R1, E1, O1>>) => Stream<R & R1, E | E1, O1>;
//# sourceMappingURL=flattenPar.d.ts.map