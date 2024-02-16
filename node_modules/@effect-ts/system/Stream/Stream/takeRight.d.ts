import { Stream } from "./definitions.js";
/**
 * Takes the last specified number of elements from this stream.
 */
export declare function takeRight_<R, E, O>(self: Stream<R, E, O>, n: number): Stream<R, E, O>;
/**
 * Takes the last specified number of elements from this stream.
 */
export declare function takeRight(n: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=takeRight.d.ts.map