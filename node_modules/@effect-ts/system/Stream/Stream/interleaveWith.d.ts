import { Stream } from "./definitions.js";
/**
 * Combines this stream and the specified stream deterministically using the
 * stream of boolean values `b` to control which stream to pull from next.
 * `true` indicates to pull from this stream and `false` indicates to pull
 * from the specified stream. Only consumes as many elements as requested by
 * `b`. If either this stream or the specified stream are exhausted further
 * requests for values from that stream will be ignored.
 */
export declare function interleaveWith_<R, E, O, R1, E1, O1>(self: Stream<R, E, O>, that: Stream<R1, E1, O1>, b: Stream<R1, E1, boolean>): Stream<R & R1, E | E1, O | O1>;
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
export declare function interleaveWith<R1, E1, O1>(that: Stream<R1, E1, O1>, b: Stream<R1, E1, boolean>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O1 | O>;
//# sourceMappingURL=interleaveWith.d.ts.map