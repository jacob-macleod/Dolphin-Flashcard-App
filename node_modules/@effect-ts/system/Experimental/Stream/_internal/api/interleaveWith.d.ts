import * as C from "../core.js";
/**
 * Combines this stream and the specified stream deterministically using the
 * stream of boolean values `b` to control which stream to pull from next.
 * `true` indicates to pull from this stream and `false` indicates to pull
 * from the specified stream. Only consumes as many elements as requested by
 * `b`. If either this stream or the specified stream are exhausted further
 * requests for values from that stream will be ignored.
 */
export declare function interleaveWith_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>, b: C.Stream<R1, E1, boolean>): C.Stream<R & R1, E | E1, A | A1>;
/**
 * Combines this stream and the specified stream deterministically using the
 * stream of boolean values `b` to control which stream to pull from next.
 * `true` indicates to pull from this stream and `false` indicates to pull
 * from the specified stream. Only consumes as many elements as requested by
 * `b`. If either this stream or the specified stream are exhausted further
 * requests for values from that stream will be ignored.
 *
 * @ets_data_first interleaveWith_
 */
export declare function interleaveWith<R1, E1, A1>(that: C.Stream<R1, E1, A1>, b: C.Stream<R1, E1, boolean>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1 | A>;
//# sourceMappingURL=interleaveWith.d.ts.map