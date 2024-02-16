"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionEither = partitionEither;
exports.partitionEither_ = partitionEither_;

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/List/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var _index5 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var CollectLeft = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./collectLeft.js"));

var CollectRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./collectRight.js"));

var DistributedWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./distributedWith.js"));

var FlattenExitOption = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./flattenExitOption.js"));

var FromQueueWithShutdown = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromQueueWithShutdown.js"));

var MapEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 */
function partitionEither_(self, p, buffer = 16) {
  return M.chain_(DistributedWith.distributedWith_(MapEffect.mapEffect_(self, p), 2, buffer, E.fold(_ => T.succeed(_ => _ === 0), _ => T.succeed(_ => _ === 1))), dequeues => {
    if (L.size(dequeues) === 2) {
      return M.succeed(Tp.tuple(CollectLeft.collectLeft(FlattenExitOption.flattenExitOption(FromQueueWithShutdown.fromQueueWithShutdown_(L.unsafeFirst(dequeues)))), CollectRight.collectRight(FlattenExitOption.flattenExitOption(FromQueueWithShutdown.fromQueueWithShutdown_(L.unsafeLast(dequeues))))));
    }

    return M.dieMessage(`partitionEither: expected two streams but got ${L.size(dequeues)}`);
  });
}
/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 *
 * @ets_data_first partitionEither_
 */


function partitionEither(p, buffer = 16) {
  return self => partitionEither_(self, p, buffer);
}
//# sourceMappingURL=partitionEither.js.map