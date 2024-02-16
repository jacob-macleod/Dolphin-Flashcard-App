import type * as T from "../../../Effect/index.js";
import * as C from "./core.js";
/**
 * Effectfully transforms this sink's result.
 */
export declare function mapEffect_<R, R1, InErr, In, OutErr, OutErr1, L, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, f: (z: Z) => T.Effect<R1, OutErr1, Z1>): C.Sink<R & R1, InErr, In, OutErr | OutErr1, L, Z1>;
/**
 * Effectfully transforms this sink's result.
 *
 * @ets_data_first mapEffect_
 */
export declare function mapEffect<R1, OutErr1, Z, Z1>(f: (z: Z) => T.Effect<R1, OutErr1, Z1>): <R, InErr, In, OutErr, L>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R & R1, InErr, In, OutErr1 | OutErr, L, Z1>;
//# sourceMappingURL=mapEffect.d.ts.map