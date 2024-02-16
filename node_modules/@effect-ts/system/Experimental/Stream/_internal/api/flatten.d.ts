import type * as C from "../core.js";
/**
 * Flattens this stream-of-streams into a stream made of the concatenation in
 * strict order of all the streams.
 */
export declare function flatten<R0, E0, R, E, A>(self: C.Stream<R0, E0, C.Stream<R, E, A>>): C.Stream<R0 & R, E0 | E, A>;
//# sourceMappingURL=flatten.d.ts.map