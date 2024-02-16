"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timed = timed;
exports.timedWith = timedWith;
exports.timedWith_ = timedWith_;

var _index = /*#__PURE__*/require("../Clock/index.js");

var _summarized = /*#__PURE__*/require("./summarized.js");

// ets_tracing: off

/**
 * A more powerful variation of `timed` that allows specifying the clock.
 */
function timedWith_(self, msTime, __trace) {
  return (0, _summarized.summarized_)(self, msTime, (start, end) => end - start, __trace);
}
/**
 * A more powerful variation of `timed` that allows specifying the clock.
 *
 * @ets_data_first timedWith_
 */


function timedWith(msTime, __trace) {
  return self => timedWith_(self, msTime, __trace);
}
/**
 * Returns a new effect that executes this one and times the execution.
 */


function timed(self, __trace) {
  return timedWith_(self, _index.currentTime, __trace);
}
//# sourceMappingURL=timed.js.map