// ets_tracing: off
import { makeReserve } from "../Managed/core.mjs";
import { use_ } from "../Managed/use.mjs";
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

export function reserve(use, __trace) {
  return reservation => reserve_(reservation, use, __trace);
}
/**
 * Acquires a resource, uses the resource, and then releases the resource.
 * However, unlike `bracket`, the separation of these phases allows
 * the acquisition to be interruptible.
 *
 * Useful for concurrent data structures and other cases where the
 * 'deallocator' can tell if the allocation succeeded or not just by
 * inspecting internal / external state.
 */

export function reserve_(reservation, use, __trace) {
  return use_(makeReserve(reservation), use, __trace);
}
//# sourceMappingURL=reserve.mjs.map