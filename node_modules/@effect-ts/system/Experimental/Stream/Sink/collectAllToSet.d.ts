import * as HS from "../../../Collections/Immutable/HashSet/index.js";
import type * as C from "./core.js";
/**
 * A sink that collects all of its inputs into a set.
 */
export declare function collectAllToSet<Err, In>(): C.Sink<unknown, Err, In, Err, unknown, HS.HashSet<In>>;
//# sourceMappingURL=collectAllToSet.d.ts.map