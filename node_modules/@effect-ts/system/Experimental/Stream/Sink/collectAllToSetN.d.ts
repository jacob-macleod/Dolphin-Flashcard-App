import * as HS from "../../../Collections/Immutable/HashSet/index.js";
import type * as C from "./core.js";
/**
 * A sink that collects first `n` distinct inputs into a set.
 */
export declare function collectAllToSetN<Err, In>(n: number): C.Sink<unknown, Err, In, Err, In, HS.HashSet<In>>;
//# sourceMappingURL=collectAllToSetN.d.ts.map