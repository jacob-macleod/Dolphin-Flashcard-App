import { Stream } from "./definitions.js";
/**
 * Drops the specified number of elements from this stream.
 */
export declare function drop_<R, E, O>(self: Stream<R, E, O>, n: number): Stream<R, E, O>;
/**
 * Drops the specified number of elements from this stream.
 */
export declare function drop(n: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=drop.d.ts.map