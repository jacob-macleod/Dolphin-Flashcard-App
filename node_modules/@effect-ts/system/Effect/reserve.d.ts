import type { Reservation } from "../Managed/index.js";
import type { Effect } from "./effect.js";
/**
 * Acquires a resource, uses the resource, and then releases the resource.
 * However, unlike `bracket`, the separation of these phases allows
 * the acquisition to be interruptible.
 *
 * Useful for concurrent data structures and other cases where the
 * 'deallocator' can tell if the allocation succeeded or not just by
 * inspecting internal / external state.
 *
 * @ets_data_first reserve_
 */
export declare function reserve<R3, E3, B, A>(use: (a: A) => Effect<R3, E3, B>, __trace?: string): <R, E, R2, E2>(reservation: Effect<R, E, Reservation<R2, E2, A>>) => Effect<R & R2 & R3, E3 | E | E2, B>;
/**
 * Acquires a resource, uses the resource, and then releases the resource.
 * However, unlike `bracket`, the separation of these phases allows
 * the acquisition to be interruptible.
 *
 * Useful for concurrent data structures and other cases where the
 * 'deallocator' can tell if the allocation succeeded or not just by
 * inspecting internal / external state.
 */
export declare function reserve_<R, E, R2, E2, R3, E3, B, A>(reservation: Effect<R, E, Reservation<R2, E2, A>>, use: (a: A) => Effect<R3, E3, B>, __trace?: string): Effect<R & R2 & R3, E | E2 | E3, B>;
//# sourceMappingURL=reserve.d.ts.map