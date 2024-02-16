import type { Effect, RIO } from "./effect.js";
/**
 * Returns a new effect that ignores the success or failure of this effect.
 */
export declare function ignore<R, E, A>(self: Effect<R, E, A>, __trace?: string): RIO<R, void>;
//# sourceMappingURL=ignore.d.ts.map