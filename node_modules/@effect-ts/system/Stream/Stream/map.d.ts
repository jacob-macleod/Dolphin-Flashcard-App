import type { Stream } from "./definitions.js";
/**
 * Transforms the chunks emitted by this stream.
 */
export declare function map_<R, E, O, O2>(self: Stream<R, E, O>, f: (_: O) => O2): Stream<R, E, O2>;
/**
 * Transforms the chunks emitted by this stream.
 */
export declare function map<O, O2>(f: (_: O) => O2): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O2>;
//# sourceMappingURL=map.d.ts.map