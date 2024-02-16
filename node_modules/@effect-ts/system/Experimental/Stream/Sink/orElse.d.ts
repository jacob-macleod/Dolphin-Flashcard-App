import * as C from "./core.js";
export declare function orElse_<R, R1, InErr, InErr1, In, In1 extends In, OutErr, OutErr1, L, L1 extends L, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>): C.Sink<R & R1, InErr & InErr1, In1, OutErr | OutErr1, L, Z | Z1>;
/**
 * @ets_data_first orElse_
 */
export declare function orElse<R1, InErr1, In, In1 extends In, OutErr1, L, L1 extends L, Z1>(that: C.Sink<R1, InErr1, In1, OutErr1, L1, Z1>): <R, InErr, OutErr, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R & R1, InErr & InErr1, In1, OutErr1 | OutErr, L, Z1 | Z>;
//# sourceMappingURL=orElse.d.ts.map