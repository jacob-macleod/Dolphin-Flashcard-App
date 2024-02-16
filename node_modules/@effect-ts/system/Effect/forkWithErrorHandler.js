"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forkWithErrorHandler = forkWithErrorHandler;
exports.forkWithErrorHandler_ = forkWithErrorHandler_;

var _index = /*#__PURE__*/require("../Cause/index.js");

var _index2 = /*#__PURE__*/require("../Either/index.js");

var _index3 = /*#__PURE__*/require("../Function/index.js");

var _core = /*#__PURE__*/require("./core.js");

var _onExit = /*#__PURE__*/require("./onExit.js");

// ets_tracing: off

/**
 * Like fork but handles an error with the provided handler.
 *
 * @ets_data_first forkWithErrorHandler_
 */
function forkWithErrorHandler(handler, __trace) {
  return self => forkWithErrorHandler_(self, handler, __trace);
}
/**
 * Like fork but handles an error with the provided handler.
 */


function forkWithErrorHandler_(self, handler, __trace) {
  return (0, _core.fork)((0, _onExit.onError_)(self, x => (0, _index2.fold)(handler, _core.halt)((0, _index.failureOrCause)(x))), __trace);
}
//# sourceMappingURL=forkWithErrorHandler.js.map