"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPull = toPull;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var Executor = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/executor.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function toPullInterpret(channelState, exec) {
  switch (channelState._typeId) {
    case Executor.ChannelStateEffectTypeId:
      {
        return T.chain_(channelState.effect, () => toPullInterpret(exec.run(), exec));
      }

    case Executor.ChannelStateEmitTypeId:
      {
        return T.succeed(E.right(exec.getEmit()));
      }

    case Executor.ChannelStateDoneTypeId:
      {
        const done = exec.getDone();

        if (done._tag === "Success") {
          return T.succeed(E.left(done.value));
        } else {
          return T.halt(done.cause);
        }
      }
  }
}
/**
 * Interpret a channel to a managed Pull
 */


function toPull(self) {
  return M.map_(M.makeExit_(T.succeedWith(() => new Executor.ChannelExecutor(() => self, undefined, _index3.identity)), (exec, exit) => exec.close(exit) || T.unit), exec => T.suspend(() => toPullInterpret(exec.run(), exec)));
}
//# sourceMappingURL=toPull.js.map