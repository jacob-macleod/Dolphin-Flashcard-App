import * as C from "./core.js";
export declare function foldSink_<R, R1, R2, InErr, InErr1, InErr2, In, In1 extends In, In2 extends In, OutErr, OutErr2, OutErr3, L, L1 extends L, L2 extends L, Z, Z1, Z2>(self: C.Sink<R, InErr, In, OutErr, L, Z>, failure: (err: OutErr) => C.Sink<R1, InErr1, In1, OutErr2, L1, Z1>, success: (z: Z) => C.Sink<R2, InErr2, In2, OutErr3, L2, Z2>): C.Sink<R & R1 & R2, InErr & InErr1 & InErr2, In1 & In2, OutErr2 | OutErr3, L1 | L2, Z1 | Z2>;
/**
 *
 * @ets_data_first foldSink_
 */
export declare function foldSink<R1, R2, InErr1, InErr2, In, In1 extends In, In2 extends In, OutErr, OutErr2, OutErr3, L, L1 extends L, L2 extends L, Z, Z1, Z2>(failure: (err: OutErr) => C.Sink<R1, InErr1, In1, OutErr2, L1, Z1>, success: (z: Z) => C.Sink<R2, InErr2, In2, OutErr3, L2, Z2>): <R, InErr>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R & R1 & R2, InErr & InErr1 & InErr2, In1 & In2, OutErr2 | OutErr3, L1 | L2, Z1 | Z2>;
//# sourceMappingURL=foldSink.d.ts.map