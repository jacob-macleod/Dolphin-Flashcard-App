import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some typed error.
 */
export declare function catchSome_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, pf: (e: E) => O.Option<C.Stream<R1, E1, A1>>): C.Stream<R & R1, E1, A | A1>;
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some typed error.
 *
 * @ets_data_first catchSome_
 */
export declare function catchSome<R1, E, E1, A1>(pf: (e: E) => O.Option<C.Stream<R1, E1, A1>>): <R, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1, A1 | A>;
//# sourceMappingURL=catchSome.d.ts.map