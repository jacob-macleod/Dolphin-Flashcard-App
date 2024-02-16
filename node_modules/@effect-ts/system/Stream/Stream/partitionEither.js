"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionEither = partitionEither;
exports.partitionEither_ = partitionEither_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index4 = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var _collectLeft = /*#__PURE__*/require("./collectLeft.js");

var _collectRight = /*#__PURE__*/require("./collectRight.js");

var _distributedWith = /*#__PURE__*/require("./distributedWith.js");

var _flattenExitOption = /*#__PURE__*/require("./flattenExitOption.js");

var _fromQueueWithShutdown = /*#__PURE__*/require("./fromQueueWithShutdown.js");

var _mapM = /*#__PURE__*/require("./mapM.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 */
function partitionEither_(self, p, buffer = 16) {
  return M.chain_((0, _distributedWith.distributedWith)(2, buffer, E.fold(() => T.succeed(_ => _ === 0), () => T.succeed(_ => _ === 1)))((0, _mapM.mapM)(p)(self)), queues => {
    const [q1, q2] = queues;

    if (q1 && q2) {
      return M.succeed(Tp.tuple((0, _collectLeft.collectLeft)((0, _flattenExitOption.flattenExitOption)((0, _fromQueueWithShutdown.fromQueueWithShutdown)(q1))), (0, _collectRight.collectRight)((0, _flattenExitOption.flattenExitOption)((0, _fromQueueWithShutdown.fromQueueWithShutdown)(q2)))));
    } else {
      return M.dieMessage(`partitionEither: expected two streams but got ${A.size(queues)}`);
    }
  });
}
/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 */


function partitionEither(p, buffer = 16) {
  return self => partitionEither_(self, p, buffer);
}
//# sourceMappingURL=partitionEither.js.map