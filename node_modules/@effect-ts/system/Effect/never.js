"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.never = void 0;

var _core = /*#__PURE__*/require("./core.js");

var _effectAsyncInterrupt = /*#__PURE__*/require("./effectAsyncInterrupt.js");

// ets_tracing: off

/**
 * Returns a effect that will never produce anything. The moral equivalent of
 * `while(true) {}`, only without the wasted CPU cycles.
 */
const never = /*#__PURE__*/(0, _core.suspend)(() => (0, _effectAsyncInterrupt.effectAsyncInterrupt)(() => {
  const interval = setInterval(() => {//
  }, 60000);
  return (0, _core.succeedWith)(() => {
    clearInterval(interval);
  });
}));
exports.never = never;
//# sourceMappingURL=never.js.map