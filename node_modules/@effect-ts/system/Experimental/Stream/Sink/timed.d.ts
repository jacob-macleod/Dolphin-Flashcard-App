import * as CL from "../../../Clock/index.js";
import type * as Tp from "../../../Collections/Immutable/Tuple/index.js";
import type * as C from "./core.js";
/**
 * Returns the sink that executes this one and times its execution.
 */
export declare function timed<R, InErr, In, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>): C.Sink<CL.HasClock & R, InErr, In, OutErr, L, Tp.Tuple<[Z, number]>>;
//# sourceMappingURL=timed.d.ts.map