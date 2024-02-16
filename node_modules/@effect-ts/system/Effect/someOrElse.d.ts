import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Extracts the optional value, or returns the given 'orElse'.
 */
export declare function someOrElse<B>(orElse: () => B, __trace?: string): <R, E, A>(self: Effect<R, E, O.Option<A>>) => Effect<R, E, B | A>;
/**
 * Extracts the optional value, or returns the given 'orElse'.
 */
export declare function someOrElse_<R, E, A, B>(self: Effect<R, E, O.Option<A>>, orElse: () => B, __trace?: string): Effect<R, E, A | B>;
//# sourceMappingURL=someOrElse.d.ts.map