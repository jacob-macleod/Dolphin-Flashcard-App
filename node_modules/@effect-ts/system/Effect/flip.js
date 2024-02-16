"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flip = flip;

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

// ets_tracing: off

/**
 * Returns an effect that swaps the error/success cases. This allows you to
 * use all methods on the error channel, possibly before flipping back.
 */
function flip(self, __trace) {
  return (0, _foldM.foldM_)(self, _core.succeed, _fail.fail, __trace);
}
//# sourceMappingURL=flip.js.map