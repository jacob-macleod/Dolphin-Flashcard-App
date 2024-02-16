"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effectAsyncM = effectAsyncM;

var _index = /*#__PURE__*/require("../../Function/index.js");

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var Take = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Take/index.js"));

var _chain = /*#__PURE__*/require("./chain.js");

var _managed2 = /*#__PURE__*/require("./managed.js");

var _repeatEffectChunkOption = /*#__PURE__*/require("./repeatEffectChunkOption.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream from an asynchronous callback that can be called multiple times
 * The registration of the callback itself returns an effect. The optionality of the
 * error type `E` can be used to signal the end of the stream, by setting it to `None`.
 */
function effectAsyncM(register, outputBuffer = 16) {
  return (0, _chain.chain)(_repeatEffectChunkOption.repeatEffectChunkOption)((0, _managed2.managed)(M.map_(M.let_(M.bind_(M.tap_(M.bind_(M.bind_(M.do, "output", () => T.toManaged(Q.makeBounded(outputBuffer))), "runtime", () => T.toManaged(T.runtime())), ({
    output,
    runtime
  }) => T.toManaged(register((k, cb) => (x => runtime.runCancel(x, cb))(T.chain_(Take.fromPull(k), x => Q.offer_(output, x)))))), "done", () => Ref.makeManagedRef(false)), "pull", ({
    done,
    output
  }) => T.chain_(done.get, b => b ? Pull.end : T.onError_(T.chain_(Q.take(output), Take.done), () => T.chain_(done.set(true), () => Q.shutdown(output))))), ({
    pull
  }) => pull)));
}
//# sourceMappingURL=effectAsyncM.js.map