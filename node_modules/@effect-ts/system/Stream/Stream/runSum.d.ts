import type { Stream } from "./definitions.js";
/**
 * Runs the stream to completion and yields the last value emitted by it,
 * discarding the rest of the elements.
 */
export declare function runSum<R, E>(self: Stream<R, E, number>): import("../_internal/effect.js").Effect<R, E, number>;
//# sourceMappingURL=runSum.d.ts.map