import * as Tp from "../../../Collections/Immutable/Tuple/index.js";
import type * as T from "../../../Effect/index.js";
import * as C from "./core.js";
/**
 * Summarize a sink by running an effect when the sink starts and again when it completes
 */
export declare function summarized_<R, R1, E1, InErr, In, OutErr, L, Z, B, C>(self: C.Sink<R, InErr, In, OutErr, L, Z>, summary: T.Effect<R1, E1, B>, f: (b1: B, b2: B) => C): C.Sink<R1 & R, InErr, In, E1 | OutErr, L, Tp.Tuple<[Z, C]>>;
/**
 * Summarize a sink by running an effect when the sink starts and again when it completes
 * @ets_data_first summarized_
 */
export declare function summarized<R1, E1, B, C>(summary: T.Effect<R1, E1, B>, f: (b1: B, b2: B) => C): <R, InErr, In, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R1 & R, InErr, In, E1 | OutErr, L, Tp.Tuple<[Z, C]>>;
//# sourceMappingURL=summarized.d.ts.map