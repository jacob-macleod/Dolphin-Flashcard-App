import { Stream } from "./definitions.js";
/**
 * Takes the specified number of elements from this stream.
 */
export declare function take_<R, E, O>(self: Stream<R, E, O>, n: number): Stream<R, E, O>;
/**
 * Takes the specified number of elements from this stream.
 */
export declare function take(n: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=take.d.ts.map