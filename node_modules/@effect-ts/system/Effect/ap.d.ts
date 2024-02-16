import type { Effect } from "./effect.js";
/**
 * Applicative's ap
 */
export declare function ap<R2, E2, A>(fa: Effect<R2, E2, A>, __trace?: string): <R, E, B>(fab: Effect<R, E, (a: A) => B>) => Effect<R & R2, E2 | E, B>;
/**
 * Applicative's ap
 */
export declare function ap_<R, E, B, R2, E2, A>(fab: Effect<R, E, (a: A) => B>, fa: Effect<R2, E2, A>, __trace?: string): Effect<R & R2, E2 | E, B>;
//# sourceMappingURL=ap.d.ts.map