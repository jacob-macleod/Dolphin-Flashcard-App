import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import type { _A, _E, _R } from "../../../../Utils/index.js";
import type * as C from "../core.js";
/**
 * Zips this stream with another point-wise and emits tuples of elements from both streams.
 *
 * The new stream will end when one of the sides ends.
 */
export declare function zip_<SN extends readonly C.Stream<any, any, any>[]>(...[s1, s2, ...streams]: SN & {
    readonly 0: C.Stream<any, any, any>;
    readonly 1: C.Stream<any, any, any>;
}): C.Stream<_R<SN[number]>, _E<SN[number]>, Tp.Tuple<{
    [K in keyof SN]: _A<SN[K]>;
}>>;
/**
 * Zips this stream with another point-wise and emits tuples of elements from both streams.
 *
 * The new stream will end when one of the sides ends.
 *
 * @ets_data_first zip_
 */
export declare function zip<SN extends readonly C.Stream<any, any, any>[]>(...[s1, ...streams]: SN & {
    readonly 0: C.Stream<any, any, any>;
}): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & _R<SN[number]>, E | _E<SN[number]>, Tp.Tuple<[A, ...{ [K in keyof SN]: _A<SN[K]>; }]>>;
//# sourceMappingURL=zip.d.ts.map