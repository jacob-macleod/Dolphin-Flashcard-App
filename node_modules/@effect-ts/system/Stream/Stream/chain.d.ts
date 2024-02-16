import { Stream } from "./definitions.js";
/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f0`
 */
export declare function chain_<R, R1, E, E1, O, O2>(self: Stream<R, E, O>, f0: (a: O) => Stream<R1, E1, O2>): Stream<R & R1, E | E1, O2>;
/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f0`
 */
export declare function chain<O, O2, R1, E1>(f0: (a: O) => Stream<R1, E1, O2>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O2>;
//# sourceMappingURL=chain.d.ts.map