import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Runs the stream to a sink which sums elements, provided they are Numeric.
 */
export declare function runSum<R, E>(self: C.Stream<R, E, number>): T.Effect<R, E, number>;
//# sourceMappingURL=runSum.d.ts.map