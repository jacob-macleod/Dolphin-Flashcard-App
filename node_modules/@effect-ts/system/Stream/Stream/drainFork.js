"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drainFork = drainFork;
exports.drainFork_ = drainFork_;

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Promise/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var crossRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./crossRight.js"));

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./forEach.js"));

var fromEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromEffect.js"));

var interruptWhenP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./interruptWhenP.js"));

var _managed2 = /*#__PURE__*/require("./managed.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 */
function drainFork_(self, other) {
  return chain.chain_(fromEffect.fromEffect(P.make()), bgDied => crossRight.crossRight_((0, _managed2.managed)(M.fork(M.catchAllCause_(forEach.forEachManaged_(other, _ => T.unit), _ => T.toManaged(P.halt_(bgDied, _))))), interruptWhenP.interruptWhenP_(self, bgDied)));
}
/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 */


function drainFork(other) {
  return self => drainFork_(self, other);
}
//# sourceMappingURL=drainFork.js.map