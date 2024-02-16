import type * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Executes the provided finalizer after this stream's finalizers run.
 */
export declare function ensuring_<R, R1, E, O, X>(self: Stream<R, E, O>, fin: T.Effect<R1, never, X>): Stream<R & R1, E, O>;
/**
 * Executes the provided finalizer after this stream's finalizers run.
 */
export declare function ensuring<R1, X>(fin: T.Effect<R1, never, X>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E, O>;
//# sourceMappingURL=ensuring.d.ts.map