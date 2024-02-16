import type * as TK from "../Take/index.js";
import type { Stream } from "./definitions.js";
/**
 * Unwraps `Exit` values and flatten chunks that also signify end-of-stream by failing with `None`.
 */
export declare function flattenTake<R, E, E1, O1>(self: Stream<R, E, TK.Take<E1, O1>>): Stream<R, E | E1, O1>;
//# sourceMappingURL=flattenTake.d.ts.map