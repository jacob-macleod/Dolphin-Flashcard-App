"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;
exports.compose_ = compose_;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Uses the output of `that` to provide to `self`
 *
 * @ets_data_first compose_
 */
function compose(that, __trace) {
  return self => compose_(self, that, __trace);
}
/**
 * Uses the output of `that` to provide to `self`
 */


function compose_(self, that, __trace) {
  return (0, _core.chain_)(self, r => (0, _core.provideAll_)(that, r), __trace);
}
//# sourceMappingURL=compose.js.map