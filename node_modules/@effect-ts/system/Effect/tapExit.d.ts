import * as Ex from "../Exit/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Exit`.
 */
export declare function tapExit_<R, R1, E, E1, A, A1>(self: Effect<R, E, A>, f: (exit: Ex.Exit<E, A>) => Effect<R1, E1, A1>, __trace?: string): Effect<R & R1, E | E1, A>;
/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Exit`.
 *
 * @ets_data_first tapExit_
 */
export declare function tapExit<R1, E, E1, A, A1>(f: (exit: Ex.Exit<E, A>) => Effect<R1, E1, A1>, __trace?: string): <R>(self: Effect<R, E, A>) => Effect<R & R1, E | E1, A>;
//# sourceMappingURL=tapExit.d.ts.map