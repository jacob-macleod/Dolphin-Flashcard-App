import * as M from "../_internal/managed.js";
import type * as SK from "../Sink/index.js";
import type { Stream } from "./definitions.js";
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */
export declare function runManaged_<R, R1, E, E1, O, B>(self: Stream<R, E, O>, sink: SK.Sink<R1, E1, O, any, B>): M.Managed<R & R1, E1 | E, B>;
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */
export declare function runManaged<R1, E1, O, B>(sink: SK.Sink<R1, E1, O, any, B>): <R, E>(self: Stream<R, E, O>) => M.Managed<R & R1, E1 | E, B>;
//# sourceMappingURL=runManaged.d.ts.map