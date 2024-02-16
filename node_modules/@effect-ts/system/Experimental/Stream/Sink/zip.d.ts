import * as Tp from "../../../Collections/Immutable/Tuple/index.js";
import type * as C from "./core.js";
import type * as U from "./utils.js";
export declare function zip_<SN extends readonly C.Sink<any, any, any, any, any, any>[]>(...[s1, s2, ...sinks]: SN & {
    readonly 0: C.Sink<any, any, any, any, any, any>;
    readonly 1: C.Sink<any, any, any, any, any, any>;
}): C.Sink<U._R<SN[number]>, U._InErr<SN[number]>, U._In<SN[number]>, U._OutErr<SN[number]>, U._L<SN[number]>, Tp.Tuple<{
    [K in keyof SN]: U._Z<SN[K]>;
}>>;
/**
 * @ets_data_first zip_
 */
export declare function zip<SN extends readonly C.Sink<any, any, any, any, any, any>[]>(...[s1, ...sinks]: SN & {
    readonly 0: C.Sink<any, any, any, any, any, any>;
}): <R, InErr, In, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R & U._R<SN[number]>, InErr & U._InErr<SN[number]>, In & U._In<SN[number]>, OutErr | U._OutErr<SN[number]>, L | U._L<SN[number]>, Tp.Tuple<[Z, ...{ [K in keyof SN]: U._Z<SN[K]>; }]>>;
//# sourceMappingURL=zip.d.ts.map