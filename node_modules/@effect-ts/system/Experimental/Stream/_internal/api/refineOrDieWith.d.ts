import * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 */
export declare function refineOrDieWith_<R, E, E1, A>(self: C.Stream<R, E, A>, pf: (e: E) => O.Option<E1>, f: (e: E) => any): C.Stream<R, E | E1, A>;
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first refineOrDieWith_
 */
export declare function refineOrDieWith<E, E1>(pf: (e: E) => O.Option<E1>, f: (e: E) => any): <R, A>(self: C.Stream<R, E, A>) => C.Stream<R, E | E1, A>;
//# sourceMappingURL=refineOrDieWith.d.ts.map