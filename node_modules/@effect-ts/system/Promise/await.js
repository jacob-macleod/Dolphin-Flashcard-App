"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.await = wait;

var _effectMaybeAsyncInterrupt = /*#__PURE__*/require("../Effect/effectMaybeAsyncInterrupt.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _interruptJoiner = /*#__PURE__*/require("./interruptJoiner.js");

var _state = /*#__PURE__*/require("./state.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Retrieves the value of the promise, suspending the fiber running the action
 * until the result is available.
 */
function wait(promise) {
  return (0, _effectMaybeAsyncInterrupt.effectMaybeAsyncInterruptBlockingOn)(k => {
    const state = promise.state.get;

    switch (state._tag) {
      case "Done":
        {
          return E.right(state.value);
        }

      case "Pending":
        {
          promise.state.set(new _state.Pending([k, ...state.joiners]));
          return E.left((0, _interruptJoiner.interruptJoiner)(k)(promise));
        }
    }
  }, promise.blockingOn);
}
//# sourceMappingURL=await.js.map