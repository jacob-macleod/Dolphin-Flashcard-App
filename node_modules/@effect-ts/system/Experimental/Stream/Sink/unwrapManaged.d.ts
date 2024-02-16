import * as M from "../../../Managed/index.js";
import * as C from "./core.js";
/**
 * Creates a sink produced from a managed effect.
 */
export declare function unwrapManaged<R, InErr, In, OutErr, L, Z>(managed: M.Managed<R, OutErr, C.Sink<R, InErr, In, OutErr, L, Z>>): C.Sink<R, InErr, In, OutErr, L, Z>;
//# sourceMappingURL=unwrapManaged.d.ts.map