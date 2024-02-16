import type * as C from "../core.js";
/**
 * Returns a new stream that only emits elements that are not equal to the
 * previous element emitted, using natural equality to determine whether two
 * elements are equal.
 */
export declare function changes<R, E, A>(self: C.Stream<R, E, A>): C.Stream<R, E, A>;
//# sourceMappingURL=changes.d.ts.map