import type * as CL from "../../Clock/index.js";
import type * as H from "../../Has/index.js";
import type { Stream } from "./definitions.js";
/**
 * Emits elements of this stream with a fixed delay in between, regardless of how long it
 * takes to produce a value.
 */
export declare function fixed_<R, E, O>(self: Stream<R, E, O>, duration: number): Stream<R & H.Has<CL.Clock>, E, O>;
/**
 * Emits elements of this stream with a fixed delay in between, regardless of how long it
 * takes to produce a value.
 */
export declare function fixed(duration: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R & H.Has<CL.Clock>, E, O>;
//# sourceMappingURL=fixed.d.ts.map