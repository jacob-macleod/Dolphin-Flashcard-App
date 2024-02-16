import type { Cause } from "../Cause/cause.js";
import type { Effect, RIO } from "./effect.js";
/**
 * When this effect succeeds with a cause, then this method returns a new
 * effect that either fails with the cause that this effect succeeded with,
 * or succeeds with unit, depending on whether the cause is empty.
 *
 * This operation is the opposite of `cause`.
 */
export declare function uncause<R, E>(effect: RIO<R, Cause<E>>, __trace?: string): Effect<R, E, void>;
//# sourceMappingURL=uncause.d.ts.map