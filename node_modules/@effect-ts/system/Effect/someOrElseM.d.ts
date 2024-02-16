import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 *
 * @ets_data_first someOrElseM_
 */
export declare function someOrElseM<R2, E2, B>(orElse: Effect<R2, E2, B>, __trace?: string): <R, E, A>(self: Effect<R, E, O.Option<A>>) => Effect<R & R2, E2 | E, B | A>;
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 */
export declare function someOrElseM_<R, E, A, R2, E2, B>(self: Effect<R, E, O.Option<A>>, orElse: Effect<R2, E2, B>, __trace?: string): Effect<R & R2, E | E2, A | B>;
//# sourceMappingURL=someOrElseM.d.ts.map