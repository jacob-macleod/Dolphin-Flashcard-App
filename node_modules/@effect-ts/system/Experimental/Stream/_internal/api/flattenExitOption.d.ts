import * as Ex from "../../../../Exit/index.js";
import * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Unwraps `Exit` values that also signify end-of-stream by failing with `None`.
 *
 * For `Exit<E, A>` values that do not signal end-of-stream, prefer:
 */
export declare function flattenExitOption<R, E, E1, A>(self: C.Stream<R, E, Ex.Exit<O.Option<E1>, A>>): C.Stream<R, E | E1, A>;
//# sourceMappingURL=flattenExitOption.d.ts.map