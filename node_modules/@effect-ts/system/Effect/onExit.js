"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onError = onError;
exports.onError_ = onError_;
exports.onExit = onExit;
exports.onExit_ = onExit_;

var _bracketExit = /*#__PURE__*/require("./bracketExit.js");

var _core = /*#__PURE__*/require("./core.js");

/**
 * Execute a cleanup function when the effect completes
 */
function onExit_(self, cleanup, __trace) {
  return (0, _bracketExit.bracketExit_)(_core.unit, () => self, (_, e) => cleanup(e), __trace);
}
/**
 * Execute a cleanup function when the effect completes
 *
 * @ets_data_first onExit_
 */


function onExit(cleanup, __trace) {
  return self => onExit_(self, cleanup, __trace);
}
/**
 * Execute a cleanup function when the effect errors
 *
 * @ets_data_first onError_
 */


function onError(cleanup, __trace) {
  return self => onError_(self, cleanup, __trace);
}
/**
 * Execute a cleanup function when the effect errors
 */


function onError_(self, cleanup, __trace) {
  return onExit_(self, e => {
    switch (e._tag) {
      case "Failure":
        {
          return cleanup(e.cause);
        }

      case "Success":
        {
          return _core.unit;
        }
    }
  }, __trace);
}
//# sourceMappingURL=onExit.js.map