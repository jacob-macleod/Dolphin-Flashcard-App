import type { Effect } from "../Effect/effect.js";
import type { XFiberRef } from "./fiberRef.js";
/**
 * Returns an `Effect` that runs with `value` bound to the current fiber.
 *
 * Guarantees that fiber data is properly restored via `bracket`.
 *
 * @ets_data_first locally_
 */
export declare function locally<A>(value: A): <EA, EB, B>(fiberRef: XFiberRef<EA, EB, A, B>) => <R, E, C>(effect: Effect<R, E, C>) => Effect<R, EA | E, C>;
/**
 * Returns an `Effect` that runs with `value` bound to the current fiber.
 *
 * Guarantees that fiber data is properly restored via `bracket`.
 */
export declare function locally_<EA, EB, A, B>(fiberRef: XFiberRef<EA, EB, A, B>, value: A): <R, E, C>(effect: Effect<R, E, C>) => Effect<R, EA | E, C>;
//# sourceMappingURL=locally.d.ts.map