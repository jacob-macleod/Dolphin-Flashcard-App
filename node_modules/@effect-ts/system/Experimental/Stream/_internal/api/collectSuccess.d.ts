import * as Ex from "../../../../Exit/index.js";
import type * as C from "../core.js";
/**
 * Filters any `Exit.Failure` values.
 */
export declare function collectSuccess<R, E, A, L1>(self: C.Stream<R, E, Ex.Exit<L1, A>>): C.Stream<R, E, A>;
//# sourceMappingURL=collectSuccess.d.ts.map