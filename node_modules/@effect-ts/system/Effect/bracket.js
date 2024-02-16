"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bracket = bracket;
exports.bracket_ = bracket_;

var _bracketExit = /*#__PURE__*/require("./bracketExit.js");

// ets_tracing: off

/**
 * When this effect represents acquisition of a resource (for example,
 * opening a file, launching a thread, etc.), `bracket` can be used to ensure
 * the acquisition is not interrupted and the resource is always released.
 *
 * The function does two things:
 *
 * 1. Ensures this effect, which acquires the resource, will not be
 * interrupted. Of course, acquisition may fail for internal reasons (an
 * uncaught exception).
 * 2. Ensures the `release` effect will not be interrupted, and will be
 * executed so long as this effect successfully acquires the resource.
 *
 * In between acquisition and release of the resource, the `use` effect is
 * executed.
 *
 * If the `release` effect fails, then the entire effect will fail even
 * if the `use` effect succeeds. If this fail-fast behavior is not desired,
 * errors produced by the `release` effect can be caught and ignored.
 *
 * @ets_data_first bracket_
 */
function bracket(use, release, __trace) {
  return acquire => bracket_(acquire, use, release, __trace);
}
/**
 * When this effect represents acquisition of a resource (for example,
 * opening a file, launching a thread, etc.), `bracket` can be used to ensure
 * the acquisition is not interrupted and the resource is always released.
 *
 * The function does two things:
 *
 * 1. Ensures this effect, which acquires the resource, will not be
 * interrupted. Of course, acquisition may fail for internal reasons (an
 * uncaught exception).
 * 2. Ensures the `release` effect will not be interrupted, and will be
 * executed so long as this effect successfully acquires the resource.
 *
 * In between acquisition and release of the resource, the `use` effect is
 * executed.
 *
 * If the `release` effect fails, then the entire effect will fail even
 * if the `use` effect succeeds. If this fail-fast behavior is not desired,
 * errors produced by the `release` effect can be caught and ignored.
 */


function bracket_(acquire, use, release, __trace) {
  return (0, _bracketExit.bracketExit_)(acquire, use, release, __trace);
}
//# sourceMappingURL=bracket.js.map