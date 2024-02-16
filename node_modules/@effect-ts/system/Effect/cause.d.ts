import type { Cause } from "../Cause/cause.js";
import type { Effect, RIO } from "./effect.js";
/**
 * Returns an effect that succeeds with the cause of failure of this effect,
 * or `Cause.empty` if the effect did not succeed.
 */
export declare function cause<R, E, A>(effect: Effect<R, E, A>, __trace?: string): RIO<R, Cause<E>>;
//# sourceMappingURL=cause.d.ts.map