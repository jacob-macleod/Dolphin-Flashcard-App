import type { Stream } from "./definitions.js";
/**
 * Runs the stream to completion and yields the first value emitted by it,
 * discarding the rest of the elements.
 */
export declare function runHead<R, E, O>(self: Stream<R, E, O>): import("../_internal/effect.js").Effect<R, E, import("../../Option/core.js").Option<O>>;
//# sourceMappingURL=runHead.d.ts.map