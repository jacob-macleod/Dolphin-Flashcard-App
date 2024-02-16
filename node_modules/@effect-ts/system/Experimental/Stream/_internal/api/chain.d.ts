import * as C from "../core.js";
/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f`
 */
export declare function chain_<R, E, O, R1, E1, O1>(self: C.Stream<R, E, O>, f: (o: O) => C.Stream<R1, E1, O1>): C.Stream<R & R1, E | E1, O1>;
/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f`
 *
 * @ets_data_first chain_
 */
export declare function chain<O, R1, E1, O1>(f: (o: O) => C.Stream<R1, E1, O1>): <R, E>(self: C.Stream<R, E, O>) => C.Stream<R & R1, E | E1, O1>;
//# sourceMappingURL=chain.d.ts.map