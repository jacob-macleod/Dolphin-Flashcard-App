import * as Ex from "../../Exit/index.js";
import type { Stream } from "./definitions.js";
/**
 * Filters any `Exit.Failure` values.
 */
export declare function collectSuccess<R, E, O1, L1>(self: Stream<R, E, Ex.Exit<L1, O1>>): Stream<R, E, O1>;
//# sourceMappingURL=collectSuccess.d.ts.map