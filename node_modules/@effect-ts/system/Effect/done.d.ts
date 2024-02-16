import type { Exit } from "../Exit/exit.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect from a `Exit` value.
 */
export declare function done<E, A>(exit: Exit<E, A>, __trace?: string): Effect<unknown, E, A>;
//# sourceMappingURL=done.d.ts.map