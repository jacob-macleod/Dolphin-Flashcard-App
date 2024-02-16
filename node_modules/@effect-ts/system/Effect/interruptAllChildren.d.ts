import type { Effect } from "./effect.js";
/**
 * Returns a new effect that will not succeed with its value before first
 * interrupting all child fibers forked by the effect.
 */
export declare function interruptAllChildren<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=interruptAllChildren.d.ts.map