import type * as TK from "../../Take/index.js";
import type * as C from "../core.js";
/**
 * Unwraps `Exit` values and flatten chunks that also signify end-of-stream by failing with `None`.
 */
export declare function flattenTake<R, E, E1, A>(self: C.Stream<R, E, TK.Take<E1, A>>): C.Stream<R, E | E1, A>;
//# sourceMappingURL=flattenTake.d.ts.map