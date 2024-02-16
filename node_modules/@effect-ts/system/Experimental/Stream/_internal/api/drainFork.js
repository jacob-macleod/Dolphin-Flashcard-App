"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drainFork = drainFork;
exports.drainFork_ = drainFork_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index2 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Promise/index.js"));

var Chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var CrossRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./crossRight.js"));

var FromEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromEffect.js"));

var InterruptWhenP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./interruptWhenP.js"));

var Managed = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./managed.js"));

var RunForEachManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runForEachManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 */
function drainFork_(self, other) {
  return Chain.chain_(FromEffect.fromEffect(P.make()), bgDied => CrossRight.crossRight_(Managed.managed(M.fork(M.catchAllCause_(RunForEachManaged.runForEachManaged_(other, _ => T.unit), _ => T.toManaged(P.halt_(bgDied, _))))), InterruptWhenP.interruptWhenP_(self, bgDied)));
}
/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 *
 * @ets_data_first drainFork_
 */


function drainFork(other) {
  return self => drainFork_(self, other);
}
//# sourceMappingURL=drainFork.js.map