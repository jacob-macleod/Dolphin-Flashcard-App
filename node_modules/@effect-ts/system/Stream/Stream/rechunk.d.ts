import { Stream } from "./definitions.js";
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 */
export declare function rechunk_<R, E, O>(self: Stream<R, E, O>, n: number): Stream<R, E, O>;
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 */
export declare function rechunk(n: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=rechunk.d.ts.map