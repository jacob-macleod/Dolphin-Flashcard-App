import type * as M from "../../../Managed/index.js";
import * as C from "./core.js";
export declare function managed_<R, InErr, In, OutErr, A, L, Z>(resource: M.Managed<R, OutErr, A>, fn: (a: A) => C.Sink<R, InErr, In, OutErr, L, Z>): C.Sink<R, InErr, In, OutErr, L, Z>;
/**
 *
 * @ets_data_first managed_
 */
export declare function managed<R, InErr, In, OutErr, A, L, Z>(fn: (a: A) => C.Sink<R, InErr, In, OutErr, L, Z>): (resource: M.Managed<R, OutErr, A>) => C.Sink<R, InErr, In, OutErr, L, Z>;
//# sourceMappingURL=managed.d.ts.map