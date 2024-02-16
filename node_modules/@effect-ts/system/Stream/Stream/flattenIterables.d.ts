import type { Stream } from "./definitions.js";
/**
 * Submerges the iterables carried by this stream into the stream's structure, while
 * still preserving them.
 */
export declare function flattenIterables<R, E, O1>(self: Stream<R, E, Iterable<O1>>): Stream<R, E, O1>;
//# sourceMappingURL=flattenIterables.d.ts.map