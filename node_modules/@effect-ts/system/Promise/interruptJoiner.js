"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interruptJoiner = interruptJoiner;

var _core = /*#__PURE__*/require("../Effect/core.js");

var _state = /*#__PURE__*/require("./state.js");

function interruptJoiner(joiner) {
  return promise => (0, _core.succeedWith)(() => {
    const state = promise.state.get;

    if (state._tag === "Pending") {
      promise.state.set(new _state.Pending(state.joiners.filter(j => j !== joiner)));
    }
  });
}
//# sourceMappingURL=interruptJoiner.js.map