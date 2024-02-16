import type * as T from "../../../Effect/index.js";
import type * as C from "./core.js";
/**
 * Effectfully transforms this sink's input elements.
 */
export declare function contramapEffect_<R, R1, InErr, InErr1 extends InErr, In, In1, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>, f: (in_: In1) => T.Effect<R1, InErr1, In>): C.Sink<R1 & R, InErr & InErr1, In1, OutErr, L, Z>;
/**
 * Effectfully transforms this sink's input elements.
 *
 * @ets_data_first contramapEffect_
 */
export declare function contramapEffect<R1, InErr, InErr1 extends InErr, In, In1>(f: (in_: In1) => T.Effect<R1, InErr1, In>): <R, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R1 & R, InErr & InErr1, In1, OutErr, L, Z>;
//# sourceMappingURL=contramapEffect.d.ts.map