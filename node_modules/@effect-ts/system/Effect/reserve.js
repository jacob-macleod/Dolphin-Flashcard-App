"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reserve = reserve;
exports.reserve_ = reserve_;

var _core = /*#__PURE__*/require("../Managed/core.js");

var _use = /*#__PURE__*/require("../Managed/use.js");

// ets_tracing: off

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
function reserve(use, __trace) {
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


function reserve_(reservation, use, __trace) {
  return (0, _use.use_)((0, _core.makeReserve)(reservation), use, __trace);
}
//# sourceMappingURL=reserve.js.map