import type * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given value, otherwise returns an empty stream.
 */
export declare function whenCase_<R, E, A, A1>(a: () => A, pf: (a: A) => O.Option<C.Stream<R, E, A1>>): C.Stream<R, E, A1>;
/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given value, otherwise returns an empty stream.
 *
 * @ets_data_first whenCase_
 */
export declare function whenCase<R, E, A, A1>(pf: (a: A) => O.Option<C.Stream<R, E, A1>>): (a: () => A) => C.Stream<R, E, A1>;
//# sourceMappingURL=whenCase.d.ts.map