"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bimap = bimap;
exports.bimap_ = bimap_;

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

// ets_tracing: off

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
function bimap(f, g, __trace) {
  return self => bimap_(self, f, g, __trace);
}
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */


function bimap_(self, f, g, __trace) {
  return (0, _foldM.foldM_)(self, e => (0, _fail.fail)(f(e)), a => (0, _core.succeed)(g(a)), __trace);
}
//# sourceMappingURL=bimap.js.map