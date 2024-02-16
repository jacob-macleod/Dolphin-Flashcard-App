"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapBoth = mapBoth;
exports.mapBoth_ = mapBoth_;

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

// ets_tracing: off

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
function mapBoth_(self, f, g, __trace) {
  return (0, _foldM.foldM_)(self, e => (0, _fail.fail)(f(e)), a => (0, _core.succeed)(g(a)), __trace);
}
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first mapBoth_
 */


function mapBoth(f, g, __trace) {
  return self => mapBoth_(self, f, g, __trace);
}
//# sourceMappingURL=mapBoth.js.map