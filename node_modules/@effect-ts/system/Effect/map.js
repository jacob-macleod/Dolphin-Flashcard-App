"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
exports.map_ = map_;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 */
function map_(_, f, __trace) {
  return (0, _core.chain_)(_, a => (0, _core.succeed)(f(a)), __trace);
}
/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @ets_data_first map_
 */


function map(f, __trace) {
  return self => map_(self, f);
}
//# sourceMappingURL=map.js.map