import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Extracts the optional value, or returns the given 'default'.
 */
export declare function someOrElse_<R, E, A>(self: C.Stream<R, E, O.Option<A>>, default_: A): C.Stream<R, E, A>;
/**
 * Extracts the optional value, or returns the given 'default'.
 *
 * @ets_data_first someOrElse_
 */
export declare function someOrElse<A>(default_: A): <R, E>(self: C.Stream<R, E, O.Option<A>>) => C.Stream<R, E, A>;
//# sourceMappingURL=someOrElse.d.ts.map