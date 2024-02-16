import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */
export declare function someOrFail_<R, E, E1, A>(self: C.Stream<R, E, O.Option<A>>, e: () => E1): C.Stream<R, E | E1, A>;
/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @ets_data_first someOrFail_
 */
export declare function someOrFail<E1>(e: () => E1): <R, E, A>(self: C.Stream<R, E, O.Option<A>>) => C.Stream<R, E1 | E, A>;
//# sourceMappingURL=someOrFail.d.ts.map