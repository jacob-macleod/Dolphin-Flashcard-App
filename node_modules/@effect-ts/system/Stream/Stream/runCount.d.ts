import type * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Runs the stream and emits the number of elements processed
 *
 * Equivalent to `run(ZSink.count)`
 */
export declare function runCount<R, E, O>(self: Stream<R, E, O>): T.Effect<R, E, number>;
//# sourceMappingURL=runCount.d.ts.map