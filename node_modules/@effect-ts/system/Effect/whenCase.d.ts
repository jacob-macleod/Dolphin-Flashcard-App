import type * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Runs an effect when the supplied `PartialFunction` matches for the given value, otherwise does nothing.
 */
export declare function whenCase_<R, E, A, X>(a: A, pf: (a: A) => O.Option<Effect<R, E, X>>, __trace?: string): Effect<R, E, void>;
/**
 * Runs an effect when the supplied `PartialFunction` matches for the given value, otherwise does nothing.
 *
 * @dateFirst whenCase_
 */
export declare function whenCase<R, E, A, X>(pf: (a: A) => O.Option<Effect<R, E, X>>, __trace?: string): (a: A) => Effect<R, E, void>;
//# sourceMappingURL=whenCase.d.ts.map