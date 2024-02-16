import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 *
 * @ets_data_first orElseOptional_
 */
export declare function orElseOptional<R2, E2, A2>(that: () => Effect<R2, O.Option<E2>, A2>, __trace?: string): <R, E, A>(self: Effect<R, O.Option<E>, A>) => Effect<R & R2, O.Option<E2 | E>, A2 | A>;
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 */
export declare function orElseOptional_<R, E, A, R2, E2, A2>(self: Effect<R, O.Option<E>, A>, that: () => Effect<R2, O.Option<E2>, A2>, __trace?: string): Effect<R & R2, O.Option<E | E2>, A | A2>;
//# sourceMappingURL=orElseOptional.d.ts.map