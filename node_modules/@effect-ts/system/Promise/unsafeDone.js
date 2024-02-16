"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeDone = unsafeDone;

var _state = /*#__PURE__*/require("./state.js");

/**
 * Unsafe version of done
 */
function unsafeDone(io) {
  return promise => {
    const state = promise.state.get;

    if (state._tag === "Pending") {
      promise.state.set(new _state.Done(io));
      Array.from(state.joiners).reverse().forEach(f => {
        f(io);
      });
    }
  };
}
//# sourceMappingURL=unsafeDone.js.map