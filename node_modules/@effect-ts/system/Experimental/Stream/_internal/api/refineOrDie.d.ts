import type * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */
export declare function refineOrDie_<R, E, E1, A>(self: C.Stream<R, E, A>, pf: (e: E) => O.Option<E1>): C.Stream<R, E | E1, A>;
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 *
 * @ets_data_first refineOrDie_
 */
export declare function refineOrDie<E, E1>(pf: (e: E) => O.Option<E1>): <R, A>(self: C.Stream<R, E, A>) => C.Stream<R, E | E1, A>;
//# sourceMappingURL=refineOrDie.d.ts.map