"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSucceedWith = makeSucceedWith;

var _core = /*#__PURE__*/require("../core.js");

var _depsCore = /*#__PURE__*/require("../deps-core.js");

// ets_tracing: off

/**
 * Lifts a synchronous effect that does not throw exceptions into a
 * `Managed<unknown, never, A>` with a release action. The acquire and
 * release actions will be performed uninterruptibly.
 */
function makeSucceedWith(acquire, release, __trace) {
  return (0, _core.make_)((0, _depsCore.succeedWith)(acquire, __trace), a => (0, _depsCore.succeedWith)(() => release(a), __trace));
}
//# sourceMappingURL=makeSucceedWith.js.map