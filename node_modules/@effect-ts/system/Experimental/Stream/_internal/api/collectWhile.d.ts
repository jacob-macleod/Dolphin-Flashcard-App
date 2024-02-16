import type * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 */
export declare function collectWhile_<R, E, A, A1>(self: C.Stream<R, E, A>, pf: (a: A) => O.Option<A1>): C.Stream<R, E, A1>;
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhile_
 */
export declare function collectWhile<A, A1>(pf: (a: A) => O.Option<A1>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A1>;
//# sourceMappingURL=collectWhile.d.ts.map