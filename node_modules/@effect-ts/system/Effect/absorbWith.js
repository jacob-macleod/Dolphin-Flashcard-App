"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.absorb = absorb;
exports.absorbWith = absorbWith;
exports.absorbWith_ = absorbWith_;

var _index = /*#__PURE__*/require("../Cause/index.js");

var _index2 = /*#__PURE__*/require("../Function/index.js");

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

var _sandbox = /*#__PURE__*/require("./sandbox.js");

// ets_tracing: off

/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */
function absorbWith(f, __trace) {
  return fa => absorbWith_(fa, f, __trace);
}
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */


function absorbWith_(fa, f, __trace) {
  return (0, _foldM.foldM_)((0, _sandbox.sandbox)(fa), x => (0, _fail.fail)((0, _index.squash)(f)(x)), _core.succeed, __trace);
}
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */


function absorb(self, __trace) {
  return absorbWith_(self, _index2.identity, __trace);
}
//# sourceMappingURL=absorbWith.js.map