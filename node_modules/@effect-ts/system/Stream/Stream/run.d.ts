import type * as T from "../_internal/effect.js";
import type * as SK from "../Sink/index.js";
import type { Stream } from "./definitions.js";
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */
export declare function run_<R, R1, E, E1, O, B>(self: Stream<R, E, O>, sink: SK.Sink<R1, E1, O, any, B>): T.Effect<R & R1, E1 | E, B>;
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */
export declare function run<R1, E1, O, B>(sink: SK.Sink<R1, E1, O, any, B>): <R, E>(self: Stream<R, E, O>) => T.Effect<R & R1, E1 | E, B>;
//# sourceMappingURL=run.d.ts.map