import type { Effect } from "./effect.js";
/**
 * Returns a new effect that will not succeed with its value before first
 * waiting for the end of all child fibers forked by the effect.
 */
export declare function awaitAllChildren<R, E, A>(fa: Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=awaitAllChildren.d.ts.map