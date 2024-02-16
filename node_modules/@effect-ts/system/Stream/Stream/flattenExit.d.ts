import type * as Ex from "../../Exit/index.js";
import type { Stream } from "./definitions.js";
/**
 * Flattens `Exit` values. `Exit.Failure` values translate to stream failures
 * while `Exit.Success` values translate to stream elements.
 */
export declare function flattenExit<R, E, E1, O1>(self: Stream<R, E, Ex.Exit<E1, O1>>): Stream<R, E | E1, O1>;
//# sourceMappingURL=flattenExit.d.ts.map