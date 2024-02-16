"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferDropping = bufferDropping;
exports.bufferDropping_ = bufferDropping_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var _bufferSignal = /*#__PURE__*/require("./_internal/bufferSignal.js");

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` elements in a dropping queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */
function bufferDropping_(self, capacity) {
  return new _definitions.Stream(M.chain_(M.bind_(M.do, "queue", () => T.toManagedRelease_(Q.makeDropping(capacity), Q.shutdown)), ({
    queue
  }) => (0, _bufferSignal.bufferSignal)(self, queue)));
}
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` elements in a dropping queue.
 *
 * @note Prefer capacities that are powers of 2 for better performance.
 */


function bufferDropping(capacity) {
  return self => bufferDropping_(self, capacity);
}
//# sourceMappingURL=bufferDropping.js.map