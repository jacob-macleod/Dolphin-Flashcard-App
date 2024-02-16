import type * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Executes the provided finalizer before this stream's finalizers run.
 */
export declare function ensuringFirst<R1>(fin: T.Effect<R1, never, unknown>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E, O>;
/**
 * Executes the provided finalizer before this stream's finalizers run.
 */
export declare function ensuringFirst_<R, E, O, R1>(self: Stream<R, E, O>, fin: T.Effect<R1, never, unknown>): Stream<R & R1, E, O>;
//# sourceMappingURL=ensuringFirst.d.ts.map