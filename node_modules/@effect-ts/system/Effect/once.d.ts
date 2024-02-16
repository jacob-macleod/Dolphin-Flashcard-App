import type { Effect, UIO } from "./effect.js";
/**
 * Returns an effect that will be executed at most once, even if it is
 * evaluated multiple times.
 */
export declare function once<R, E, A>(self: Effect<R, E, A>, __trace?: string): UIO<Effect<R, E, void>>;
//# sourceMappingURL=once.d.ts.map