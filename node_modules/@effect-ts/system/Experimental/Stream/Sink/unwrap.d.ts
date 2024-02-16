import * as T from "../../../Effect/index.js";
import * as C from "./core.js";
/**
 * Creates a sink produced from an effect.
 */
export declare function unwrap<R, InErr, In, OutErr, L, Z>(managed: T.Effect<R, OutErr, C.Sink<R, InErr, In, OutErr, L, Z>>): C.Sink<R, InErr, In, OutErr, L, Z>;
//# sourceMappingURL=unwrap.d.ts.map