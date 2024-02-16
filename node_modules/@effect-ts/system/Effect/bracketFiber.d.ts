import type { Runtime } from "../Fiber/core.js";
import type { Effect } from "./effect.js";
/**
 * Fork the effect into a separate fiber wrapping it in a bracket and returining the
 * `use` handle. Acquisition will fork and release will interrupt the fiber
 */
export declare function bracketFiber_<R, E, A, R2, E2, A2>(effect: Effect<R, E, A>, use: (f: Runtime<E, A>) => Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E2, import("../Exit/exit.js").Exit<E, A>>;
/**
 * Fork the effect into a separate fiber wrapping it in a bracket.
 * Acquisition will fork and release will interrupt the fiber.
 *
 * @ets_data_first bracketFiber_
 */
export declare function bracketFiber<R2, E2, A2, E, A>(use: (f: Runtime<E, A>) => Effect<R2, E2, A2>, __trace?: string): <R>(effect: Effect<R, E, A>) => Effect<R & R2, E2, import("../Exit/exit.js").Exit<E, A>>;
//# sourceMappingURL=bracketFiber.d.ts.map