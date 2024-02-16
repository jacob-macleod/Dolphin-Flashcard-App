import * as C from "./core.js";
/**
 * Returns a lazily constructed sink that may require effects for its creation.
 */
export declare function suspend<R, InErr, In, OutErr, L, Z>(f: () => C.Sink<R, InErr, In, OutErr, L, Z>): C.Sink<R, InErr, In, OutErr, L, Z>;
//# sourceMappingURL=suspend.d.ts.map