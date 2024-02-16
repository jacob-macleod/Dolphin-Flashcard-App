import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import type { _A, _E, _R } from "../../../../Utils/index.js";
import type * as C from "../core.js";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 */
export declare function cross_<SN extends readonly C.Stream<any, any, any>[]>(...[s1, s2, ...streams]: SN & {
    readonly 0: C.Stream<any, any, any>;
    readonly 1: C.Stream<any, any, any>;
}): C.Stream<_R<SN[number]>, _E<SN[number]>, Tp.Tuple<{
    [K in keyof SN]: _A<SN[K]>;
}>>;
/**
 * Composes this stream with the specified stream to create a cartesian product of elements.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * @ets_data_first cross_
 */
export declare function cross<SN extends readonly C.Stream<any, any, any>[]>(...[s1, ...streams]: SN & {
    readonly 0: C.Stream<any, any, any>;
}): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & _R<SN[number]>, E | _E<SN[number]>, Tp.Tuple<[A, ...{ [K in keyof SN]: _A<SN[K]>; }]>>;
//# sourceMappingURL=cross.d.ts.map