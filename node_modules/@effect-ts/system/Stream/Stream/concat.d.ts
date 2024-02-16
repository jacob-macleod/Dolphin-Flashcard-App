import { Stream } from "./definitions.js";
/**
 * Concatenates the specified stream with this stream, resulting in a stream
 * that emits the elements from this stream and then the elements from the specified stream.
 */
export declare function concat_<R, R1, E, E1, O, O1>(self: Stream<R, E, O>, that: Stream<R1, E1, O1>): Stream<R & R1, E | E1, O | O1>;
/**
 * Concatenates the specified stream with this stream, resulting in a stream
 * that emits the elements from this stream and then the elements from the specified stream.
 */
export declare function concat<R1, E1, O1>(that: Stream<R1, E1, O1>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O1 | O>;
//# sourceMappingURL=concat.d.ts.map