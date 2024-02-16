import type { Exit } from "../Exit/index.js";
import type { Effect } from "./effect.js";
/**
 * Executes the release effect only if there was an error.
 *
 * @ets_data_first bracketOnError_
 */
export declare function bracketOnError<E, A, E1, R1, A1, R2, E2, X>(use: (a: A) => Effect<R1, E1, A1>, release: (a: A, e: Exit<E1, A1>) => Effect<R2, E2, X>, __trace?: string): <R>(acquire: Effect<R, E, A>) => Effect<R & R1 & R2, E | E1 | E2, A1>;
/**
 * Executes the release effect only if there was an error.
 */
export declare function bracketOnError_<R, E, A, E1, R1, A1, R2, E2, X>(acquire: Effect<R, E, A>, use: (a: A) => Effect<R1, E1, A1>, release: (a: A, e: Exit<E1, A1>) => Effect<R2, E2, X>, __trace?: string): Effect<R & R1 & R2, E | E1 | E2, A1>;
//# sourceMappingURL=bracketOnError.d.ts.map