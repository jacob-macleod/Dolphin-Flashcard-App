import type { Exit } from "../Exit/exit.js";
import type { Effect } from "./effect.js";
/**
 * Acquires a resource, uses the resource, and then releases the resource.
 * Neither the acquisition nor the release will be interrupted, and the
 * resource is guaranteed to be released, so long as the `acquire` effect
 * succeeds. If `use` fails, then after release, the returned effect will fail
 * with the same error.
 *
 * @ets_data_first bracketExit_
 */
export declare function bracketExit<A, E1, R1, A1, R2, E2, A2>(use: (a: A) => Effect<R1, E1, A1>, release: (a: A, e: Exit<E1, A1>) => Effect<R2, E2, A2>, __trace?: string): <R, E>(acquire: Effect<R, E, A>) => Effect<R & R1 & R2, E1 | E2 | E, A1>;
/**
 * Acquires a resource, uses the resource, and then releases the resource.
 * Neither the acquisition nor the release will be interrupted, and the
 * resource is guaranteed to be released, so long as the `acquire` effect
 * succeeds. If `use` fails, then after release, the returned effect will fail
 * with the same error.
 */
export declare function bracketExit_<R, E, A, E1, R1, A1, R2, E2, X>(acquire: Effect<R, E, A>, use: (a: A) => Effect<R1, E1, A1>, release: (a: A, e: Exit<E1, A1>) => Effect<R2, E2, X>, __trace?: string): Effect<R & R1 & R2, E | E1 | E2, A1>;
//# sourceMappingURL=bracketExit.d.ts.map