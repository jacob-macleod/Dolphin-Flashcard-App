import type { Effect } from "./effect.js";
/**
 * Imports an asynchronous effect into a pure `Effect` value. This formulation is
 * necessary when the effect is itself expressed in terms of `Effect`.
 */
export declare function effectAsyncM<R, E, R2, E2, A, X>(register: (cb: (_: Effect<R2, E2, A>) => void) => Effect<R, E, X>, __trace?: string): Effect<R & R2, E | E2, A>;
//# sourceMappingURL=effectAsyncM.d.ts.map