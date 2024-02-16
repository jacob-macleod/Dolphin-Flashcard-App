"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapTryCatch = mapTryCatch;
exports.mapTryCatch_ = mapTryCatch_;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 */
function mapTryCatch_(self, f, onThrow, __trace) {
  return (0, _core.chain_)(self, a => (0, _core.tryCatch)(() => f(a), onThrow, __trace));
}
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @ets_data_first mapTryCatch_
 */


function mapTryCatch(f, onThrow, __trace) {
  return self => mapTryCatch_(self, f, onThrow, __trace);
}
//# sourceMappingURL=mapTryCatch.js.map