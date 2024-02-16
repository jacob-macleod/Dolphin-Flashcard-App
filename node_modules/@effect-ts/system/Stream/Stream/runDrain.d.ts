import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Runs the stream and collects all of its elements to an array.
 */
export declare function runDrain<R, E, O>(self: Stream<R, E, O>): T.Effect<R, E, void>;
//# sourceMappingURL=runDrain.d.ts.map